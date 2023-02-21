CREATE EXTENSION  IF NOT EXISTS "pgcrypto";
DO
$do$
    DECLARE
        _db TEXT := 'hurima';
        _user TEXT := 'root';
        _password TEXT := 'password';
    BEGIN
        CREATE EXTENSION IF NOT EXISTS dblink;
        IF EXISTS(SELECT 1 FROM pg_database WHERE datname = _db)
            THEN RAISE NOTICE 'Database already exists';
        ELSE
            PERFORM dblink_connect('host=localhost user=' || _user || ' password=' || _password || ' dbname=' || current_database());
            PERFORM dblink_exec('CREATE DATABASE ' || _db);
        END IF;
    END
$do$;
END;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  google_id VARCHAR(255),
  username VARCHAR(50) NOT NULL,
  profile_picture_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_id ON users(user_id);


CREATE TABLE listings (
  listing_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sorted_listings ON listings (created_at DESC NULLS LAST, listing_id);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  listing_id INTEGER NOT NULL REFERENCES listings(listing_id),
  comment_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sorted_comments on comments(created_at DESC, comment_id);

CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(listing_id),
  tag_text VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE watchlists (
  watchlist_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  listing_id INTEGER NOT NULL REFERENCES listings(listing_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_watchlists_user_id on watchlists(user_id);

CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  notification_text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sorted_notifications on notifications (created_at DESC, notification_id);