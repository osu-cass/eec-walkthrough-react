// File: headers.js
// Description: Provides functions for working with header data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific header
async function getHeader(headerId) {

  try {

    // get the specified header
    const sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";

    const results = await pool.query(sql, headerId);

    // check to see if we were able to find the header
    if (!results[0].length) {
      return {headerId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for header");
    throw Error(err);
  }

}
exports.getHeader = getHeader;


// create a header
async function createHeader(pageId, title, userId) {

  try {

    // make sure the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the header does not already exist
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE pageId = ? " +
    "AND title = ?;";
    results = await pool.query(sql, [pageId, title]);

    if (results[0].length) {
      return {error: 2};
    }

    // make sure the page exists
    sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 3};
    }

    // create the new header
    sql = "INSERT INTO Headers (pageId, title, userId, approved) " +
    "VALUES (?, ?, ?, 0);";
    results = await pool.query(sql, [pageId, title, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating header");
    throw Error(err);
  }

}
exports.createHeader = createHeader;


// delete a header
async function deleteHeader(headerId) {

  try {

    // check to see if the header exists
    let sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";

    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the header
    sql = "DELETE " +
      "FROM Headers " +
      "WHERE headerId = ?;";

    results = await pool.query(sql, headerId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting header");
    throw Error(err);
  }

}
exports.deleteHeader = deleteHeader;


// update a header
async function updateHeader(headerId, pageId, title, approved) {

  try {

    const sqlArray = [];

    // make sure that the header exists
    let sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    let results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Headers SET ";

    if (typeof pageId !== "undefined") {

      // confirm that the parent exists
      const checkSql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

      results = await pool.query(checkSql, pageId);

      if (!results[0].length) {
        return {error: 2};
      }

      sql += "pageId = ?,";
      sqlArray.push(pageId);

    }

    if (typeof title !== "undefined") {
      sql += "title = ?,";
      sqlArray.push(title);
    }

    if (typeof approved !== "undefined") {
      sql += "approved = ?,";
      sqlArray.push(approved);
    }

    // add the last line of the SQL query
    sql = sql.replace(/.$/, " WHERE headerId = ?;");
    sqlArray.push(headerId);

    // confirm that the parent doesn't already
    // have a child with the same title
    if (typeof pageId !== "undefined" || typeof title !== "undefined") {

      // check if we are using a new or old parent Id
      if (typeof pageId === "undefined") {
        const checkSql = "SELECT pageId " +
        "FROM Headers " +
        "WHERE headerId = ?;";
        results = await pool.query(checkSql, headerId);
        pageId = results[0][0].pageId;
      }

      // check if we are using a new or old title
      if (typeof title === "undefined") {
        const checkSql = "SELECT title " +
        "FROM Headers " +
        "WHERE headerId = ?;";
        results = await pool.query(checkSql, headerId);
        title = results[0][0].title;
      }

      const checkSql = "SELECT * " +
      "FROM Headers " +
      "WHERE pageId = ? " +
      "AND title = ?;";
      results = await pool.query(checkSql, [pageId, title]);

      if (results[0].length) {
        return {error: 3};
      }
    }


    // make sure that we are updating at least one field
    if (sqlArray.length <= 1) {
      return {error: 4};
    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      changedRows: results[0].changedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating header");
    throw Error(err);
  }

}
exports.updateHeader = updateHeader;