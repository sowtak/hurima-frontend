package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"net/url"
	"os"
	"os/signal"
	"strconv"
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

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	if err := run(ctx, os.Args[1:]); err != nil {
		os.Exit(1)
	}

}

func run(ctx context.Context, args []string) error {
	var (
		port, _   = strconv.Atoi(env("PORT", "8000"))
		originStr = env("ORIGIN", fmt.Sprintf("http://localhost:%d", port))
		dbUrl     = env("DATABASE_URL", "postgresql://root@localhost:5432/flema?sslmode=disable")
	)

	origin, err := url.Parse(originStr)
	if err != nil || !origin.IsAbs() {
		return errors.New("invalid url origin")
	}

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

	return nil
}
