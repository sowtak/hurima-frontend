package flema

import (
	"context"
	"fmt"
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
	)
}
