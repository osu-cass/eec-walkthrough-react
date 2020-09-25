// File: users.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");
const {hashPassword, verifyHash} = require("../services/authentication/saltHash");


// return information about the specific user
async function getUser(userId) {

  try {

    // get the specified user
    const sql = "SELECT userId, username, firstName, lastName, email, role, created " +
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
    const sql = "SELECT userId, username, firstName, lastName, email, role, hash " +
      "FROM Users " +
      "WHERE username = ?;";

    const results = await pool.query(sql, [username]);

    // check to see if we were able to find the user
    if (!results[0].length) {
      return {userId: 0};
    }

    // verify that the password is correct
    if (verifyHash(password, results[0][0].hash)) {

      const finalResults = {
        userId: results[0][0].userId,
        username: results[0][0].username,
        firstName: results[0][0].firstName,
        lastName: results[0][0].lastName,
        email: results[0][0].email,
        role: results[0][0].role
      };

      return finalResults;

    } else {
      return {userId: 0};
    }

  } catch (err) {
    console.error("Error searching for user");
    throw Error(err);
  }

}
exports.loginUser = loginUser;


// create a user
async function createUser(username, password, firstName, lastName, email) {

  try {

    // convert the password to a hash
    password = hashPassword(password);

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
    sql = "INSERT INTO Users (username, hash, firstName, lastName, email, role) " +
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

      // convert the new password to a hash
      newPassword = hashPassword(newPassword);

      sql = "SELECT hash " +
      "FROM Users " +
      "WHERE userId = ?;";
      results = await pool.query(sql, userId);

      if (!verifyHash(oldPassword, results[0][0].hash)) {
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
      sql += "hash = ?,";
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
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating user");
    throw Error(err);
  }

}
exports.updateUser = updateUser;


// gets users who match the search query
async function searchUsers(text, role, sort, order, cursor) {
  try {

    const ASC = 1;
    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let users;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // initial sql query
    let sql =
      "SELECT userId, username, firstName, lastName, email, created, role, " +
      "UNIX_TIMESTAMP(created) AS createdUnix " +
      "FROM Users ";

    // only use the cursor if it isn't the initial search request
    if (cursor.primary === "null") {
      sql += "WHERE TRUE ";
    } else {

      // We set our primary cursor to the username if it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by user ID.

      let orderChar = "<";
      if (order === ASC) {
        orderChar = ">";
      }

      switch (sort) {
        case 0:
          sql += `WHERE (username ${orderChar}= ? AND ` +
            `(username ${orderChar} ? OR userId >= ? )) `;
          break;
        case 1:
          sql += `WHERE (CONCAT(firstName , ' ' , lastName) ${orderChar}= ? AND ` +
            `(CONCAT(firstName , ' ' , lastName) ${orderChar} ? OR userId >= ? )) `;
          break;
        case 2:
          sql += `WHERE (userId ${orderChar}= ? AND ` +
            `(userId ${orderChar} ? OR userId >= ? )) `;
          break;
        case 3:
          sql += `WHERE (email ${orderChar}= ? AND ` +
            `(email ${orderChar} ? OR userId >= ? )) `;
          break;
        case 4:
          sql += `WHERE (UNIX_TIMESTAMP(created) ${orderChar}= ? AND ` +
            `(UNIX_TIMESTAMP(created) ${orderChar} ? OR userId >= ? )) `;
          break;
        case 5:
          sql += `WHERE (role ${orderChar}= ? AND ` +
            `(role ${orderChar} ? OR userId >= ? )) `;
          break;
        default:
          sql += `WHERE (username ${orderChar}= ? AND ` +
            `(username ${orderChar} ? OR userId >= ? )) `;
      }
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

    // get the results in the order we are sorting by
    switch (sort) {
      case 0:
        sql += "ORDER BY username ";
        break;
      case 1:
        sql += "ORDER BY CONCAT(firstName , ' ' , lastName) ";
        break;
      case 2:
        sql += "ORDER BY userId ";
        break;
      case 3:
        sql += "ORDER BY email ";
        break;
      case 4:
        sql += "ORDER BY createdUnix ";
        break;
      case 5:
        sql += "ORDER BY role ";
        break;
      default:
        sql += "ORDER BY username ";
    }

    // order by ascending or descending
    if (order === ASC) {
      sql += "ASC, userId ASC LIMIT ?;";
    } else {
      sql += "DESC, userId ASC LIMIT ?;";
    }

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
      const nextUser = results[0][RESULTS_PER_PAGE];

      switch (sort) {
        case 0:
          nextCursor.primary = String(nextUser.username);
          break;
        case 1:
          nextCursor.primary = String(nextUser.firstName + " " + nextUser.lastName);
          break;
        case 2:
          nextCursor.primary = String(nextUser.userId);
          break;
        case 3:
          nextCursor.primary = String(nextUser.email);
          break;
        case 4:
          nextCursor.primary = String(nextUser.createdUnix);
          break;
        case 5:
          nextCursor.primary = String(nextUser.role);
          break;
        default:
          nextCursor.primary = String(nextUser.username);
      }
      nextCursor.secondary = String(nextUser.userId);

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


// generate a random new password for a user
async function randomPassword(userId) {

  try {

    // make sure that the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    const results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // generate a new random password
    let password = "";
    const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i <= 15; i++) {
      const char = Math.floor(Math.random() * validChars.length + 1);
      password += validChars.charAt(char);
    }

    // salt and hash the new password
    const hash = hashPassword(password);

    // update the users password hash
    sql = "UPDATE Users " +
    "SET hash = ? " +
    "WHERE userId = ?;";
    await pool.query(sql, [hash, userId]);

    const finalResults = {
      password: password
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating new password");
    throw Error(err);
  }

}
exports.randomPassword = randomPassword;