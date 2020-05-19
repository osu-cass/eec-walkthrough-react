// File: headers.js
// Description: Provides functions for working with header data.

const {pool} = require('../services/database/mysqlPool');


// return information about the specific header
async function getHeader(headerId) {

  try {

    // get the specified header
    let sql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";

    let results = await pool.query(sql, headerId);

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

    // create the new header
    sql = "INSERT INTO Headers (pageId, title, userId, approved) " +
    "VALUES (?, ?, ?, 0);";
    results = await pool.query(sql, [pageId, title, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.log("Error creating header");
    throw Error(err);
  }

}
exports.createHeader = createHeader;