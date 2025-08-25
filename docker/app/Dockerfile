# Use Node.js 14 on Alpine (compatible with node-sass 4.14.1)
FROM node:14-alpine3.15

# Set working directory
WORKDIR /app

# Install build tools including Python2 (required for node-sass compatibility)
# NOTE: Python2 is EOL but required for legacy node-sass dependency
# This is isolated to the Docker development environment only
RUN apk add --no-cache python2 python2-dev make g++ bash

# Copy package files first for better Docker layer caching
COPY package*.json ./
COPY client/package*.json ./client/

# Install ALL dependencies (including dev) for development builds
# Use ARG to determine if we should install dev dependencies
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ] ; then npm install --legacy-peer-deps ; else npm install --only=production --legacy-peer-deps ; fi

# Install client dependencies
RUN cd client && npm install --legacy-peer-deps

# Update Babel core to compatible version for Node.js 14 (Docker environment only)
RUN cd client && npm install @babel/core@^7.12.0 --save-dev --legacy-peer-deps

# Copy the entire application
COPY . .

# Build the React application with relaxed linting for development
RUN DISABLE_ESLINT_PLUGIN=true npm run build

# Create uploads directories if they don't exist
RUN mkdir -p client/files/uploads client/public/uploads

# Expose the ports used by the application
EXPOSE 1111 2222

# Start the application in production mode
CMD ["npm", "start"]
