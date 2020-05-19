// File: cards.js
// Description: Provides functions for working with card data.

const {pool} = require('../services/database/mysqlPool');


// return information about the specific card
async function getCard(cardId) {

  try {

    // get the specified card
    let sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";

    let results = await pool.query(sql, cardId);

    // check to see if we were able to find the card
    if (!results[0].length) {
      return {cardId: 0};
    }

    return results[0][0];

  } catch (err) {
    console.error("Error searching for card");
    throw Error(err);
  }

}
exports.getCard = getCard;