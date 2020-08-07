// File: cards.js
// Description: Provides functions for working with card data.

const {pool} = require("../services/database/mysqlPool");


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
          return {error: 3};
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
    const orderIndex = results[0][0].orderIndex;

    // make sure all of the icons being used on this card are valid
    sql = "SELECT iconType " +
    "FROM Icons " +
    "WHERE groupIndex = 0;";
    results = await pool.query(sql, []);

    const icons = results[0];
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < icons.length; j++) {
        if (items[i].iconType === icons[j].iconType) {
          return {error: 2};
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
      "tempTitle, tempUserId, tempOrderIndex) " +
      "VALUES (?, ?, ?, ?, ?);";
      results = await pool.query(sql, [cardId, cardType, title, userId, orderIndex]);

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
    const approved = results[0][0].approved;
    const cardType = results[0][0].cardType;
    const created = results[0][0].created;

    // if the card was published previously, save the published data to history
    if (approved) {
      sql = "INSERT INTO History_Cards (cardId, headerId, cardType, title, created) " +
      "VALUES (?, ?, ?, ?, ?);";
      results = await pool.query(sql, [cardId, headerId, cardType, title, created]);
      const newHistoryId = results[0].insertId;

      // save item history as well
      sql = "SELECT * " +
      "FROM Items " +
      "WHERE cardId = ? " +
      "AND approved = 1;";
      results = await pool.query(sql, [cardId]);

      for (let i = 0; i < results[0].length; i++) {
        const sqlArray = [newHistoryId, results[0][i].itemId, results[0][i].cardId,
          results[0][i].orderIndex, results[0][i].indentation, results[0][i].iconType,
          results[0][i].contentText, results[0][i].contentUrl, results[0][i].contentLabel,
          results[0][i].contentMode, results[0][i].created];

        sql = "INSERT INTO History_Items " +
        "(parentId, itemId, cardId, orderIndex, indentation, iconType, contentText, " +
        "contentUrl, contentLabel, contentMode, created) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        await pool.query(sql, sqlArray);
      }
    }

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
      "SET cardType = ?, title = ?, userId = ?, created = ?, orderIndex = ?, approved = 1 " +
      "WHERE cardId = ?;";

      const tempArray = [tempCard.tempCardType, tempCard.tempTitle,
        tempCard.tempUserId, tempCard.tempCreated, tempCard.tempOrderIndex, cardId];

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


// move a published card
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

    // get all of the cards and temp cards under the current header
    sql = "SELECT * " +
    "FROM Cards " +
    "LEFT JOIN Temp_Cards " +
    "ON cardId = tempCardId " +
    "WHERE headerId = ? " +
    "ORDER BY orderIndex ASC, cardId ASC";
    results = await pool.query(sql, headerId);

    // create an array with all of the cards
    // each card has an id, type (normal / temp), and an order index
    const cardOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempCardId > 0) {

        const cardObj = {
          id: results[0][i].cardId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };

        const tempCardObj = {
          id: results[0][i].tempCardId,
          type: "temp",
          order: results[0][i].tempOrderIndex,
          show: "hidden"
        };

        cardOrderArray.push(cardObj);
        cardOrderArray.push(tempCardObj);

      } else {
        const cardObj = {
          id: results[0][i].cardId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };
        cardOrderArray.push(cardObj);
      }
    }

    // sort the array of cards by order index
    cardOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified card
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (parseInt(cardOrderArray[i].id, 10) === parseInt(cardId, 10) && cardOrderArray[i].type === "norm") {
        if (direction) {
          // try to move up and skip hidden cards
          for (let j = i; j > 0; j--) {
            const tempObj = cardOrderArray[j - 1];
            cardOrderArray[j - 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden cards
          for (let j = i; j < cardOrderArray.length - 1; j++) {
            const tempObj = cardOrderArray[j + 1];
            cardOrderArray[j + 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the cards and split it into normal and temp cards
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (cardOrderArray[i].type === "temp") {
        tempArray.push(parseInt(cardOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(cardOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (cardOrderArray[i].type === "temp") {
        tempArray.push(cardOrderArray[i].id);
      } else {
        normArray.push(cardOrderArray[i].id);
      }
    }

    // update the published cards
    if (normArray.length) {
      sql = "UPDATE Cards " +
      "SET orderIndex = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN cardId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE cardId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished cards
    if (tempArray.length) {
      sql = "UPDATE Temp_Cards " +
      "SET tempOrderIndex = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempCardId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempCardId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

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


// move an unpublished card
async function moveTempCard(cardId, direction) {

  try {

    // make sure that the card exists
    let sql = "SELECT * " +
    "FROM Cards " +
    "WHERE cardId = ? ";
    let results = await pool.query(sql, cardId);

    if (!results[0].length) {
      return {error: 1};
    }

    const headerId = results[0][0].headerId;
    const approved = results[0][0].approved;

    let cardType = "norm";

    // see if this card is already approved
    if (approved) {

      // since it is approved, get the temp card version of the card
      const sql = "SELECT * " +
      "FROM Temp_Cards " +
      "WHERE tempCardId = ? ";
      results = await pool.query(sql, cardId);
      cardType = "temp";

      if (!results[0].length) {
        return {error: 1};
      }

    }

    // get all of the cards and temp cards under the current header
    sql = "SELECT * " +
    "FROM Cards " +
    "LEFT JOIN Temp_Cards " +
    "ON cardId = tempCardId " +
    "WHERE headerId = ? " +
    "ORDER BY orderIndex ASC, cardId ASC";
    results = await pool.query(sql, headerId);

    // create an array with all of the cards
    // each card has an id, type (normal / temp), and an order index
    const cardOrderArray = [];
    for (let i = 0; i < results[0].length; i++) {
      if (results[0][i].tempCardId > 0) {

        const cardObj = {
          id: results[0][i].cardId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "hidden"
        };

        const tempCardObj = {
          id: results[0][i].tempCardId,
          type: "temp",
          order: results[0][i].tempOrderIndex,
          show: "show"
        };

        cardOrderArray.push(cardObj);
        cardOrderArray.push(tempCardObj);

      } else {
        const cardObj = {
          id: results[0][i].cardId,
          type: "norm",
          order: results[0][i].orderIndex,
          show: "show"
        };
        cardOrderArray.push(cardObj);
      }
    }

    // sort the array of cards by order index
    cardOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified card
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (parseInt(cardOrderArray[i].id, 10) === parseInt(cardId, 10) && cardOrderArray[i].type === cardType) {
        if (direction) {
          // try to move up and skip hidden cards
          for (let j = i; j > 0; j--) {
            const tempObj = cardOrderArray[j - 1];
            cardOrderArray[j - 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden cards
          for (let j = i; j < cardOrderArray.length - 1; j++) {
            const tempObj = cardOrderArray[j + 1];
            cardOrderArray[j + 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // apply new order values to the cards and split it into normal and temp cards
    const normArray = [];
    const tempArray = [];
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (cardOrderArray[i].type === "temp") {
        tempArray.push(parseInt(cardOrderArray[i].id, 10));
        tempArray.push(i + 1);
      } else {
        normArray.push(parseInt(cardOrderArray[i].id, 10));
        normArray.push(i + 1);
      }
    }

    // push the ids to the end once more to match with the future query
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (cardOrderArray[i].type === "temp") {
        tempArray.push(cardOrderArray[i].id);
      } else {
        normArray.push(cardOrderArray[i].id);
      }
    }

    // update the published cards
    if (normArray.length) {
      sql = "UPDATE Cards " +
      "SET orderIndex = CASE ";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "WHEN cardId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE cardId IN (";
      for (let i = 0; i < normArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, normArray);
    }

    // update the unpublished cards
    if (tempArray.length) {
      sql = "UPDATE Temp_Cards " +
      "SET tempOrderIndex = CASE ";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "WHEN tempCardId = ? THEN ? ";
      }
      sql += "ELSE 0 END WHERE tempCardId IN (";
      for (let i = 0; i < tempArray.length / 3; i++) {
        sql += "?,";
      }
      sql = sql.replace(/.$/, ");");
      results = await pool.query(sql, tempArray);
    }

    const finalResults = {
      cardId: cardId
    };

    return finalResults;

  } catch (err) {
    console.error("Error moving card");
    throw Error(err);
  }

}
exports.moveTempCard = moveTempCard;