-- Create igfxpro user
CREATE USER igfxpro WITH PASSWORD 'igfxpro_secret';

-- Give necessary permissions
ALTER USER igfxpro CREATEDB;
ALTER USER igfxpro CREATEROLE;

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE igfxpro_db TO igfxpro;

-- Connect to the database and grant schema permissions
\c igfxpro_db

-- Grant schema permissions
GRANT ALL PRIVILEGES ON SCHEMA public TO igfxpro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO igfxpro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO igfxpro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO igfxpro;

-- Make igfxpro the owner of public schema
ALTER SCHEMA public OWNER TO igfxpro;

