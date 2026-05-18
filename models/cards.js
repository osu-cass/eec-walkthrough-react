// File: cards.js
// Description: Provides functions for working with card data

const {pool} = require("../services/database/mysqlPool");
const {sanitizeRichText} = require("../services/format/sanitizeRichText");

// True when contentUrl is not a same-origin path (e.g. /uploads/...).
function isExternalGraphicUrl(contentUrl) {
  if (!contentUrl.length) {
    return false;
  }
  if (contentUrl.startsWith("//")) {
    return true;
  }
  return /^[a-z][a-z0-9+.-]*:/i.test(contentUrl);
}

// create a card
async function createCard(headerId, cardType, title, items, userId) {

  try {
    // 1. Check for a duplicate card title in header
    const [existingCards] = await pool.query(
      `SELECT * FROM Cards WHERE headerId = ? AND title = ?;`,
      [headerId, title]
    );
    if (existingCards.length) return { error: 1 };

    // 2. Confirm header exists
    const [headers] = await pool.query(
      `SELECT * FROM Headers WHERE headerId = ?;`,
      [headerId]
    );
    if (!headers.length) return { error: 2 };

    // 3. Get invalid icons
    const [icons] = await pool.query(
      `SELECT iconType FROM Icons WHERE groupIndex = 0;`
    );

    // 4. Validate items
    const invalidIconTypes = new Set(icons.map((i) => i.iconType));
    let notImage = false;

    for (const item of items) {
      const {
        indentation,
        iconType,
        contentText,
        contentUrl,
        contentLabel,
        contentMode,
        internal,
        inline,
        sourceId,
        learnMoreUrl,
      } = item;

      if (
        typeof indentation !== "number" ||
        typeof iconType !== "number" ||
        typeof contentText !== "string" ||
        typeof contentUrl !== "string" ||
        typeof contentLabel !== "string" ||
        typeof contentMode !== "number" ||
        typeof internal !== "number" ||
        typeof inline !== "number" ||
        typeof sourceId !== "number" ||
        typeof learnMoreUrl !== "string"
      ) {
        return { error: 3 };
      }

      // FIX: Change this line - should reject if NOT in allowed set
      if (invalidIconTypes.has(iconType)) {
        return { error: 3 }; // using invalid icon
      }

      // Reject external URLs for graphic items (contentText empty = graphic)
      if (contentText === "" && isExternalGraphicUrl(contentUrl)) {
        return { error: 5 };
      }

      // Check if any item is not an image
      if (contentText !== "" || !contentUrl.length || !contentLabel.length) {
        notImage = true;
      }
    }

    // 5. Card type 1 or 11 must be image-only
    if ((cardType === 1 || cardType === 11) && notImage) {
      return { error: 4 };
    }

    // 6. Insert the card (set orderIndex to 0 temporarily)
    const [insertResult] = await pool.query(
      `INSERT INTO Cards (headerId, cardType, title, userId, orderIndex, approved)
       VALUES (?, ?, ?, ?, 0, 0);`,
      [headerId, cardType, title, userId]
    );

    console.debug("insertResult", insertResult);
    console.debug("typeof insertResult.insertId", typeof insertResult.insertId);

    if (!insertResult || typeof insertResult.insertId !== "number") {
      throw new Error("Card insert failed — insertId not returned.");
    }

    const cardId = insertResult.insertId;

    // 7. Update orderIndex to be equal to cardId
    await pool.query(
      `UPDATE Cards SET orderIndex = ? WHERE cardId = ?;`,
      [cardId, cardId]
    );

    // 8. Insert items
    const sqlParams = [];

    let itemsSql = `INSERT INTO Items (
      cardId, orderIndex, indentation, iconType, contentText,
      contentUrl, contentLabel, contentMode,
      internal, inline, sourceId, learnMoreUrl, approved
    ) VALUES `;

    for (const item of items) {
      console.log("Processing item:", {
        indentation: item.indentation,
        iconType: item.iconType,
        contentText: item.contentText?.substring(0, 50) + "...",
        contentUrl: item.contentUrl,
        contentLabel: item.contentLabel,
        contentMode: item.contentMode,
        internal: item.internal,
        inline: item.inline,
        sourceId: item.sourceId,
        learnMoreUrl: item.learnMoreUrl
      });
      
      itemsSql += `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0),`;
      sqlParams.push(
        cardId,
        items.indexOf(item),
        item.indentation,
        item.iconType,
        sanitizeRichText(item.contentText),
        item.contentUrl,
        item.contentLabel,
        item.contentMode,
        item.internal,
        item.inline,
        item.sourceId,
        item.learnMoreUrl
      );
    }

    itemsSql = itemsSql.slice(0, -1) + ";"; // Replace final comma with semicolon

    console.log("=== DEBUG SQL CONSTRUCTION ===");
    console.log("Items count:", items.length);
    console.log("Final SQL:", itemsSql);
    console.log("SQL params count:", sqlParams.length);
    console.log("SQL params:", sqlParams);
    console.log("================================");

    try {
      await pool.query(itemsSql, sqlParams);
    } catch (err) {
      console.error("SQL Error:", err);
      console.error("SQL Query:", itemsSql);
      console.error("SQL Params:", sqlParams);
      throw err; // Re-throw to maintain error handling
    }
    // 9. Return success
    return { insertId: cardId };
  } catch (err) {
    console.error("Error creating card:", err);
    throw err; // Let the calling code handle the error if needed
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

    // if the card was previously approved, save this deletion in history
    if (results[0][0].approved) {
      sql = "INSERT INTO History_Cards (cardId, headerId, cardType, title, removed) " +
				"SELECT cardId, headerId, cardType, title, 1 AS removed FROM Cards " +
				"WHERE Cards.approved = 1 AND Cards.cardId = ?;";
      results = await pool.query(sql, [cardId]);
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
          results[0][i].contentMode, results[0][i].internal, results[0][i].inline,
          results[0][i].created, results[0][i].sourceId];

        sql = "INSERT INTO History_Items " +
					"(parentId, itemId, cardId, orderIndex, indentation, iconType, contentText, " +
					"contentUrl, contentLabel, contentMode, internal, inline, created, sourceId) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        await pool.query(sql, sqlArray);
      }
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

    // make sure all of the icons being used on this card are valid,
    // and make sure all of the items are valid as well
    sql = "SELECT iconType " +
			"FROM Icons " +
			"WHERE groupIndex = 0;";
    results = await pool.query(sql, []);

    let notImage = false;
    const icons = results[0];
    for (let i = 0; i < items.length; i++) {
      // check the icons
      for (let j = 0; j < icons.length; j++) {
        // checks if the current item's icon is in the invalid icon types
        if (items[i].iconType === icons[j].iconType) {
          return {error: 2};
        }
      }
      // check the other values
      if (typeof items[i].indentation !== "number") {
        return {error: 2};
      } else if (typeof items[i].iconType !== "number") {
        return {error: 2};
      } else if (typeof items[i].contentText !== "string") {
        return {error: 2};
      } else if (typeof items[i].contentUrl !== "string") {
        return {error: 2};
      } else if (typeof items[i].contentLabel !== "string") {
        return {error: 2};
      } else if (typeof items[i].contentMode !== "number") {
        return {error: 2};
      } else if (typeof items[i].internal !== "number") {
        return {error: 2};
      } else if (typeof items[i].inline !== "number") {
        return {error: 2};
      } else if (typeof items[i].sourceId !== "number") {
        return {error: 2};
      } else if (typeof items[i].learnMoreUrl !== "string") {
        return {error: 2};
      }

      // Reject external URLs for graphic items (contentText empty = graphic)
      if (items[i].contentText === "" && isExternalGraphicUrl(items[i].contentUrl)) {
        return {error: 5};
      }

      // see if we have a non-image item
      if (items[i].contentText !== "" || !items[i].contentUrl.length || !items[i].contentLabel.length) {
        notImage = true;
      }
    }

    // if the card is a thumbnail gallery make sure that only images are allowed
    if ((cardType === 1 || cardType === 11) && notImage) {
      return {error: 3};
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
        sql = "INSERT INTO Items (cardId, orderIndex, indentation, iconType, " +
					"contentText, contentUrl, contentLabel, contentMode, internal, inline, sourceId, learnMoreUrl, approved) VALUES ";

        // expand the sql string and array based on the number of items
        items.forEach((currentValue, index) => {
          sql += "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0),";
          sqlArray.push(cardId);
          sqlArray.push(typeof currentValue.orderIndex === "number" ? currentValue.orderIndex : index);
          sqlArray.push(currentValue.indentation);
          sqlArray.push(currentValue.iconType);
          sqlArray.push(sanitizeRichText(currentValue.contentText));
          sqlArray.push(currentValue.contentUrl);
          sqlArray.push(currentValue.contentLabel);
          sqlArray.push(currentValue.contentMode);
          sqlArray.push(currentValue.internal);
          sqlArray.push(currentValue.inline);
          sqlArray.push(currentValue.sourceId);
          sqlArray.push(currentValue.learnMoreUrl);
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


// publish a card
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

    // get the page ID
    sql = "SELECT * " +
			"FROM Headers " +
			"WHERE headerId = ?;";
    results = await pool.query(sql, headerId);

    if (!results[0].length) {
      return {error: 1};
    }

    const pageId = results[0][0].pageId;

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
				"SET cardType = ?, title = ?, userId = ?, created = CURRENT_TIMESTAMP, orderIndex = ?, approved = 1 " +
				"WHERE cardId = ?;";

      const tempArray = [tempCard.tempCardType, tempCard.tempTitle,
        tempCard.tempUserId, tempCard.tempOrderIndex, cardId];

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

    // save the published data to history
    sql = "INSERT INTO History_Cards (cardId, headerId, cardType, title, removed) " +
			"SELECT cardId, headerId, cardType, title, 0 AS removed FROM Cards " +
			"WHERE Cards.approved = 1 AND Cards.cardId = ?;";
    results = await pool.query(sql, [cardId]);
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
        results[0][i].contentMode, results[0][i].internal, results[0][i].inline, results[0][i].created, results[0][i].sourceId];

      sql = "INSERT INTO History_Items " +
				"(parentId, itemId, cardId, orderIndex, indentation, iconType, contentText, " +
				"contentUrl, contentLabel, contentMode, internal, inline, created, sourceId) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

      await pool.query(sql, sqlArray);
    }

    // update the last updated date of the page
    sql = "UPDATE Pages " +
			"SET created = CURRENT_TIMESTAMP " +
			"WHERE pageId = ?;";
    await pool.query(sql, pageId);

    return finalResults;

  } catch (err) {
    console.error("Error publishing card");
    throw Error(err);
  }

}
exports.publishCard = publishCard;


// unpublish a card
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


// return a list of all icons
async function getCardTitles() {

  try {
    // get all titles
    const sql = "SELECT * " +
			"FROM Quick_Titles " +
			"ORDER BY title ASC;";

    const results = await pool.query(sql, []);

    const finalResults = {
      titles: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for card titles");
    throw Error(err);
  }

}
exports.getCardTitles = getCardTitles;


// create a list of titles
async function createCardTitles(titles) {

  try {

    // start by deleting the previous card titles
    let sql = "DELETE FROM Quick_Titles;";
    await pool.query(sql, []);

    // make sure that titles are valid
    for (let i = 0; i < titles.length; i++) {
      if (typeof titles[i].title !== "string" || titles[i].title.length === 0) {
        return {error: 1};
      }
    }

    // add the new titles
    for (let i = 0; i < titles.length; i++) {
      sql = "INSERT INTO Quick_Titles (title) VALUES (?);";
      await pool.query(sql, titles[i].title);
    }

    const finalResults = {
      titleCount: titles.length
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating titles");
    throw Error(err);
  }

}
exports.createCardTitles = createCardTitles;