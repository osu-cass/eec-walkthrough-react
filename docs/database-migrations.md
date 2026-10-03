# Database migrations

Knex manages versioned schema changes for the Express backend using the existing
`mysql2` driver. Application queries remain in `models/`. Configure the same
`MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DB_NAME`
settings as the app. The existing `_FILE` settings work for the migration commands
too. The migration configuration loads the repository's `.env` by absolute path.
Run the npm commands from the repository root. An environment variable overrides
the same key in `.env`;
when a `_FILE` setting names an existing file, the app's secret helper reads that
file in preference to the corresponding plain value.

Every backend start applies pending migrations before the API and production file
server open their ports. This includes `npm start`, the development commands,
and `node app.js`. A migration failure exits nonzero. The runner closes its
separate connection pool when the batch finishes.

## Initialize or upgrade a database

For an empty database, import `services/database/db-init-new.sql` first. Docker
Compose does this on the first startup of an empty database volume. The dump
contains both the initial schema and sample content.

For an existing database, keep its schema and data. Run from the repository root:

```bash
npm run db:status
npm run db:migrate
```

Knex records completed migrations in `knex_migrations` and uses
`knex_migrations_lock` to prevent concurrent batches. These tables are created by
the runner; do not insert history rows by hand to skip schema changes.
`db:status` can also create the history tables when they do not yet exist, but it
does not apply pending schema migrations.

The first migration adds `Items.altText` and `History_Items.altText` as
`varchar(1000)`, `utf8mb4_unicode_ci`, `NOT NULL DEFAULT ''`. Matching columns
already present from the dump or the old manual script are accepted. Missing
tables or incompatible column definitions require attention before the migration
can be recorded. No values are copied from `contentLabel`, and existing `altText`
values are preserved.

The older manual SQL file remains available for historical deployments. Use the
tracked migration command for releases that include this workflow.

## Write a migration

```bash
npm run db:make -- add_example_column
```

The command creates a timestamped CommonJS migration in
`services/database/migrations`. Fill in its `up` function using Knex's schema
builder or explicit SQL. The command creates a file; it does not generate schema
changes by comparing application models with the database.

Keep each migration focused. Commit it with the application change that needs the
schema. Once a migration has run in a shared environment, keep that file unchanged
and add a new migration for corrections. Future migrations should produce the
same result from the documented preceding schema; the initial conditional
`altText` change handles adoption of databases previously upgraded by hand.

MariaDB schema changes can commit implicitly, so a migration with multiple DDL
statements may fail after applying only some of them. Write changes so recovery
does not depend on transactional rollback. The initial migration can be retried
after adding only one of its two columns.

## Deployment requirements

Install the backend dependencies from the committed lockfile before using this
workflow. The database user needs permission to read schema metadata, create and
update the migration history tables, and apply the schema changes in pending
migrations. The initial migration needs `SELECT`, `INSERT`, `UPDATE`, `DELETE`,
`CREATE`, and `ALTER` privileges on the application database. The runner does not
create a database or use the root password.

This prerequisite applies even when the `altText` columns already exist: the
first run still creates and updates migration history. If production currently
uses an account without schema privileges, have IT arrange the required access
before deploying this release. Do not deploy and assume a past manual SQL change
will let the startup migration succeed.

Back up the production database before a schema release. Confirm the target
database and privileges before the first rollout. Prefer additive schema changes
that remain compatible with the preceding application version while it is
running. Long data backfills belong in a separately planned operation rather
than normal application startup.

## Recover from a failure

Read the reported migration name and database error. Inspect which changes
completed before retrying; an unsuccessful DDL migration may leave partial schema
changes. Fix the cause and rerun `npm run db:migrate`.

Migrations in this project are forward-only. Add a corrective migration instead
of automatically dropping columns during an application rollback. The initial
`altText` migration cannot determine whether it created a column or adopted one
that already contained data, so its `down` function refuses to remove columns.

If an interrupted process leaves the migration lock set, confirm that no other
process is running migrations before releasing the lock with Knex's
`migrate:unlock` command and this project's knexfile:

```bash
npx knex --knexfile services/database/knexfile.js migrate:unlock
```

Do not unlock an active batch.

## Validate a schema change

`npm run test:db` runs integration tests against a disposable MariaDB server. It
requires an account that can create and drop test databases and a limited test
user. Supply `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, and `MYSQL_PASSWORD`, plus
a unique `MYSQL_MIGRATION_TEST_DB_PREFIX` starting with `eec_migrations_test_`.
The suite creates and removes only its own test schemas; it refuses names that
already exist. Do not point it at a production database server.

```bash
MYSQL_HOST=127.0.0.1 MYSQL_PORT=3307 MYSQL_USER=root \
MYSQL_PASSWORD=test-only MYSQL_MIGRATION_TEST_DB_PREFIX=eec_migrations_test_local \
npm run test:db
```

These are example settings for a separate test server, not the local application
database. The suite imports the current initial dump, then exercises missing,
already present, partially applied, and incompatible columns. It also verifies
row preservation, completed history, repeated runs, startup ordering, and
startup failure when the account lacks privileges. The database migration
workflow runs this suite against MariaDB 10.11 on pull requests and `dev` pushes.
