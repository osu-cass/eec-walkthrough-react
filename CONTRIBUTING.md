# Contributing to EEC Walkthrough React

Thank you for your interest in contributing to the EEC Walkthrough React application! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Security Guidelines](#security-guidelines)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/eec-walkthrough-react.git`
3. Create a new branch from `dev`: e.g. `git checkout -b feat/your-feature-name dev`
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request targeting the `dev` branch for review

## Development Setup

### Prerequisites

- Node.js (version compatible with the project)
- Docker Desktop (recommended for local development)
- Git

### Using Docker (Recommended)

The easiest way to get started is using Docker Compose:

1. **Set up environment variables (more detailed instructions in [README.md](README.md#user-secrets)):**
   - Copy `.env.example` to `.env` and fill in the required values
   - Create a `secrets/` directory with:
     - `mysql_password.txt` - Database user password
     - `mysql_root_password.txt` - Database root password
     - `jwt_secret_key.txt` - JWT secret key (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)

2. **Start the development environment:**
   ```bash
   docker compose up -d
   ```

3. **View logs:**
   ```bash
   docker compose logs -f app
   ```

4. **Access the application:**
   - React Dev Server: http://localhost:3000
   - API: http://localhost:1111
   - phpMyAdmin: http://localhost:8080

For more detailed Docker setup instructions, see [DOCKER.md](DOCKER.md).

### Local Development (Without Docker)

1. **Install dependencies:**
   ```bash
   npm run installAll
   ```

2. **Set up the database:**
   - Install XAMPP or another MySQL server
   - Create a database named `eec_walkthrough`
   - Import `services/database/db-init.sql`

3. **Configure environment:**
   - Create `.env` file from `.env.example`
   - Set up `secrets/` directory as described above

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
eec-walkthrough-react/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store configuration
│   │   └── utilities/      # Utility functions
│   └── public/             # Static assets
├── models/                 # Database model functions
├── routes/                 # Express route handlers
├── services/               # Business logic and utilities
│   ├── authentication/     # Auth-related services
│   ├── database/           # Database initialization scripts
│   ├── format/             # Data formatting utilities
│   ├── utils/              # General utilities
│   └── validation/         # Request validation
├── docker/                 # Docker configuration files
├── secrets/                # Secret files (gitignored)
└── app.js                  # Express application entry point
```

## Code Style

### File Naming Conventions

- **Components:** PascalCase (e.g., `UserProfile.js`)
- **Utilities:** camelCase (e.g., `formatTime.js`)
- **Routes:** camelCase (e.g., `users.js`)
- **CSS files:** Match component name (e.g., `UserProfile.css`)

### Code Organization

- Keep components focused and single-purpose
- Extract reusable logic into utility functions
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code patterns in the project

## Git Workflow

### Main Branch

> **⚠️ Important:** The main development branch for this project is `dev`, not `main` or `master`. All feature branches should be created from `dev`, and all pull requests should target `dev`.

### Branch Naming

Use descriptive branch names with prefixes:
- `feat/` - New features
- `fix/` - Bug fixes
- `chore/` - Chores (e.g., updating dependencies, linting, formatting)
- `docs/` - Documentation updates
- `test/` - Test additions or updates

Examples:
- `feat/user-authentication`
- `fix/login-error-handling`
- `docs/update-api-documentation`

### Commit Messages

Write clear, descriptive commit messages:

Example:

```
chore: modifies db setup and docker security notes

Updated DOCKER.md and README.md to emphasize using secure, user-generated credentials instead of example values. Added warnings to never commit real credentials and referenced setup instructions for secrets. Improves documentation clarity and security practices.
```

### Before Committing

1. Test your changes locally
2. Ensure all tests pass (if applicable)
3. Check that your code follows the project's style guidelines
4. Verify no sensitive data is included (see [Security Guidelines](#security-guidelines))

## Pull Request Process

1. **Update your branch:**
   ```bash
   git checkout dev
   git pull upstream dev
   git checkout your-branch
   git rebase upstream/dev
   ```

2. **Create a pull request:**
   - **Target the `dev` branch** (not `main` or `master`)
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots if UI changes are involved
   - List any breaking changes

3. **PR Checklist:**
   - [ ] Code follows the project's style guidelines
   - [ ] Changes have been tested locally
   - [ ] Documentation has been updated (if needed)
   - [ ] No sensitive data is included
   - [ ] Commit messages are clear and descriptive

4. **Respond to feedback:**
   - Address review comments promptly
   - Make requested changes
   - Re-request review when ready

## Security Guidelines

### Never Commit Sensitive Data

**Important:** The following files and directories are gitignored and should NEVER be committed:

- `.env` files
- `secrets/` directory
- Database credentials
- JWT secret keys
- API keys or tokens

### Environment Variables

- Use `.env.example` as a template
- Never commit actual `.env` files
- Use Docker secrets for sensitive data in containers

### Database Credentials

- Always use secure, unique passwords for local development
- Never use example credentials from documentation
- Store credentials in `secrets/` directory (gitignored)

### Before Pushing

Always verify:
```bash
git status
git diff
```

Ensure no sensitive files are staged for commit.

## Testing

### Manual Testing

Before submitting a PR, test your changes:

1. **Start the development environment:**
   ```bash
   docker compose up -d
   # or
   npm run dev
   ```

2. **Test the affected functionality:**
   - Test happy paths
   - Test error cases
   - Test edge cases
   - Verify UI changes in different browsers (if applicable)

3. **Check console for errors:**
   - Browser console (F12)
   - Server logs (`docker compose logs -f app`)

### Database Testing

- Test with sample data
- Verify database migrations (if any)
- Check for SQL injection vulnerabilities
- Ensure proper error handling

## Getting Help

- Check existing documentation: [README.md](README.md), [DOCKER.md](DOCKER.md)
- Review existing code for patterns
- Ask questions in pull request comments
- Open an issue for bugs or feature requests

## Additional Resources

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)

Thank you for contributing to the EEC Walkthrough React project!
