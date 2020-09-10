// File: mysqlPool.js
// Description: creates a mysql pool

const mysql = require("mysql2/promise");

// set the server information using environment variables
const mysqlPort = process.env.SQL_PORT || 3306;
const mysqlHost = process.env.SQL_HOST;
const mysqlUser = process.env.SQL_USER;
const mysqlPassword = process.env.SQL_PASSWORD;
const mysqlDatabase = process.env.SQL_DB_NAME;

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