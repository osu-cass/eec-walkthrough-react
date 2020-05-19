// File: users.js
// Description: Provides functions for working with user data.

const {pool} = require('../services/database/mysqlPool');


// return information about the specific user
async function getUser(userId) {

  try {

    // get the specified user
    let sql = "SELECT userId, userName, firstName, lastName, email, role " +
      "FROM Users " +
      "WHERE userId = ?;";

    let results = await pool.query(sql, userId);

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
    let sql = "SELECT userId, userName, firstName, lastName, email, role " +
      "FROM Users " +
      "WHERE userName = ? " +
      "AND password = ?;";

    let results = await pool.query(sql, [userName, password]);

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
    sql = "SELECT * " +
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
    console.log("Error creating user");
    throw Error(err);
  }

}
exports.createUser = createUser;
