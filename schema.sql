CREATE EXTENSION  IF NOT EXISTS "uuid-ossp";
DO
$do$
    DECLARE
        _db TEXT := 'flema';
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
    user_id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
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
    code UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (email, code)
);

CREATE TABLE IF NOT EXISTS items (
    item_id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    seller VARCHAR,
    item_name VARCHAR NOT NULL,
    seller_email_domain VARCHAR  NOT NULL,
    item_condition VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    price VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    content VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);