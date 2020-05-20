// File: cards.js
// Description: Provides functions for working with card data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific card
async function getCard(cardId) {

  try {

    // get the specified card
    const sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";

    const results = await pool.query(sql, cardId);

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


// create a card
async function createCard(headerId, title, userId) {

  try {

    // make sure the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the card does not already exist
    sql = "SELECT * " +
    "FROM Cards " +
    "WHERE headerId = ? " +
    "AND title = ?;";
    results = await pool.query(sql, [headerId, title]);

    if (results[0].length) {
      return {error: 2};
    }

    // make sure the header exists
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 3};
    }

    // create the new card
    sql = "INSERT INTO Cards (headerId, title, userId, approved) " +
    "VALUES (?, ?, ?, 0);";
    results = await pool.query(sql, [headerId, title, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.log("Error creating card");
    throw Error(err);
  }

}
exports.createCard = createCard;