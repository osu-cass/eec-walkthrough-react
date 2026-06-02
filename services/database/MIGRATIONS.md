# Database Migrations

This project uses Knex only as a migration runner. The Express app does not run
migrations from `app.js`; Docker Compose runs pending migrations before starting
the local development app container. Production migrations should still be
applied intentionally during deployment.

## Commands

Run these from the repository root.

```bash
npm run migrate:status
npm run migrate:latest
npm run migrate:rollback
npm run migrate:make -- migration_name
```

When using Docker locally, run migration commands inside the app container so
`MYSQL_HOST=database` resolves on the Compose network:

```bash
docker compose exec app npm run migrate:status
docker compose exec app npm run migrate:latest
```

`docker compose up` also runs `npm run migrate:latest` automatically before the
development app starts.

Knex reads database settings from the same environment variables and secret-file
hooks as the application:

- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD` or `MYSQL_PASSWORD_FILE`
- `MYSQL_DB_NAME`

Migration files live in `services/database/migrations`. Knex tracks applied
migrations in the database table `knex_migrations`.

## Creating a Migration

Create a migration with a descriptive snake_case name:

```bash
npm run migrate:make -- add_alt_text_to_items
```

Use `exports.up` for the forward change and `exports.down` for rollback. Prefer
small migrations that do one schema change at a time.

## Deployment Flow

Before deploying application code that depends on a new schema:

1. Back up the production database.
2. Pull the latest code on the server.
3. Confirm pending migrations with `npm run migrate:status`.
4. Run `npm run migrate:latest`.
5. Run `npm run build`.
6. Restart the app with the existing production start script.

If a migration fails, stop the deployment and inspect the database before
starting the new app code.

## Fresh Databases

Docker still initializes empty local databases from `db-init-new.sql`. Keep that
snapshot in sync when a migration changes the schema, but use Knex migrations for
upgrading databases that already exist.
