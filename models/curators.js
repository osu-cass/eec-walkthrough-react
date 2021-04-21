// File: contributors.js
// Description: Provides functions for working with curator data.

const {pool} = require("../services/database/mysqlPool");

// returns all approved contributors
async function getPageCurator(pageId) {

  try {

    // get page curator
    const sql = "SELECT * FROM Curators " +
    "WHERE curatorPageId = ?";
    const results = await pool.query(sql, [pageId]);

    const finalResults = {
      userId: results[0][0].userId
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting contributors");
    throw Error(err);
  }

}

exports.getPageCurator = getPageCurator;

// returns all approved contributors
async function insertCurator(pageId, userId) {

  try {

    // see if the page curator already exists
    let sql = "SELECT * FROM Curators " +
    "WHERE curatorPageId = ?";
    let results = await pool.query(sql, [pageId]);

    let exists = false;
    if (results[0].length) {
      exists = true;
    }

    // create or update, based on if the page curator already exists
    if (exists) {
      sql = "UPDATE Curators " +
      "SET userId = ? " +
      "WHERE curatorPageId = ?;";
      results = await pool.query(sql, [userId, pageId]);
    } else {
      sql = "INSERT INTO Curators (curatorPageId, userId) " +
      "VALUES (?, ?);";
      results = await pool.query(sql, [pageId, userId]);
    }

    const finalResults = {
      success: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting contributors");
    throw Error(err);
  }

}
exports.insertCurator = insertCurator;