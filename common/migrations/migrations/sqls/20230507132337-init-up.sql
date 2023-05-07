CREATE SCHEMA main;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- tenant table creation
CREATE TABLE main.tenants (id UUID  PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL, created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted BOOLEAN DEFAULT false );

-- feed initial data in tenant table

INSERT INTO main.tenants(name) VALUES ('Tenant1');

-- create table for user
CREATE TABLE main.users (id UUID  PRIMARY KEY DEFAULT uuid_generate_v4(), first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL,created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted BOOLEAN DEFAULT false, status smallint NOT NULL DEFAULT 1);

CREATE TABLE main.user_credentials (id UUID  PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL, created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES main.users(id));

-- create table for user tenant
 CREATE TABLE main.user_tenants (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL, tenant_id UUID NOT NULL,created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, deleted BOOLEAN DEFAULT false, FOREIGN KEY (user_id) REFERENCES main.users(id), FOREIGN KEY (tenant_id) REFERENCES main.tenants(id) );