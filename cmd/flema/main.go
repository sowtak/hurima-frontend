package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"flema/email"
	"fmt"
	"github.com/rs/cors"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"flema"
	"flema/transport"
	transporthttp "flema/transport/http"
	"github.com/go-kit/log"
	"github.com/joho/godotenv"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:12 PM
 * @version 1.0.0
 */

type flags struct {
	port           int
	originStr      string
	dbUrl          string
	execSchema     bool
	allowedOrigins string
}

func env(key, fallbackValue string) string {
	s, ok := os.LookupEnv(key)
	if !ok {
		return fallbackValue
	}
	return s
}

func main() {
	if err := godotenv.Load(); err != nil {
		_ = fmt.Errorf("could not load .env")
	}

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	logger := log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	if err := run(ctx, logger, os.Args[1:]); err != nil {
		_ = logger.Log("error", err)
		os.Exit(1)
	}

}

func run(ctx context.Context, logger log.Logger, args []string) error {
	srv, err := setUp(ctx, logger, args)
	if srv == nil {
		return errors.New("could not set up server")
	}
	if err != nil {
		return fmt.Errorf("could not set parameters: %w", err)
	}

	errs := make(chan error, 1)
	go func() {
		<-ctx.Done()
		fmt.Println()
		_ = logger.Log("message", "shutting down...")
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
		defer cancel()
		if err := srv.Shutdown(ctx); err != nil {
			errs <- fmt.Errorf("could not shut down server: %w", err)
		}

		errs <- nil
	}()

	if err := srv.ListenAndServe(); err != http.ErrServerClosed {
		close(errs)
		return fmt.Errorf("could not listen and serve: %w", err)
	}

	return <-errs
}

// setUp sets up DB, parameters used in the app and parses flags
func setUp(ctx context.Context, logger log.Logger, args []string) (*http.Server, error) {

	// Set parameter var with value from .env file
	var (
		port, _         = strconv.Atoi(env("PORT", "8000"))
		originStr       = env("ORIGIN", fmt.Sprintf("http://localhost:%d", port))
		dbUrl           = env("DATABASE_URL", "postgresql://root@localhost:5432/flema?sslmode=disable")
		execSchema, _   = strconv.ParseBool(env("EXEC_SCHEMA", "false"))
		allowedOrigins  = os.Getenv("ALLOWED_ORIGINS")
		profileImageUrl = env("PROFILE_IMAGE_PREFIX", originStr+"/img/profile-images/")
		smtpHost        = os.Getenv("SMTP_HOST")
		smtpPort, _     = strconv.Atoi(os.Getenv("SMTP_PORT"))
		smtpUsername    = os.Getenv("SMTP_USERNAME")
		smtpPassword    = os.Getenv("SMTP_PASSWORD")
	)

	var svc transport.Service

	fs := flag.NewFlagSet("flema", flag.ExitOnError)
	fs.Usage = func() {
		fs.PrintDefaults()
		fmt.Println("\nMake sure to set TOKEN_KEY, SENDGRID_API_KEY/SMTP_USERNAME and SMTP_PASSWORD in production environment")
	}
	fs.IntVar(&port, "port", port, "P")
	fs.StringVar(&allowedOrigins, "allowed-origins", allowedOrigins, "Co")

	if err := fs.Parse(args); err != nil {
		return nil, fmt.Errorf("coud not parse flags: %w", err)
	}

	//  ------------ Setup ------------

	// Convert originStr from raw str to URL format
	origin, err := url.Parse(originStr)

	if err != nil || !origin.IsAbs() {
		return nil, errors.New("invalid url origin")
	}

	// Set host value
	if h := origin.Hostname(); h == "localhost" || h == "127.0.0.1" {
		if p := origin.Port(); p != strconv.Itoa(port) {
			origin.Host = fmt.Sprintf("%s:%d", h, port)
		}
	}

	// Set port value
	if i, err := strconv.Atoi(origin.Port()); err == nil {
		port = i
	}

	db, err := sql.Open("postgres", dbUrl)
	if err != nil {
		_ = fmt.Errorf("could not open db connection: %w", err)
	}
	//defer db.Close()

	if err = db.PingContext(ctx); err != nil {
		_ = fmt.Errorf("could not ping to db: %w", err)
	}

	// Run schema.sql
	if execSchema {
		_, err := db.ExecContext(ctx, flema.Schema)
		if err != nil {
			return nil, fmt.Errorf("could not run schema file: %w", err)
		}
	}

	// Set up email sender
	var sender email.Sender
	from := "noreply.flema.dev@gmail.com"
	if smtpUsername != "" && smtpPassword != "" {
		sender = email.NewSMTPSender(
			from,
			smtpHost,
			smtpPort,
			smtpUsername,
			smtpPassword,
		)
	}

	svc = &flema.Service{
		DB:                    db,
		Logger:                logger,
		EmailSender:           sender,
		AllowedOrigins:        strings.Split(allowedOrigins, ","),
		Origin:                origin,
		ProfileImageUrlPrefix: profileImageUrl,
	}

	// CORS options
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
		},
		AllowedHeaders:   []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"},
		AllowCredentials: true,
		ExposedHeaders:   []string{"Content_Length"},
		Debug:            true,
	})

	// set up server struct
	h := c.Handler(transporthttp.New(svc, origin, logger))
	srv := &http.Server{
		Addr:              fmt.Sprintf(":%d", port),
		Handler:           h,
		ReadHeaderTimeout: time.Second * 10,
		ReadTimeout:       time.Second * 30,
		BaseContext: func(net.Listener) context.Context {
			return ctx
		},
	}

	return srv, nil
}
