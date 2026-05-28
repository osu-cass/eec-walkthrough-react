// File: knexfile.js
// Description: Knex configuration file for the database. Specifies the database client, connection details, and migration directory. Used for performing database migrations.

require("dotenv").config();

const getSecret = require("./services/utils/getSecret");
const knex = require("knex");


const migrationsDirectory = "./services/database/migrations";

// Get the MySQL connection configuration for the database.
function getConnectionConfig() {
  return {
    host: getSecret("MYSQL_HOST"),
    port: Number(getSecret("MYSQL_PORT") || 3306),
    user: getSecret("MYSQL_USER"),
    password: getSecret("MYSQL_PASSWORD"),
    database: getSecret("MYSQL_DB_NAME"),
    charset: "utf8mb4"
  };
}

// Build the Knex configuration for the database.
function getConfig() {
  return {
    client: "mysql2",
    connection: getConnectionConfig(),
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: migrationsDirectory,
      tableName: "knex_migrations",
      extension: "js",
      loadExtensions: [".js"]
    }
  };
}

module.exports = {
  development: getConfig(),
  production: getConfig(),
  test: getConfig()
};
