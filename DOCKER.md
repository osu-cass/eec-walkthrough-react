# Docker Setup for EEC Walkthrough React Application

This Docker setup provides a containerized development environment that matches the production CentOS system with MariaDB 10.11.

## Prerequisites

- Docker Desktop installed on Windows
- Docker Compose (included with Docker Desktop)

## Quick Start

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

The default configuration runs in **development mode** with hot reload enabled.

## Access Points

- **React Dev Server**: http://localhost:3000 (with hot reload)
- **API**: http://localhost:1111
- **File Server**: http://localhost:2222
- **phpMyAdmin**: http://localhost:8080
- **Database**: localhost:3306 (accessible via MySQL client)
- **phpMyAdmin**: http://localhost:8080
- **Node.js Debugger**: localhost:9229

## Database Connection

- **Host**: localhost (from Windows) or `database` (from within containers)
- **Port**: 3306
- **Database**: eec_walkthrough
- **Username**: (value from `MYSQL_USER` in your `.env`)
- **Password**: (value from `secrets/mysql_password.txt`)
- **Root Password**: (value from `secrets/mysql_root_password.txt`)

> **⚠️ Security Note:** Create your own secure passwords in the `secrets/` directory. See the [README.md](README.md#user-secrets) for setup instructions. **Never commit real credentials to source control.**

## Services

### Database (MariaDB 10.11)
- Matches production CentOS environment
- Initializes with latest schema using `db-init-new.sql` (includes new field additions)
- Persistent data storage via Docker volumes
- Custom configuration in `docker/database/my.cnf`

### phpMyAdmin (phpmyadmin/phpmyadmin:latest)
- Web interface for database management
- Accessible at http://localhost:8080
- Username: (value from `MYSQL_USER` in your `.env`)
- Password: (value from `secrets/mysql_password.txt`)

### Application (Node.js)
- Built from Node.js 24 Alpine base image
- Applies pending Knex migrations on startup
- Runs backend API and React dev server with hot reload
- Source code is bind-mounted for live editing
- Persistent upload storage via Docker volumes

## Database Migrations
When `docker compose up` starts the app container, it runs
`npm run migrate:latest` before starting the development server. If a migration
fails, the app container will stop instead of running against an unexpected
schema.

Startup migrations should be lightweight schema changes. Avoid large data
backfills or long-running rewrites in migrations that Docker Compose will run on
startup; handle those manually during a planned maintenance step.

#### Step-by-step (Docker) for new schema changes

Use this when adding/changing DB columns, tables, indexes, or constraints.

1. **Ensure containers are running**
```bash
docker compose up -d
```

2. **Create a migration file**
```bash
docker compose exec app npm run migrate:make -- add_new_column_to_items
```

3. **Edit the generated file**
- Path: `services/database/migrations/<timestamp>_add_new_column_to_items.js`
- Implement `exports.up` and `exports.down`.
- Prefer idempotent checks (for example `hasColumn`) when practical.

Example:
```js
exports.up = async function(knex) {
  // Adds a new column to the Items table if it doesn't already exist
  const hasColumn = await knex.schema.hasColumn("Items", "newColumn");
  if (!hasColumn) {
    await knex.schema.alterTable("Items", (table) => {
      table.string("newColumn", 255).notNullable().defaultTo("");
    });
  }
};

exports.down = async function(knex) {
  // Drops the new column from the Items table if it exists
  const hasColumn = await knex.schema.hasColumn("Items", "newColumn");
  if (hasColumn) {
    await knex.schema.alterTable("Items", (table) => {
      table.dropColumn("newColumn");
    });
  }
};
```

4. **Run migration commands**

Run Knex migrations from the app container so the database hostname resolves on
the Docker network.

Apply latest migrations:
```bash
docker compose exec app npm run migrate:latest
```

Rollback latest migrations:
```bash
docker compose exec app npm run migrate:rollback
```

Check migration status:
```bash
docker compose exec app npm run migrate:status
```

> Note: `db-init-new.sql` is used only for initializing empty databases.
> Existing Docker DB volumes should be upgraded with migrations, not by editing
> init SQL alone.


## File Structure

```
├── docker/
│   ├── app/
│   │   └── Dockerfile              # Application container definition
│   │   └── Dockerfile.dev          # Development container definition
│   └── database/
│       └── my.cnf                  # MariaDB configuration
├── docker-compose.yml              # Service definitions (development mode)
├── .env                            # Environment variables (copy from .env.example)
├── secrets/                        # Docker secrets directory
│   ├── mysql_password.txt
│   ├── mysql_root_password.txt
│   └── jwt_secret_key.txt
└── .dockerignore                   # Files excluded from build context
```

## Useful Commands

```bash
# Rebuild application container after code changes
docker-compose build app

# Access application container shell
docker-compose exec app sh

# Access database container
docker-compose exec database mysql -u walkthrough -p eec_walkthrough

# View container resource usage
docker-compose top

# Clean up everything (including volumes)
docker-compose down -v
docker system prune -a
```

## Troubleshooting

### Application won't start
- Check logs: `docker compose logs app`
- Ensure database is healthy: `docker compose ps`

### Database connection issues
- Verify database is running: `docker compose ps database`
- Check database logs: `docker compose logs database`

### Port conflicts
- Ensure the following ports are available on your system:
  - 1111 (API)
  - 2222 (File server)
  - 3000 (React dev)
  - 3306 (MySQL)
  - 8080 (phpMyAdmin)
  - 9229 (debugger)
- Modify port mappings in `.env` if needed

### File permission issues (Windows)
- Ensure Docker Desktop has access to the project directory
- Check Docker Desktop settings > Resources > File Sharing
