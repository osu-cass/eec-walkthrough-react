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

### Application (Node.js)
- Built from Node.js 24 Alpine base image
- Runs backend API and React dev server with hot reload
- Source code is bind-mounted for live editing
- Persistent upload storage via Docker volumes

## Build and Minification Behavior

- Frontend production minification is performed by `react-scripts build` (Create React App).
- In production mode, the backend serves prebuilt static assets from `client/build`; it does not minify at request time.
- Docker image builds in `docker/app/Dockerfile` run `npm run build` during image creation, so production assets are bundled before container startup.

## Validation and Rollback Checklist

Use this checklist after dependency or build-tooling cleanup:

1. Build output
   - Run `npm run build`.
   - Confirm `client/build/static` contains hashed JS/CSS bundles.
2. Runtime serving
   - Run `npm start`.
   - Confirm SPA routes and static assets are served from `client/build`.
3. Functional smoke
   - Verify login/auth flow, file upload flow, and rich-text content rendering.
4. Rollback safety
   - Keep maintenance changes in small isolated commits.
   - Revert only the failing commit if a regression is found.

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
