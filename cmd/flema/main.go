package main

import (
	"context"
	"database/sql"
	"errors"
	"flag"
	"flema"
	"flema/transport"
	"fmt"
	"github.com/go-kit/log"
	"github.com/joho/godotenv"
	"net/url"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
)

/**
 * @author  Sowa Takayanagi
 * @since   1/17/2022 3:12 PM
 * @version 1.0.0
 */

func env(key, fallbackValue string) string {
	s, ok := os.LookupEnv(key)
	if !ok {
		return fallbackValue
	}
	return s
}

func main() {
	err := godotenv.Load()
	if err != nil {
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

type flags struct {
	port           int
	originStr      string
	dbUrl          string
	execSchema     bool
	allowedOrigins []string
}

func setUpParameters(ctx context.Context, logger log.Logger, args []string) (*flema.Service, error) {
	// Set parameters
	var (
		port, _        = strconv.Atoi(env("PORT", "8000"))
		originStr      = env("ORIGIN", fmt.Sprintf("http://localhost:%d", port))
		dbUrl          = env("DATABASE_URL", "postgresql://root@localhost:5432/flema?sslmode=disable")
		execSchema, _  = strconv.ParseBool(env("EXEC_SCHEMA", "false"))
		allowedOrigins = os.Getenv("ALLOWED_ORIGINS")
	)

	f := &flags{
		port:           port,
		originStr:      originStr,
		dbUrl:          dbUrl,
		execSchema:     execSchema,
		allowedOrigins: allowedOrigins,
	}

	parseFlags(&f)

	// ------- Setup -------

	// Convert originStr from raw str to URL format
	origin, err := url.Parse(originStr)
	if err != nil || !origin.IsAbs() {
		return &flema.Service{}, errors.New("invalid url origin")
	}

	// Set port value
	if h := origin.Hostname(); h == "localhost" || h == "127.0.0.1" {
		if p := origin.Port(); p != strconv.Itoa(port) {
			origin.Host = fmt.Sprintf("%s:%d", h, port)
		}
	}

	if i, err := strconv.Atoi(origin.Port()); err == nil {
		port = i
	}

	db, err := sql.Open("postgres", dbUrl)
	if err != nil {
		_ = fmt.Errorf("could not open db connection: %w", err)
	}
	defer db.Close()

	if err = db.PingContext(ctx); err != nil {
		_ = fmt.Errorf("could not ping to db: %w", err)
	}

	// Run schema.sql
	if execSchema {
		_, err := db.ExecContext(ctx, flema.Schema)
		if err != nil {
			return &flema.Service{}, fmt.Errorf("could not run schema file: %w", err)
		}
	}

	var svc transport.Service = &flema.Service{
		Logger:         logger,
		DB:             db,
		AllowedOrigins: strings.Split(allowedOrigins, ","),
	}

	return svc, nil
}

func parseFlags(f *flags) {
	fs := flag.NewFlagSet("flema", flag.ExitOnError)
	fs.Usage = func() {
		fs.PrintDefaults()
		fmt.Println("\nMake sure to set TOKEN_KEY, SENDGRID_API_KEY/SMTP_USERNAME and SMTP_PASSWORD in production environment")
	}
	fs.IntVar(&f.port, "port", f.port, "P")
	fs.IntVar(&f.allowedOrigins, "allowed-origins", f.allowedOrigins, "Co")
}

func run(ctx context.Context, logger log.Logger, args []string) error {
	var svc transport.Service = setUpParameters(ctx, logger, args)
	return nil
}
