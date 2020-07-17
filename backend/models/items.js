// File: items.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");


// update an item's timestamp
async function updateItemTime(itemId, deadLink) {

  try {

    // make sure that the item exists
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE itemId = ?;";
    let results = await pool.query(sql, itemId);

    if (!results[0].length) {
      return {error: 1};
    }

    // create the SQL query
    if (deadLink) {
      sql = "UPDATE Items " +
      "SET created = null " +
      "WHERE itemId = ?;";
    } else {
      sql = "UPDATE Items " +
      "SET created = now() " +
      "WHERE itemId = ?;";
    }

    // perform the update query
    results = await pool.query(sql, itemId);

    // get the generated timestamp
    sql = "SELECT created " +
    "FROM Items " +
    "WHERE itemId = ?;";

    results = await pool.query(sql, itemId);

    const timestamp = results[0][0].created;

    const finalResults = {
      timestamp: timestamp
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating item's timestamp");
    throw Error(err);
  }

}
exports.updateItemTime = updateItemTime;