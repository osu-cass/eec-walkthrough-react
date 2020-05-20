// File: items.js
// Description: Provides functions for working with user data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific item
async function getItem(itemId) {

  try {

    // get the specified item
    const sql = "SELECT * " +
      "FROM Items " +
      "WHERE itemId = ?;";

    const results = await pool.query(sql, itemId);

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


// create an item
async function createItem(cardId, parentId, iconType, contentText, contentUrl, contentLabel, userId) {

  try {

    // make sure the user exists
    let sql = "SELECT * " +
    "FROM Users " +
    "WHERE userId = ?;";
    let results = await pool.query(sql, userId);

    if (!results[0].length) {
      return {error: 1};
    }

    // make sure the card exists
    sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 2};
    }

    // make sure the parent item exists
    if (parentId) {

      sql = "SELECT * " +
      "FROM Items " +
      "WHERE itemId = ?;";
      results = await pool.query(sql, parentId);

      if (!results[0].length) {
        return {error: 3};
      }

    }

    // create the new item
    sql = "INSERT INTO Items (cardId, parentId, iconType, contentText, contentUrl, contentLabel, userId, approved) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, 0);";
    results = await pool.query(sql, [cardId, parentId, iconType, contentText, contentUrl, contentLabel, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.log("Error creating item");
    throw Error(err);
  }

}
exports.createItem = createItem;