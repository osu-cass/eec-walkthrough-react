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
- Initializes empty local database volumes using `services/database/db-init-new.sql`
- Persistent data storage via Docker volumes
- Custom configuration in `docker/database/my.cnf`

### phpMyAdmin (Database Management)
- Web interface for database management
- Accessible at http://localhost:8080
- Uses the `database` Docker network hostname, `MYSQL_DB_NAME`, `MYSQL_USER`, and the `mysql_password` Docker secret
- Baselines existing local databases at version `0`, then applies versioned SQL files

### Flyway (Database Migrations)

- Runs Flyway Community SQL migrations from `services/database/migrations`
- Starts after MariaDB is healthy and must complete successfully before the app starts
- Uses the `database` Docker network hostname, `MYSQL_DB_NAME`, `MYSQL_USER`, and the `mysql_password` Docker secret
- Tracks applied migrations in the `flyway_schema_history` table
- Baselines existing local databases at version `0`, then applies versioned SQL files

### Application (Node.js)
- Built from Node.js 24 Alpine base image
- Runs backend API and React dev server with hot reload
- Source code is bind-mounted for live editing
- Persistent upload storage via Docker volumes

## File Structure

```
├── docker/
│   ├── app/
│   │   └── Dockerfile              # Application container definition
│   │   └── Dockerfile.dev          # Development container definition
│   └── database/
│       └── my.cnf                  # MariaDB configuration
├── services/
│   └── database/
│       ├── db-init-new.sql         # Initial seed for empty local database volumes
│       └── migrations/             # Flyway SQL migrations
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

# Inspect Flyway migration state
docker compose run --rm flyway info

# Validate migration checksums and ordering
docker compose run --rm flyway validate

# Apply pending migrations without starting the app
docker compose run --rm flyway migrate

# View container resource usage
docker-compose top

# Clean up everything (including volumes)
docker-compose down -v
docker system prune -a
```

## Database Migrations

Add plain SQL migrations under `services/database/migrations` using Flyway names
such as `V001__add_example_column.sql` and `V002__create_example_table.sql`. Keep
each file small and reviewable.

`services/database/db-init-new.sql` is only used when MariaDB starts with an
empty `db_data` volume. Existing Docker volumes and shared databases are upgraded
through Flyway migrations instead. Large data backfills or long-running
migrations should be run manually during planned maintenance, not during normal
`docker compose up`.

## Troubleshooting

### Application won't start
- Check logs: `docker compose logs app`
- Check migration logs: `docker compose logs flyway`
- Ensure database is healthy and Flyway completed: `docker compose ps`

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
