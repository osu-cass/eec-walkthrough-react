// File: contributors.js
// Description: Provides functions for working with curator data.

const {pool} = require("../services/database/mysqlPool");

// returns all curators/curated pages
async function getCurators() {

  try {

    // get page curator
    const sql = "SELECT * FROM Curators;";
    const results = await pool.query(sql, []);

    const finalResults = {
      pageIds: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting curated pages from user");
    throw Error(err);
  }

}
exports.getCurators = getCurators;

// returns page curators
async function getPageCurators(pageId) {

  try {

    // get page curator
    const sql = "SELECT * FROM Curators " +
    "WHERE curatorPageId = ? " +
    "AND active = 1;";
    const results = await pool.query(sql, [pageId]);

    const finalResults = {
      userIds: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error getting page curators");
    throw Error(err);
  }

}
exports.getPageCurators = getPageCurators;

// insert/update page curator
async function changeCurator(pageId, pageName, userId, active) {

  try {

    // see if the page curator already exists
    let sql = "SELECT * FROM Curators " +
    "WHERE curatorPageId = ? " +
    "AND active = 1;";
    let results = await pool.query(sql, [pageId]);

    let exists = false;
    if (results[0].length) {
      exists = true;
    }

    // create or update, based on if the page curator already exists
    if (exists) {
      sql = "UPDATE Curators " +
      "SET userId = ? " +
      "WHERE curatorPageId = ? " +
      "AND active = 1;";
      results = await pool.query(sql, [userId, pageId]);
    } else {
      sql = "INSERT INTO Curators (curatorPageId, pageName, userId, active) " +
      "VALUES (?, ?, ?, ?);";
      results = await pool.query(sql, [pageId, pageName, userId, active]);
    }

    const finalResults = {
      success: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error inserting/updating page curator");
    throw Error(err);
  }

}
exports.changeCurator = changeCurator;

// insert/update previous page curator
async function changePrevCurator(pageIds, pageNames, userId, active) {

  try {

    // delete all previous page curator entries
    let sql = "DELETE FROM Curators " +
    "WHERE userId = ? " +
    "AND active = 0;";
    await pool.query(sql, [userId]);

    // insert new previous page curator entries
    for (let i = 0; i < pageIds.length; i++) {
      sql = "INSERT INTO Curators (curatorPageId, pageName, userId, active) " +
      "VALUES (?, ?, ?, ?);";
      await pool.query(sql, [pageIds[i], pageNames[i], userId, active]);
    }

    const finalResults = {
      success: 1
    };

    return finalResults;

  } catch (err) {
    console.error("Error inserting/updating previous page curator");
    throw Error(err);
  }

}
exports.changePrevCurator = changePrevCurator;