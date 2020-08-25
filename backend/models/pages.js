// File: pages.js
// Description: Provides functions for working with page data.

const moment = require("moment");
const {pool} = require("../services/database/mysqlPool");


// return all of the page info, headers, cards, and items for a single page
async function getFullPage(pageId, viewAll) {

  try {

    let sql = "";

    // these arrays stores all of the items that have a cited source
    const sources = [];
    let sqlArray = [];

    // get the specified page
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Pages " +
      "LEFT JOIN Temp_Pages " +
      "ON pageId = tempPageId " +
      "WHERE pageId = ?;";
    } else {
      sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 1 " +
      "AND internal = 0;";
    }

    let results = await pool.query(sql, pageId);
    const finalResults = results[0][0];

    // check to see if we were able to find the page
    if (!results[0].length) {
      return {pageId: 0};
    }

    // get all of the sources for the page
    sql = "SELECT * " +
    "FROM Sources " +
    "WHERE pageId = ? " +
    "ORDER BY sourceId;";
    results = await pool.query(sql, pageId);
    finalResults.allSources = results[0];

    // get all of the headers for the page
    if (viewAll) {
      sql = "SELECT * " +
      "FROM Headers " +
      "LEFT JOIN Temp_Headers " +
      "ON headerId = tempHeaderId " +
      "WHERE pageId = ? " +
      "ORDER BY orderIndex ASC, headerId ASC;";
    } else {
      sql = "SELECT * " +
      "FROM Headers " +
      "WHERE pageId = ? " +
      "AND approved = 1 " +
      "AND internal = 0 " +
      "ORDER BY orderIndex ASC, headerId ASC;";
    }

    results = await pool.query(sql, pageId);
    finalResults.headers = results[0];
    const headerCount = finalResults.headers.length;


    // get all of the cards for each header
    for (let i = 0; i < headerCount; i++) {
      const headerId = finalResults.headers[i].headerId;

      if (viewAll) {
        sql = "SELECT * " +
        "FROM Cards " +
        "LEFT JOIN Temp_Cards " +
        "ON cardId = tempCardId " +
        "WHERE headerId = ? " +
        "ORDER BY orderIndex ASC, cardId ASC";
      } else {
        sql = "SELECT * " +
        "FROM Cards " +
        "WHERE headerId = ? " +
        "AND approved = 1 " +
        "AND cardType < 10 " +
        "ORDER BY orderIndex ASC, cardId ASC";
      }

      results = await pool.query(sql, headerId);
      finalResults.headers[i].cards = results[0];
      const cardCount = finalResults.headers[i].cards.length;

      // get all of the items for each card
      for (let j = 0; j < cardCount; j++) {

        const cardId = finalResults.headers[i].cards[j].cardId;

        if (viewAll) {

          // get all approved items
          sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, contentMode, internal, " +
          "created, approved, color, sourceId " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND approved = 1 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].items = results[0];

          // get all of the cited source ids
          for (let k = 0; k < results[0].length; k++) {
            if (results[0][k].sourceId) {
              sources.push(results[0][k].sourceId);
            }
          }

          // get all unapproved items
          sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, contentMode, internal, " +
          "created, approved, color, sourceId " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND approved = 0 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].tempItems = results[0];

        } else {

          sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
          "Items.iconType, typeName, typeKeyword, contentText, " +
          "contentUrl, contentLabel, contentMode, " +
          "created, approved, color, sourceId " +
          "FROM Items " +
          "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
          "WHERE cardId = ? " +
          "AND internal = 0 " +
          "AND approved = 1 " +
          "ORDER BY orderIndex ASC, itemId ASC";

          results = await pool.query(sql, cardId);

          finalResults.headers[i].cards[j].items = results[0];
          finalResults.headers[i].cards[j].tempItems = [];

          // get all of the cited source ids
          for (let k = 0; k < results[0].length; k++) {
            if (results[0][k].sourceId) {
              sources.push(results[0][k].sourceId);
            }
          }

        }

      }

    }

    // convert all of the cited source IDs to source objects
    if (sources.length) {
      sqlArray = [];
      sql = "SELECT * " +
      "FROM Sources " +
      "WHERE pageId = ? " +
      "AND (";
      sqlArray.push(pageId);

      for (let i = 0; i < sources.length; i++) {
        if (i === sources.length - 1) {
          sql += "sourceId = ?) ORDER BY sourceId;";
        } else {
          sql += "sourceId = ? OR ";
        }
        sqlArray.push(sources[i]);
      }

      results = await pool.query(sql, sqlArray);
      finalResults.sources = results[0];
    } else {
      finalResults.sources = [];
    }

    // loop through all of the items and set their source IDs to the new order
    for (let i = 0; i < finalResults.headers.length; i++) {
      for (let j = 0; j < finalResults.headers[i].cards.length; j++) {

        // normal items
        for (let k = 0; k < finalResults.headers[i].cards[j].items.length; k++) {
          if (finalResults.headers[i].cards[j].items[k].sourceId === 0) {
            finalResults.headers[i].cards[j].items[k].refId = 0;
          } else {
            finalResults.headers[i].cards[j].items[k].refId = -1;
          }
          for (let l = 0; l < finalResults.sources.length; l++) {
            if (finalResults.headers[i].cards[j].items[k].sourceId === finalResults.sources[l].sourceId) {
              finalResults.headers[i].cards[j].items[k].refId = l + 1;
              break;
            }
          }
        }

        // temp items
        for (let k = 0; k < finalResults.headers[i].cards[j].tempItems.length; k++) {
          if (finalResults.headers[i].cards[j].tempItems[k].sourceId === 0) {
            finalResults.headers[i].cards[j].tempItems[k].refId = 0;
          } else {
            finalResults.headers[i].cards[j].tempItems[k].refId = -1;
          }
          for (let l = 0; l < finalResults.sources.length; l++) {
            if (finalResults.headers[i].cards[j].tempItems[k].sourceId === finalResults.sources[l].sourceId) {
              finalResults.headers[i].cards[j].tempItems[k].refId = l + 1;
              break;
            }
          }
        }

      }
    }

    return finalResults;

  } catch (err) {
    console.error("Error searching for page");
    throw Error(err);
  }

}
exports.getFullPage = getFullPage;


// create a page
async function createPage(pageType, name, title, description, imageUrl, userId, internal) {

  try {

    // make sure the page does not already exist
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageType = ? " +
    "AND name = ?;";
    let results = await pool.query(sql, [pageType, name]);

    if (results[0].length) {
      return {error: 1};
    }

    // create the new page
    sql = "INSERT INTO Pages (pageType, name, title, description, imageUrl, userId, internal, approved) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, 0);";
    results = await pool.query(sql, [pageType, name, title, description, imageUrl, userId, internal]);

    const finalResults = {
      insertId: results[0].insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating page");
    throw Error(err);
  }

}
exports.createPage = createPage;


// delete a page
async function deletePage(pageId) {

  try {

    // check to see if the page exists
    let sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // if the page was previously approved, save this deletion in history
    if (results[0][0].approved) {
      sql = "INSERT INTO History_Pages (pageId, pageType, name, title, description, imageUrl, internal, removed) " +
      "SELECT pageId, pageType, name, title, description, imageUrl, internal, 1 AS removed FROM Pages " +
      "WHERE Pages.approved = 1 AND Pages.pageId = ?;";
      await pool.query(sql, [pageId]);
    }

    // delete the page
    sql = "DELETE " +
      "FROM Pages " +
      "WHERE pageId = ?;";

    results = await pool.query(sql, pageId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting page");
    throw Error(err);
  }

}
exports.deletePage = deletePage;


// delete page changes
async function deletePageChanges(pageId) {

  try {

    // checks to see if there is an edited version of the page to delete
    let sql = "SELECT * " +
    "FROM Temp_Pages " +
    "WHERE tempPageId = ?;";

    let results = await pool.query(sql, pageId);

    if (results[0].length) {

      sql = "DELETE " +
        "FROM Temp_Pages " +
        "WHERE tempPageId = ?;";

      results = await pool.query(sql, pageId);

      const finalResults = {
        affectedRows: results[0].affectedRows
      };

      return finalResults;
    }

    // check to see if the page is in the pages table but not yet published
    sql = "SELECT * " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 0;";

    results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // delete the page
    sql = "DELETE " +
      "FROM Pages " +
      "WHERE pageId = ? " +
      "AND approved = 0;";

    results = await pool.query(sql, pageId);

    const finalResults = {
      affectedRows: results[0].affectedRows
    };

    return finalResults;

  } catch (err) {
    console.error("Error deleting page changes");
    throw Error(err);
  }

}
exports.deletePageChanges = deletePageChanges;


// update a page
async function updatePage(pageId, pageType, name, title, description, imageUrl, userId, internal) {

  try {

    const sqlArray = [];

    // make sure that the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    const approved = results[0][0].approved;

    // See if we already have an unpublished page.
    // Either create a new one or update the existing one.
    sql = "SELECT * " +
    "FROM Temp_Pages " +
    "WHERE tempPageId = ?;";
    results = await pool.query(sql, pageId);

    if (results[0].length) {

      sql = "UPDATE Temp_Pages " +
      "SET tempPageType = ?, tempName = ?, tempTitle = ?, tempDescription = ?, tempImageUrl = ?, tempUserId = ?, tempInternal = ? " +
      "WHERE tempPageId = ?;";
      sqlArray.push(pageType);
      sqlArray.push(name);
      sqlArray.push(title);
      sqlArray.push(description);
      sqlArray.push(imageUrl);
      sqlArray.push(userId);
      sqlArray.push(internal);
      sqlArray.push(pageId);

    } else if (approved === 0) {

      sql = "UPDATE Pages " +
      "SET pageType = ?, name = ?, title = ?, description = ?, imageUrl = ?, userId = ?, internal = ? " +
      "WHERE pageId = ?;";
      sqlArray.push(pageType);
      sqlArray.push(name);
      sqlArray.push(title);
      sqlArray.push(description);
      sqlArray.push(imageUrl);
      sqlArray.push(userId);
      sqlArray.push(internal);
      sqlArray.push(pageId);

    } else {

      sql = "INSERT INTO Temp_Pages (tempPageId, " +
      "tempPageType, tempName, tempTitle, tempDescription, tempImageUrl, tempUserId, tempInternal) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
      sqlArray.push(pageId);
      sqlArray.push(pageType);
      sqlArray.push(name);
      sqlArray.push(title);
      sqlArray.push(description);
      sqlArray.push(imageUrl);
      sqlArray.push(userId);
      sqlArray.push(internal);

    }

    // perform the update query
    results = await pool.query(sql, sqlArray);

    const finalResults = {
      pageId: pageId
    };

    return finalResults;

  } catch (err) {
    console.error("Error updating page");
    throw Error(err);
  }

}
exports.updatePage = updatePage;


// gets pages that match the search query
async function searchPages(text, cursor, viewAll) {
  try {

    const RESULTS_PER_PAGE = 25;
    const sqlArray = [];
    let pages;
    const nextCursor = {
      primary: "null",
      secondary: "null"
    };

    // initial sql query
    let sql = "SELECT * FROM Pages ";

    // only use the cursor if it isn't the initial search request
    if (cursor.primary === "null") {
      sql += "WHERE TRUE ";
    } else {

      // We set our primary cursor to the name as it is the value
      // that we are sorting by.
      //
      // Instances where the primary cursor value could have duplicate values
      // are handled by also sorting by page ID.

      sql += "WHERE name >= ? AND " +
        "(name > ? OR pageId >= ?) ";
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.primary);
      sqlArray.push(cursor.secondary);

    }

    // get the text we are searching for
    if (text !== "*") {
      sql += "AND name LIKE CONCAT('%', ?, '%') ";
      sqlArray.push(text);
    }

    // only show the user pages they are allowed to see
    if (!viewAll) {
      sql += "AND approved = 1 ";
    }

    // sort search results by name
    sql += "ORDER BY name ASC, " +
      "pageId ASC LIMIT ?;";

    // get the number of results per page (plus the next cursor)
    sqlArray.push(RESULTS_PER_PAGE + 1);

    // perform the query
    const results = await pool.query(sql, sqlArray);

    // get the next cursor and return the correct number of pages
    if (results[0].length < RESULTS_PER_PAGE + 1) {

      // if we have returned the last of the data then we return
      // a null next cursor
      pages = results[0];
      nextCursor.primary = "null";
      nextCursor.secondary = "null";

    } else {

      // Our next cursor will store a primary and secondary value.
      // The primary value is the main value we are sorting by.
      // The secondary value is the page ID and it is used to sort when we
      // have results with matching primary values.
      pages = results[0].slice(0, -1);
      const nextPlan = results[0][RESULTS_PER_PAGE];

      // set the primary and secondary strings
      nextCursor.primary = String(nextPlan.username);
      nextCursor.secondary = String(nextPlan.userId);

    }

    return {
      pages: pages,
      nextCursor: nextCursor
    };

  } catch (err) {
    console.error("Error searching for pages");
    throw Error(err);
  }
}
exports.searchPages = searchPages;


async function publishPage(pageId) {

  try {

    // make sure that the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    const name = results[0][0].name;
    const pageType = results[0][0].pageType;

    // check if there is new page data
    sql = "SELECT * " +
    "FROM Temp_Pages " +
    "WHERE tempPageId = ?;";
    results = await pool.query(sql, pageId);

    const tempPage = results[0][0];

    // if there is new page data, replace the old data
    // otherwise simply update the approved value
    if (tempPage) {

      // update the published page
      sql = "UPDATE Pages " +
      "SET name = ?, pageType = ?, title = ?, description = ?, imageUrl = ?, " +
      "userId = ?, created = CURRENT_TIMESTAMP, internal = ?, approved = 1 " +
      "WHERE pageId = ?;";

      const tempArray = [tempPage.tempName, tempPage.tempPageType, tempPage.tempTitle, tempPage.tempDescription,
        tempPage.tempImageUrl, tempPage.tempUserId, tempPage.tempInternal, pageId];

      // make sure no other pages share the same name
      const checkSql = "SELECT * " +
      "FROM Pages " +
      "WHERE name = ? " +
      "AND pageType = ? " +
      "AND pageId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [tempPage.tempName, pageType, pageId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
      results = await pool.query(sql, tempArray);

      // delete the old temp page
      sql = "DELETE FROM Temp_Pages " +
      "WHERE tempPageId = ?;";
      results = await pool.query(sql, pageId);

    } else {

      sql = "UPDATE Pages " +
      "SET approved = 1 " +
      "WHERE pageId = ?;";

      // make sure no other pages share the same name
      const checkSql = "SELECT * " +
      "FROM Pages " +
      "WHERE name = ? " +
      "AND pageType = ? " +
      "AND pageId != ? " +
      "AND approved = 1;";
      results = await pool.query(checkSql, [name, pageType, pageId]);

      if (results[0].length) {
        return {error: 2};
      }

      // publish
      results = await pool.query(sql, pageId);

    }

    // save the published data to history
    sql = "INSERT INTO History_Pages (pageId, pageType, name, title, description, imageUrl, internal) " +
    "SELECT pageId, pageType, name, title, description, imageUrl, internal FROM Pages " +
    "WHERE Pages.approved = 1 AND Pages.pageId = ?;";
    await pool.query(sql, [pageId]);

    const finalResults = {
      pageId: pageId
    };

    return finalResults;

  } catch (err) {
    console.error("Error publishing page");
    throw Error(err);
  }

}
exports.publishPage = publishPage;


async function unpublishPage(pageId) {

  try {

    // make sure that the page exists
    let sql = "SELECT * " +
    "FROM Pages " +
    "WHERE pageId = ?;";
    let results = await pool.query(sql, pageId);

    if (!results[0].length) {
      return {error: 1};
    }

    // set the page to unpublished
    sql = "UPDATE Pages " +
    "SET approved = 0 " +
    "WHERE pageId = ?;";
    results = await pool.query(sql, pageId);

    // delete any old temp pages
    sql = "DELETE FROM Temp_Pages " +
    "WHERE tempPageId = ?;";
    results = await pool.query(sql, pageId);

    const finalResults = {
      pageId: pageId
    };

    return finalResults;

  } catch (err) {
    console.error("Error unpublishing page");
    throw Error(err);
  }

}
exports.unpublishPage = unpublishPage;


async function getReport(start, end, condense) {

  try {

    const oldestTimestamp = "2019-01-01 00:00:00";
    const startTimestamp = start + " 00:00:00";
    const endTimestamp = end + " 23:59:59";

    // get all pages within the date range
    let sql = "SELECT HP.*, Categories.pluralName AS categoryName " +
    "FROM History_Pages AS HP " +
    "LEFT JOIN Categories on HP.pageType = Categories.categoryId " +
    "WHERE HP.created BETWEEN ? AND ? " +
    "ORDER BY HP.created ASC;";
    let results = await pool.query(sql, [startTimestamp, endTimestamp]);
    let allPageArray = results[0];

    // if in condense mode, clean up duplicate pages
    if (condense) {
      allPageArray.sort((a, b) => b.created - a.created);
      const idArray = [];
      for (let i = 0; i < allPageArray.length; i++) {
        idArray.push(allPageArray[i].pageId);
      }
      allPageArray = allPageArray.filter((value, index) => idArray.indexOf(value.pageId) === index);
    }

    // get the previous version of each page to use for diffs
    for (let i = 0; i < allPageArray.length; i++) {
      const newTimestamp = moment(allPageArray[i].created).format("YYYY-MM-DD HH:mm:ss");

      if (condense) {
        sql = "SELECT * " +
        "FROM History_Pages " +
        "WHERE created BETWEEN ? AND ? " +
        "AND pageId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allPageArray[i].pageId]);

        if (results[0].length > 1) {
          for (let j = 0; j < results[0].length; j++) {
            if (moment(results[0][j].created) < moment(startTimestamp)) {
              allPageArray[i].oldVersion = results[0][j];
              break;
            }
          }
        }
      } else {
        sql = "SELECT * " +
        "FROM History_Pages " +
        "WHERE created BETWEEN ? AND ? " +
        "AND pageId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allPageArray[i].pageId]);

        if (results[0].length > 1) {
          allPageArray[i].oldVersion = results[0][1];
        }
      }

    }

    const finalResults = {
      pages: allPageArray
    };

    // get all headers within the date range
    sql = "SELECT HH.*, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
    "FROM History_Headers AS HH " +
    "LEFT JOIN Pages on Pages.pageId = HH.pageId " +
    "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
    "WHERE HH.created BETWEEN ? AND ? " +
    "ORDER BY HH.created ASC;";
    results = await pool.query(sql, [startTimestamp, endTimestamp]);
    let allHeaderArray = results[0];

    // if in condense mode, clean up duplicate headers
    if (condense) {
      allHeaderArray.sort((a, b) => b.created - a.created);
      const idArray = [];
      for (let i = 0; i < allHeaderArray.length; i++) {
        idArray.push(allHeaderArray[i].headerId);
      }
      allHeaderArray = allHeaderArray.filter((value, index) => idArray.indexOf(value.headerId) === index);
    }

    // get the previous version of each header to use for diffs
    for (let i = 0; i < allHeaderArray.length; i++) {
      const newTimestamp = moment(allHeaderArray[i].created).format("YYYY-MM-DD HH:mm:ss");

      if (condense) {
        sql = "SELECT * " +
        "FROM History_Headers " +
        "WHERE created BETWEEN ? AND ? " +
        "AND headerId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allHeaderArray[i].headerId]);

        if (results[0].length > 1) {
          for (let j = 0; j < results[0].length; j++) {
            if (moment(results[0][j].created) < moment(startTimestamp)) {
              allHeaderArray[i].oldVersion = results[0][j];
              break;
            }
          }
        }
      } else {
        sql = "SELECT * " +
        "FROM History_Headers " +
        "WHERE created BETWEEN ? AND ? " +
        "AND headerId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allHeaderArray[i].headerId]);

        if (results[0].length > 1) {
          allHeaderArray[i].oldVersion = results[0][1];
        }
      }

    }

    finalResults.headers = allHeaderArray;

    // get all cards within the date range
    sql = "SELECT HC.*, Headers.title AS headerName, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
    "FROM History_Cards AS HC " +
    "LEFT JOIN Headers on Headers.headerId = HC.headerId " +
    "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
    "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
    "WHERE HC.created BETWEEN ? AND ? " +
    "ORDER BY HC.created ASC;";
    results = await pool.query(sql, [startTimestamp, endTimestamp]);
    let allCardArray = results[0];

    // if in condense mode, clean up duplicate cards
    if (condense) {
      allCardArray.sort((a, b) => b.created - a.created);
      const idArray = [];
      for (let i = 0; i < allCardArray.length; i++) {
        idArray.push(allCardArray[i].cardId);
      }
      allCardArray = allCardArray.filter((value, index) => idArray.indexOf(value.cardId) === index);
    }

    // get the previous version of each card to use for diffs
    for (let i = 0; i < allCardArray.length; i++) {
      const newTimestamp = moment(allCardArray[i].created).format("YYYY-MM-DD HH:mm:ss");

      if (condense) {
        sql = "SELECT * " +
        "FROM History_Cards " +
        "WHERE created BETWEEN ? AND ? " +
        "AND cardId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allCardArray[i].cardId]);

        if (results[0].length > 1) {
          for (let j = 0; j < results[0].length; j++) {
            if (moment(results[0][j].created) < moment(startTimestamp)) {
              allCardArray[i].oldVersion = results[0][j];
              break;
            }
          }
        }
      } else {
        sql = "SELECT * " +
        "FROM History_Cards " +
        "WHERE created BETWEEN ? AND ? " +
        "AND cardId = ? " +
        "ORDER BY created DESC;";
        results = await pool.query(sql, [oldestTimestamp, newTimestamp, allCardArray[i].cardId]);

        if (results[0].length > 1) {
          allCardArray[i].oldVersion = results[0][1];
        }
      }

      // if we found an old version, find the items for that version
      if (allCardArray[i].oldVersion) {
        sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
        "HI.iconType, typeName, typeKeyword, contentText, " +
        "contentUrl, contentLabel, contentMode, internal, " +
        "created, color " +
        "FROM History_Items AS HI " +
        "LEFT JOIN Icons on HI.iconType = Icons.iconType " +
        "WHERE parentId = ? " +
        "ORDER BY orderIndex ASC, itemId ASC";
        results = await pool.query(sql, allCardArray[i].oldVersion.historyId);
        allCardArray[i].oldVersion.items = results[0];
      }

    }

    finalResults.cards = allCardArray;

    const cardCount = finalResults.cards.length;

    // get all of the items for each card
    for (let i = 0; i < cardCount; i++) {

      const historyId = allCardArray[i].historyId;

      sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
      "HI.iconType, typeName, typeKeyword, contentText, " +
      "contentUrl, contentLabel, contentMode, internal, " +
      "created, color " +
      "FROM History_Items AS HI " +
      "LEFT JOIN Icons on HI.iconType = Icons.iconType " +
      "WHERE parentId = ? " +
      "ORDER BY orderIndex ASC, itemId ASC";
      results = await pool.query(sql, historyId);

      finalResults.cards[i].items = results[0];
    }

    return finalResults;

  } catch (err) {
    console.error("Error generating report");
    throw Error(err);
  }

}
exports.getReport = getReport;