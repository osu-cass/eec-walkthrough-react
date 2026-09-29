const path = require("path");
const getSecret = require("../utils/getSecret");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  silent: process.env.NODE_ENV === "production"
});

module.exports = {
  client: "mysql2",
  connection: {
    host: getSecret("MYSQL_HOST"),
    port: getSecret("MYSQL_PORT") || 3306,
    user: getSecret("MYSQL_USER"),
    password: getSecret("MYSQL_PASSWORD"),
    database: getSecret("MYSQL_DB_NAME")
  },
  pool: {min: 0, max: 1},
  migrations: {
    directory: path.join(__dirname, "migrations"),
    extension: "js",
    loadExtensions: [".js"],
    stub: path.join(__dirname, "migration.stub"),
    disableTransactions: true
  }
};
