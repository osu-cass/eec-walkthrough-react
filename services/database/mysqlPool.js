// File: mysqlPool.js
// Description: creates a mysql pool

const mysql = require("mysql2/promise");
const getSecret = require("../utils/getSecret");

// set the server information using environment variables
const mysqlPort = getSecret("MYSQL_PORT") || 3306;
const mysqlHost = getSecret("MYSQL_HOST");
const mysqlUser = getSecret("MYSQL_USER");
const mysqlPassword = getSecret("MYSQL_PASSWORD");
const mysqlDatabase = getSecret("MYSQL_DB_NAME");

// create a MySQL resource pool
const MAX_CONNECTIONS = 100;
const pool = mysql.createPool({
  port: mysqlPort,
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
  connectionLimit: MAX_CONNECTIONS,
  multipleStatements: true
});

exports.pool = pool;