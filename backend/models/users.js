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