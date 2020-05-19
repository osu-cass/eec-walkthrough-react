// File: items.js
// Description: Provides functions for working with user data.

const {pool} = require('../services/database/mysqlPool');


// return information about the specific item
async function getItem(itemId) {

  try {

    // get the specified item
    let sql = "SELECT * " +
      "FROM Items " +
      "WHERE itemId = ?;";

    let results = await pool.query(sql, itemId);

    // check to see if we were able to find the item
    if (!results[0].length) {
      return {itemId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for item");
    throw Error(err);
  }

}
exports.getItem = getItem;