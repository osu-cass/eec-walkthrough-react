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