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
async function createCard(headerId, cardType, title, items, userId) {

  try {

    const sqlArray = [];

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

    // make sure all of the icons being used on this card are valid
    sql = "SELECT iconType " +
    "FROM Icons " +
    "WHERE groupIndex = 0;";
    results = await pool.query(sql, []);

    const icons = results[0];
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < icons.length; j++) {
        if (items[i].iconType === icons[j].iconType) {
          return {error: 3}
        }
      }
    }

    // create the new card
    sql = "INSERT INTO Cards (headerId, cardType, title, userId, orderIndex, approved) " +
    "VALUES (?, ?, ?, ?, 0, 0);";

    results = await pool.query(sql, [headerId, cardType, title, userId]);
    const cardId = results[0].insertId;

    // update the order index of the new card
    sql = "UPDATE Cards " +
    "SET orderIndex = ? " +
    "WHERE cardId = ?;";
    sql = await pool.query(sql, [cardId, cardId]);

    // create the new items
    sql = "INSERT INTO Items (cardId, indentation, iconType, " +
    "contentText, contentUrl, contentLabel, contentMode, approved) VALUES ";
    // expand the sql string and array based on the number of items
    items.forEach((currentValue) => {
      sql += "(?, ?, ?, ?, ?, ?, ?, 0),";
      sqlArray.push(cardId);
      sqlArray.push(currentValue.indentation);
      sqlArray.push(currentValue.iconType);
      sqlArray.push(currentValue.contentText);
      sqlArray.push(currentValue.contentUrl);
      sqlArray.push(currentValue.contentLabel);
      sqlArray.push(currentValue.contentMode);
    });

    // replace the final comma with a semicolon
    sql = sql.replace(/.$/, ";");
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      insertId: cardId
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


// delete a cards changes
async function deleteCardChanges(cardId) {

  try {

    // checks to see if there is an edited version of the card to delete
    let sql = "SELECT * " +
    "FROM Items " +
    "WHERE cardId = ? " +
    "AND approved = 0;";

    let results = await pool.query(sql, cardId);

    sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";

    const checkApproved = await pool.query(sql, cardId);

    // delete the edited version of the card if it exists
    if (results[0].length && checkApproved[0].length && checkApproved[0][0].approved) {

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

    } else {

      // there was no temp card to delete, there may still be the real card
      // to delete, as long as it has never been published

      if (checkApproved[0].length && !checkApproved[0][0].approved) {

        sql = "DELETE " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";

        results = await pool.query(sql, cardId);

        const finalResults = {
          affectedRows: results[0].affectedRows
        };

        return finalResults;

      } else {
        return {error: 1};
      }
    }

  } catch (err) {
    console.error("Error deleting card changes");
    throw Error(err);
  }

}
exports.deleteCardChanges = deleteCardChanges;


// update a card
async function updateCard(cardId, cardType, title, items, userId) {

  try {

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    const approved = results[0][0].approved;

    // make sure all of the icons being used on this card are valid
    sql = "SELECT iconType " +
    "FROM Icons " +
    "WHERE groupIndex = 0;";
    results = await pool.query(sql, []);

    const icons = results[0];
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < icons.length; j++) {
        if (items[i].iconType === icons[j].iconType) {
          return {error: 2}
        }
      }
    }

    // See if we already have an unpublished card.
    // Either create a new one or update the existing one.
    sql = "SELECT * " +
    "FROM Temp_Cards " +
    "WHERE tempCardId = ?;";
    results = await pool.query(sql, cardId);

    if (results[0].length) {

      sql = "UPDATE Temp_Cards " +
      "SET tempCardType = ?, tempTitle = ?, tempUserId = ? " +
      "WHERE tempCardId = ?;";
      results = await pool.query(sql, [cardType, title, userId, cardId]);

    } else if (approved === 0) {

      sql = "UPDATE Cards " +
      "SET cardType = ?, title = ?, userId = ? " +
      "WHERE cardId = ?;";
      results = await pool.query(sql, [cardType, title, userId, cardId]);

    } else {

      sql = "INSERT INTO Temp_Cards (tempCardId, tempCardType, " +
      "tempTitle, tempUserId) " +
      "VALUES (?, ?, ?, ?);";
      results = await pool.query(sql, [cardId, cardType, title, userId]);

    }

    // see if we need to update items
    if (typeof items !== "undefined") {
      if (items.length) {

        const sqlArray = [];

        // delete all of the old items
        sql = "DELETE FROM Items " +
        "WHERE cardId = ? AND approved = 0;";
        results = await pool.query(sql, cardId);

        // create all of the new items
        sql = "INSERT INTO Items (cardId, indentation, iconType, " +
        "contentText, contentUrl, contentLabel, contentMode, approved) VALUES ";

        // expand the sql string and array based on the number of items
        items.forEach((currentValue) => {
          sql += "(?, ?, ?, ?, ?, ?, ?, 0),";
          sqlArray.push(cardId);
          sqlArray.push(currentValue.indentation);
          sqlArray.push(currentValue.iconType);
          sqlArray.push(currentValue.contentText);
          sqlArray.push(currentValue.contentUrl);
          sqlArray.push(currentValue.contentLabel);
          sqlArray.push(currentValue.contentMode);
        });

        // replace the final comma with a semicolon
        sql = sql.replace(/.$/, ";");

        results = await pool.query(sql, sqlArray);

      }
    }

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
      "SET cardType = ?, title = ?, userId = ?, created = ?, approved = 1 " +
      "WHERE cardId = ?;";

      const tempArray = [tempCard.tempCardType, tempCard.tempTitle,
        tempCard.tempUserId, tempCard.tempCreated, cardId];

      // make sure no other cards share the same name
      const checkSql = "SELECT * " +
      "FROM Cards " +
      "WHERE headerId = ? " +
      "AND title = ? " +
      "AND cardId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [headerId, tempCard.tempTitle, cardId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
      results = await pool.query(sql, tempArray);

      // delete the old temp card
      sql = "DELETE FROM Temp_Cards " +
      "WHERE tempCardId = ?;";
      results = await pool.query(sql, cardId);

    } else {

      sql = "UPDATE Cards " +
      "SET approved = 1 " +
      "WHERE cardId = ?;";

      // make sure no other cards share the same name
      const checkSql = "SELECT * " +
      "FROM Cards " +
      "WHERE headerId = ? " +
      "AND title = ? " +
      "AND cardId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [headerId, title, cardId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
      results = await pool.query(sql, cardId);

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


async function unpublishCard(cardId) {

  try {

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ?;";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    // set the card to unpublished
    sql = "UPDATE Cards " +
    "SET approved = 0 " +
    "WHERE cardId = ?;";
    results = await pool.query(sql, cardId);

    // delete any old temp cards
    sql = "DELETE FROM Temp_Cards " +
    "WHERE tempCardId = ?;";
    results = await pool.query(sql, cardId);

    // delete all of the edited items
    sql = "DELETE FROM Items " +
    "WHERE cardId = ? " +
    "AND approved = 0;";
    results = await pool.query(sql, cardId);

    // unapprove all of the published items
    sql = "UPDATE Items " +
    "SET approved = 0 " +
    "WHERE cardId = ?;";
    results = await pool.query(sql, cardId);

    const finalResults = {
      cardId: cardId
    };

    return finalResults;

  } catch (err) {
    console.error("Error unpublishing card");
    throw Error(err);
  }

}
exports.unpublishCard = unpublishCard;


// move a card
async function moveCard(cardId, direction) {

  try {

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ? " +
    "AND approved = true";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    const headerId = results[0][0].headerId;

    // get all of the cards under the current header
    sql = "SELECT * " +
    "FROM Cards " +
    "WHERE headerId = ? " +
    "AND approved = true " +
    "ORDER BY orderIndex ASC, cardId ASC";
    results = await pool.query(sql, headerId);

    const cards = results[0];
    let cardIndex = -1;
    let otherCardIndex = -1;

    // find the index of this card
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].cardId === parseInt(cardId, 10)) {
        cardIndex = i;
        break;
      }
    }

    // if we cannot find the index, then we can't find the card
    if (cardIndex === -1) {
      return {error: 1};
    }

    // check if we are trying to move up or down and make sure card exists
    // in the specific direction
    if (direction) {
      if (cardIndex !== 0) {
        otherCardIndex = cardIndex - 1;
      }
    } else {
      if (cardIndex + 1 < cards.length) {
        otherCardIndex = cardIndex + 1;
      }
    }

    // if we cannot find the other index, then we can't find the other card
    if (otherCardIndex === -1) {
      return {error: 2};
    }

    // swap the cards order indexes
    sql = "UPDATE Cards " +
    "SET orderIndex = IF(cardId=?, ?, ?) " +
    "WHERE cardId IN (?, ?);";
    const sqlArray = [];
    sqlArray.push(cardId);
    sqlArray.push(cards[otherCardIndex].orderIndex);
    sqlArray.push(cards[cardIndex].orderIndex);
    sqlArray.push(cardId);
    sqlArray.push(cards[otherCardIndex].cardId);
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      cardId: cardId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving card");
    throw Error(err);
  }

}
exports.moveCard = moveCard;