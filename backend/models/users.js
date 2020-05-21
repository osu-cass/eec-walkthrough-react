// File: users.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific user
async function getUser(userId) {

  try {

    // get the specified user
    const sql = "SELECT userId, userName, firstName, lastName, email, role " +
      "FROM Users " +
      "WHERE userId = ?;";

    const results = await pool.query(sql, userId);

    // check to see if we were able to find the user
    if (!results[0].length) {
      return {userId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for user");
    throw Error(err);
  }

}
exports.getUser = getUser;


// login a user
async function loginUser(userName, password) {

  try {

    // get the specified user
    const sql = "SELECT userId, userName, firstName, lastName, email, role " +
      "FROM Users " +
      "WHERE userName = ? " +
      "AND password = ?;";

    const results = await pool.query(sql, [userName, password]);

    // check to see if we were able to find the user
    if (!results[0].length) {
      return {userId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for user");
    throw Error(err);
  }

}
exports.loginUser = loginUser;


// create a user
async function createUser(userName, password, firstName, lastName, email) {

  try {

    // make sure that the user name doesn't already exist
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userName = ?;";
    let results = await pool.query(sql, userName);

    if (results[0].length) {
      return {error: 1};
    }

    // make sure that the email doesn't already exist
    sql = "SELECT * " +
    "FROM Users " +
    "WHERE email = ?;";
    results = await pool.query(sql, email);

    if (results[0].length) {
      return {error: 2};
    }

    // create the new user
    sql = "INSERT INTO Users (userName, password, firstName, lastName, email, role) " +
    "VALUES (?, ?, ?, ?, ?, 1);";
    results = await pool.query(sql, [userName, password, firstName, lastName, email]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating user");
    throw Error(err);
  }

}
exports.createUser = createUser;


// update a user
async function updateUser(userId, userName, password, firstName, lastName, email, role) {

  try {

    const sqlArray = [];

    // make sure that the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Users SET ";

    if (typeof userName !== "undefined") {
      sql += "userName = ?, ";
      sqlArray.push(userName);
    }

    if (typeof password !== "undefined") {
      sql += "password = ?, ";
      sqlArray.push(password);
    }

    if (typeof firstName !== "undefined") {
      sql += "firstName = ?, ";
      sqlArray.push(firstName);
    }

    if (typeof lastName !== "undefined") {
      sql += "lastName = ?, ";
      sqlArray.push(lastName);
    }

    if (typeof email !== "undefined") {
      sql += "email = ?, ";
      sqlArray.push(email);
    }

    if (typeof role !== "undefined") {
      sql += "role = ?,";
      sqlArray.push(role);
    }

    // add the last line of the SQL query
    sql = sql.replace(/.$/, " WHERE userId = ?;");
    sqlArray.push(userId);

    // make sure that we are updating at least one field
    if (sqlArray.length <= 1) {
      return {error: 2};
    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      changedRows: results[0].changedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating user");
    throw Error(err);
  }

}
exports.updateUser = updateUser;
