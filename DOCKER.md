# Docker Setup for EEC Walkthrough React Application

This Docker setup provides a containerized environment that matches the production CentOS system with MariaDB 10.11.

## Prerequisites

- Docker Desktop installed on Windows
- Docker Compose (included with Docker Desktop)

## Quick Start

### Production-like Mode
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Development Mode (with hot reload)
```bash
# Start in development mode with file watching
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f app

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

## Access Points

- **Application**: http://localhost:2222
- **API**: http://localhost:1111
- **Database**: localhost:3306 (accessible via MySQL client)

## Database Connection

- **Host**: localhost (from Windows) or `database` (from within containers)
- **Port**: 3306
- **Database**: eec_walkthrough
- **Username**: walkthrough
- **Password**: walkthroughpass
- **Root Password**: rootpassword

## Services

### Database (MariaDB 10.11)

- Matches production CentOS environment
- Initializes with latest schema using `db-init-new.sql` (includes new field additions)
- Persistent data storage via Docker volumes
- Custom configuration in `docker/database/my.cnf`

### Application (Node.js)
- Built from Node.js 18 Alpine image
- Runs both backend API and serves built React frontend
- Persistent upload storage via Docker volumes

## File Structure

```
├── docker/
│   ├── app/
│   │   └── Dockerfile              # Application container definition
│   └── database/
│       └── my.cnf                  # MariaDB configuration
├── docker-compose.yml              # Main service definitions
├── docker-compose.dev.yml          # Development overrides
├── .env.docker                     # Docker environment variables
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
- Check logs: `docker-compose logs app`
- Ensure database is healthy: `docker-compose ps`

### Database connection issues
- Verify database is running: `docker-compose ps database`
- Check database logs: `docker-compose logs database`

### Port conflicts
- Ensure ports 1111, 2222, and 3306 are available on your system
- Modify port mappings in `docker-compose.yml` if needed

### File permission issues (Windows)
- Ensure Docker Desktop has access to the project directory
- Check Docker Desktop settings > Resources > File Sharing
