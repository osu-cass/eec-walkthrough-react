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
async function createCard(headerId, orderIndex, title, userId) {

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
    sql = "INSERT INTO Cards (headerId, orderIndex, title, userId, approved) " +
    "VALUES (?, ?, ?, ?, 0);";
    results = await pool.query(sql, [headerId, orderIndex, title, userId]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating card");
    throw Error(err);
  }

}
exports.createCard = createCard;


// delete a card
async function deleteCard(cardId) {

  try {

    // check to see if the card exists
    let sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";

    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the card
    sql = "DELETE " +
      "FROM Cards " +
      "WHERE cardId = ?;";

    results = await pool.query(sql, cardId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting card");
    throw Error(err);
  }

}
exports.deleteCard = deleteCard;


// update a card
async function updateCard(cardId, headerId, orderIndex, title, approved) {

  try {

    const sqlArray = [];

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    // construct a sql query based on the fields given
    sql = "UPDATE Cards SET ";

    if (typeof headerId !== "undefined") {

      // confirm that the parent exists
      const checkSql = "SELECT * " +
      "FROM Headers " +
      "WHERE headerId = ?;";

      results = await pool.query(checkSql, headerId);

      if (!results[0].length) {
        return {error: 2};
      }

      sql += "headerId = ?,";
      sqlArray.push(headerId);

    }

    if (typeof orderIndex !== "undefined") {
      sql += "orderIndex = ?,";
      sqlArray.push(orderIndex);
    }

    if (typeof title !== "undefined") {
      sql += "title = ?,";
      sqlArray.push(title);
    }

    if (typeof approved !== "undefined") {
      sql += "approved = ?,";
      sqlArray.push(approved);
    }

    // add the last line of the SQL query
    sql = sql.replace(/.$/, " WHERE cardId = ?;");
    sqlArray.push(cardId);

    // confirm that the parent doesn't already
    // have a child with the same title
    if (typeof headerId !== "undefined" || typeof title !== "undefined") {

      // check if we are using a new or old parent Id
      if (typeof headerId === "undefined") {
        const checkSql = "SELECT headerId " +
        "FROM Cards " +
        "WHERE cardId = ?;";
        results = await pool.query(checkSql, cardId);
        headerId = results[0][0].headerId;
      }

      // check if we are using a new or old title
      if (typeof title === "undefined") {
        const checkSql = "SELECT title " +
        "FROM Cards " +
        "WHERE cardId = ?;";
        results = await pool.query(checkSql, cardId);
        title = results[0][0].title;
      }

      const checkSql = "SELECT * " +
      "FROM Cards " +
      "WHERE headerId = ? " +
      "AND title = ?;";
      results = await pool.query(checkSql, [headerId, title]);

      if (results[0].length) {
        return {error: 3};
      }
    }

    // make sure that we are updating at least one field
    if (sqlArray.length <= 1) {
      return {error: 4};
    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      changedRows: results[0].changedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating card");
    throw Error(err);
  }

}
exports.updateCard = updateCard;