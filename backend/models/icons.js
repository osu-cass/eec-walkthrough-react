// File: icons.js
// Description: Provides functions for working with icons

const {pool} = require("../services/database/mysqlPool");

// return a list of all icons
async function getIcons() {

  try {
    // get all icons
    const sql = "SELECT * " +
		"FROM Icons " +
		"ORDER BY typeKeyword ASC;";

    const results = await pool.query(sql, []);
    return results[0];

  } catch (err) {
    console.error("Error searching for icons");
    throw Error(err);
  }

}
exports.getIcons = getIcons;