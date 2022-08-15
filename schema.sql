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

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL UNIQUE,
    profile_image_url VARCHAR,
    bio VARCHAR,
    roles VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verification_codes (
    email VARCHAR NOT NULL,
    code UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (email, code)
);

CREATE TABLE IF NOT EXISTS password_reset_codes (
    email VARCHAR NOT NULL,
    code TEXT NOT NULL DEFAULT SUBSTR(MD5(RANDOM()::TEXT), 0, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (email, code)
);

CREATE TABLE IF NOT EXISTS items (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    images VARCHAR[],
    description VARCHAR NOT NULL,
    condition VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    comments_count INT NOT NULL DEFAULT 0 CHECK (comments_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX sorted_items ON items (created_at DESC NULLS LAST, id);


CREATE TABLE IF NOT exists item_subscription (
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    PRIMARY KEY (user_id, item_id)
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    content VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX sorted_comments on comments(created_at DESC, id);

CREATE TABLE IF NOT EXISTS my_watchlist (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_tags (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    comment_id UUID REFERENCES comments ON DELETE CASCADE,
    tag VARCHAR NOT NULL
);


CREATE TABLE IF NOT EXISTS notifications (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    actors VARCHAR[] NOT NULL,
    type VARCHAR NOT NULL,
    item_id UUID REFERENCES items ON DELETE CASCADE,
    read_at TIMESTAMPTZ,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX sorted_notifications on notifications (issued_at DESC, id);
CREATE UNIQUE INDEX unique_notifications on notifications (user_id, type, item_id, read_at);
