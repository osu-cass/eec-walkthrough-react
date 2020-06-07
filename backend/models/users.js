// File: users.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific user
async function getUser(userId) {

  try {

    // get the specified user
    const sql = "SELECT userId, username, firstName, lastName, email, role " +
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
async function loginUser(username, password) {

  try {

    // get the specified user
    const sql = "SELECT userId, username, firstName, lastName, email, role " +
      "FROM Users " +
      "WHERE username = ? " +
      "AND password = ?;";

    const results = await pool.query(sql, [username, password]);

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
async function createUser(username, password, firstName, lastName, email) {

  try {

    // make sure that the user name doesn't already exist
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE username = ?;";
    let results = await pool.query(sql, username);

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
    sql = "INSERT INTO Users (username, password, firstName, lastName, email, role) " +
    "VALUES (?, ?, ?, ?, ?, 1);";
    results = await pool.query(sql, [username, password, firstName, lastName, email]);

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
async function updateUser(userId, username, oldPassword, newPassword, firstName, lastName, email, role) {

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

    // if the password is being changed,
    // make sure that the old password is correct
    if (typeof newPassword !== "undefined") {
      sql = "SELECT password " +
      "FROM Users " +
      "WHERE userId = ?;";
      results = await pool.query(sql, userId);

      if (oldPassword !== results[0][0].password) {
        return {error: 2};
      }
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Users SET ";

    if (typeof username !== "undefined") {
      sql += "username = ?,";
      sqlArray.push(username);
    }

    if (typeof newPassword !== "undefined") {
      sql += "password = ?,";
      sqlArray.push(newPassword);
    }

    if (typeof firstName !== "undefined") {
      sql += "firstName = ?,";
      sqlArray.push(firstName);
    }

    if (typeof lastName !== "undefined") {
      sql += "lastName = ?,";
      sqlArray.push(lastName);
    }

    if (typeof email !== "undefined") {
      sql += "email = ?,";
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
      return {error: 3};
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


// gets users who match the search query
async function searchUsers(text, role, cursor) {
  try {

    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let users;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // initial sql query
    let sql =
      "SELECT userId, username, firstName, lastName, email, role FROM Users ";

    // only use the cursor if it isn't the initial search request
    if (cursor.primary === "null") {
      sql += "WHERE TRUE ";
    } else {

      // We set our primary cursor to the username as it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by user ID.

      sql += "WHERE username >= ? AND " +
        "(username > ? OR userId >= ?) ";
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.secondary);

    }

    // get the text we are searching for
    if (text !== "*") {
      sql += "AND (username LIKE CONCAT('%', ?, '%') " +
      "OR CONCAT(firstName , ' ' , lastName) LIKE CONCAT('%', ?, '%') " +
      "OR email LIKE CONCAT('%', ?, '%') " +
      "OR userId LIKE CONCAT('%', ?, '%')) ";
      sqlArray.push(text);
      sqlArray.push(text);
      sqlArray.push(text);
      sqlArray.push(text);
    }

    // check if we are searching for a specific role (instead of any role)
    if (role) {
      sql += "AND role = ? ";
      sqlArray.push(role);
    }

    // sort search results by username
    sql += "ORDER BY username ASC, " +
      "userId ASC LIMIT ?;";

    // get the number of results per page (plus the next cursor)
    sqlArray.push(RESULTS_PER_PAGE + 1);

    // perform the query
    const results = await pool.query(sql, sqlArray);

    // get the next cursor and return the correct number of users
    if (results[0].length < RESULTS_PER_PAGE + 1) {

      // if we have returned the last of the data then we return
      // a null next cursor
      users = results[0];
      nextCursor.primary = "null";
      nextCursor.secondary = "null";

    } else {

      // Our next cursor will store a primary and secondary value.
      // The primary value is the main value we are sorting by.
      // The secondary value is the user ID and it is used to sort when we
      // have results with matching primary values.
      users = results[0].slice(0, -1);
      const nextPlan = results[0][RESULTS_PER_PAGE];

      // set the primary and secondary strings
      nextCursor.primary = String(nextPlan.username);
      nextCursor.secondary = String(nextPlan.userId);

    }

    return {
      users: users,
      nextCursor: nextCursor
    };

  } catch (err) {
    console.error("Error searching users");
    throw Error(err);
  }
}
exports.searchUsers = searchUsers;

