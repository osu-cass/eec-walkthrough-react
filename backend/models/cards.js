// File: cards.js
// Description: Provides functions for working with card data.

const {pool} = require("../services/database/mysqlPool");


// return information about the specific card
async function getCard(cardId, viewAll) {

  try {

    let sql = "";

    // get the specified card
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";
    } else {
      sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ? " +
      "AND approved = 1;";
    }

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
async function createCard(headerId, cardType, orderIndex, title, userId) {

  try {

    // make sure the card does not already exist
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE headerId = ? " +
    "AND title = ?;";
    let results = await pool.query(sql, [headerId, title]);

    if (results[0].length) {
      return {error: 1};
    }

    // make sure the header exists
    sql = "SELECT * " +
    "FROM Headers " +
    "WHERE headerId = ?;";
    results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 2};
    }

    // create the new card
    sql = "INSERT INTO Cards (headerId, cardType, orderIndex, title, userId, approved) " +
    "VALUES (?, ?, ?, ?, ?, 0);";
    results = await pool.query(sql, [headerId, cardType, orderIndex, title, userId]);

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

    // checks to see if there is an edited version of the card to delete
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE cardId = ? " +
    "AND approved = 0;";

    let results = await pool.query(sql, cardId);

    // prioritize deleting the edited version
    // a second delete will remove the real one
    if (results[0].length) {
      sql = "DELETE " +
        "FROM Temp_Cards " +
        "WHERE tempCardId = ?;";

      results = await pool.query(sql, cardId);

      sql = "DELETE " +
      "FROM Items " +
      "WHERE cardId = ? " +
      "AND approved = 0;";

      results = await pool.query(sql, cardId);

      const finalResults = {
        affectedRows: results[0].affectedRows
      };

      return finalResults;
    }

    // check to see if the card exists
    sql = "SELECT * " +
      "FROM Cards " +
      "WHERE cardId = ?;";

    results = await pool.query(sql, cardId);

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
async function updateCard(cardId, cardType, orderIndex, title, items, userId) {

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

    // See if we already have an unpublished card.
    // Either create a new one or update the existing one.
    sql = "SELECT * " +
    "FROM Temp_Cards " +
    "WHERE tempCardId = ?;";
    results = await pool.query(sql, cardId);

    if (results[0].length) {

      sql = "BEGIN; " +
      "UPDATE Temp_Cards " +
      "SET tempCardType = ?, tempOrderIndex = ?, tempTitle = ?, tempUserId = ? " +
      "WHERE tempCardId = ?;";
      sqlArray.push(cardType);
      sqlArray.push(orderIndex);
      sqlArray.push(title);
      sqlArray.push(userId);
      sqlArray.push(cardId);

    } else {

      sql = "BEGIN; " +
      "INSERT INTO Temp_Cards (tempCardId, tempCardType, " +
      "tempOrderIndex, tempTitle, tempUserId) " +
      "VALUES (?, ?, ?, ?, ?);";
      sqlArray.push(cardId);
      sqlArray.push(cardType);
      sqlArray.push(orderIndex);
      sqlArray.push(title);
      sqlArray.push(userId);

    }

    // see if we need to update items
    if (typeof items !== "undefined") {
      if (items.length) {
        // delete all of the old items
        sql += "DELETE FROM Items " +
        "WHERE cardId = ? AND approved = 0;";
        sqlArray.push(cardId);

        // create all of the new items
        sql += "INSERT INTO Items (cardId, parentId, orderIndex, iconType, " +
        "contentText, contentUrl, contentLabel, approved) VALUES ";

        // expand the sql string and array based on the number of items
        items.forEach((currentValue) => {
          sql += "(?, ?, ?, ?, ?, ?, ?, 0),";
          sqlArray.push(cardId);
          sqlArray.push(currentValue.parentId);
          sqlArray.push(currentValue.orderIndex);
          sqlArray.push(currentValue.iconType);
          sqlArray.push(currentValue.contentText);
          sqlArray.push(currentValue.contentUrl);
          sqlArray.push(currentValue.contentLabel);
        });

        // replace the final comma with a semicolon
        sql = sql.replace(/.$/, ";");
      }
    }

    // commit our query
    sql += "COMMIT;";

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      cardId: cardId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating card");
    throw Error(err);
  }

}
exports.updateCard = updateCard;


async function publishCard(cardId) {

  try {

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    const title = results[0][0].title;
    const headerId = results[0][0].headerId;

    // make sure no other cards share the same name
    sql = "SELECT * " +
    "FROM Cards " +
    "WHERE headerId = ? " +
    "AND title = ? " +
    "AND cardId != ? " +
    "AND approved = 1;";
    results = await pool.query(sql, [headerId, title, cardId]);

    if (results[0].length) {
      return {error: 2};
    }

    // delete all of the old items
    sql = "DELETE FROM Items " +
    "WHERE cardId = ? " +
    "AND approved = 1;";
    results = await pool.query(sql, cardId);

    // approve all of the new items
    sql = "UPDATE Items " +
    "SET approved = 1 " +
    "WHERE cardId = ?;";
    results = await pool.query(sql, cardId);

    // check if there is new card data
    sql = "SELECT * " +
    "FROM Temp_Cards " +
    "WHERE tempCardId = ?;";
    results = await pool.query(sql, cardId);

    const tempCard = results[0][0];

    // if there is new card data, replace the old data
    // otherwise simply update the approved value
    if (tempCard) {

      // update the published card
      sql = "UPDATE Cards " +
      "SET cardType = ?, orderIndex = ?, title = ?, userId = ?, created = ?, approved = 1 " +
      "WHERE cardId = ?;";

      const tempArray = [tempCard.tempCardType, tempCard.tempOrderIndex,
        tempCard.tempTitle, tempCard.tempUserId, tempCard.tempCreated, cardId];

      results = await pool.query(sql, tempArray);

      // delete the old temp card
      sql = "DELETE FROM Temp_Cards " +
      "WHERE tempCardId = ?;";
      results = await pool.query(sql, cardId);

    } else {
      sql = "UPDATE Cards " +
      "SET approved = 1 " +
      "WHERE cardId = ?;";
      results = await pool.query(sql, cardId);
    }

    const finalResults = {
      cardId: cardId
    };

    return finalResults;

  } catch (err) {
    console.error("Error publishing card");
    throw Error(err);
  }

}
exports.publishCard = publishCard;