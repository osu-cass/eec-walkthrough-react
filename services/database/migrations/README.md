# Database Migrations

Flyway Community SQL migrations live here. The Docker Compose `flyway` service
runs these migrations after MariaDB is healthy and before the application
container starts.

## Naming Format

- V001__description.sql
- V002__description.sql
- ...

Use one small, reviewable SQL file per logical schema change.

## Docker Commands

Run Flyway through Docker Compose so developers do not need to install Flyway
locally:

```bash
docker compose run --rm flyway info
docker compose run --rm flyway validate
docker compose run --rm flyway migrate
```

Flyway stores applied migration metadata in the `flyway_schema_history` table.
Existing local databases are baselined at version `0`, then upgraded through
versioned SQL files in this directory. This keeps existing `db_data` volumes from
needing to be destroyed just to receive schema changes.

## Initial Database Seed

`services/database/db-init-new.sql` is only used by the MariaDB container when
the local database volume is empty. Once a database exists, changes to that dump
are not replayed. Put new schema changes in Flyway migrations instead.

## Migration Safety

Keep migrations short and deterministic. Large data backfills, risky cleanup
steps, or long-running migrations should be run manually during planned
maintenance rather than as part of normal Docker Compose startup.

## Rollback Policy

Flyway Community does not provide the paid `undo` workflow. Treat migrations as
forward-only. If a migration needs to be corrected, add a new SQL migration that
fixes or reverses the change instead of editing an already-applied migration.

Before production migrations, back up the database. If a migration causes data
loss or serious corruption, restore from backup; otherwise roll forward with a
corrective migration.
