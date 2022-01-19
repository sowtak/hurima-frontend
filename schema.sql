DO
$do$
    DECLARE
        _db TEXT := 'flemadb';
        _user TEXT := 'root';
        _password TEXT := 'password';
    BEGIN
        CREATE EXTENSION IF NOT EXISTS dblink;
        IF EXISTS(SELECT 1 FROM pg_catalog.pg_database WHERE name = _db)
            THEN RAISE NOTICE 'Database already exists';
        ELSE
            PERFORM dblink_connect('host=localhost user=' || _user || ' password=' || _password || ' dbname=' || current_database());
            PERFORM dblink_exec('CREATE DATABASE ' || _db);
        END IF;
    END
$do$;
END;
SET DATABASE = flemadb;

CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY NOT NULL DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    activation_code VARCHAR,
    password_reset_code VARCHAR,
    profile_image_url VARCHAR,
    email_domain VARCHAR,
    roles VARCHAR
);

CREATE TABLE IF NOT EXISTS activation_codes (
    email VARCHAR NOT NULL,
    code UUID NOT NULL DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (email, code)
);

CREATE TABLE IF NOT EXISTS items (
    item_id UUID NOT NULL PRIMARY KEY DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    seller VARCHAR,
    item_name VARCHAR NOT NULL,
    seller_email_domain VARCHAR  NOT NULL,
    item_condition VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    price VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY NOT NULL DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES items ON DELETE CASCADE,
    content VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);