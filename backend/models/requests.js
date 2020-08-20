// File: requests.js
// Description: Provides functions for working with requests

const {pool} = require("../services/database/mysqlPool");


// return a list of all requests
async function getRequests() {

  try {

    // get all external published links
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE status = 1 " +
    "ORDER BY created ASC;";

    const results = await pool.query(sql, []);

    const finalResults = {
      requests: results[0]
    };

    return finalResults;

  } catch (err) {
    console.error("Error searching for requests");
    throw Error(err);
  }

}
exports.getRequests = getRequests;


// return all data for a single request
async function getRequest(requestId) {

  try {

    // get the specified request
    let sql = "SELECT Requests.*, username " +
    "FROM Requests " +
    "LEFT JOIN Users on Requests.userId = Users.userId " +
    "WHERE requestId = ? " +
    "ORDER BY created ASC;";

    let results = await pool.query(sql, requestId);
    const finalResults = results[0][0];

    // check to see if we were able to find the request
    if (!results[0].length) {
      return {requestId: 0};
    }

    // get all object for the request
    sql = "SELECT * " +
    "FROM Request_Objects " +
    "WHERE requestId = ? " +
    "ORDER BY requestObjectId ASC;";
    results = await pool.query(sql, requestId);
    const objects = results[0];
    const fullObjects = [];

    for (let i = 0; i < objects.length; i++) {

      // get a page object
      if (objects[i].objectType === 1) {
        sql = "SELECT Pages.*, pluralName AS categoryName " +
        "FROM Pages " +
        "LEFT JOIN Categories on pageType = categoryId " +
        "WHERE approved = 0 " +
        "AND pageId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT tempPageId AS pageId, tempPageType AS pageType, tempName AS name, " +
          "tempTitle AS title, tempDescription AS description, tempImageUrl AS imageUrl, " +
          "tempInternal AS internal, tempUserId AS userId, tempCreated AS created, " +
          "pluralName AS categoryName " +
          "FROM Temp_Pages " +
          "LEFT JOIN Categories on tempPageType = categoryId " +
          "WHERE tempPageId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const page = results[0][0];
            page.objectType = 1;

            sql = "SELECT Pages.*, pluralName AS categoryName " +
            "FROM Pages " +
            "LEFT JOIN Categories on pageType = categoryId " +
            "WHERE approved = 1 " +
            "AND pageId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              page.oldVersion = results[0][0];
            }

            fullObjects.push(page);
          }

        } else {
          // save the object
          results[0][0].objectType = 1;
          fullObjects.push(results[0][0]);
        }
        continue;
      }

      // get a header object
      if (objects[i].objectType === 2) {
        sql = "SELECT Headers.*, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
        "FROM Headers " +
        "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
        "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
        "WHERE Headers.approved = 0 " +
        "AND headerId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {
          sql = "SELECT tempHeaderId AS headerId, tempTitle AS title, tempInternal AS internal, " +
          "tempOrderIndex AS orderIndex, tempUserId AS userId, tempCreated AS created, " +
          "Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
          "FROM Temp_Headers " +
          "LEFT JOIN Headers on Headers.headerId = Temp_Headers.tempHeaderId " +
          "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
          "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
          "WHERE tempHeaderId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // save the object and see if there is an old version
          if (results[0].length) {
            const header = results[0][0];
            header.objectType = 2;

            sql = "SELECT Headers.*, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
            "FROM Headers " +
            "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
            "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
            "WHERE Headers.approved = 1 " +
            "AND headerId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              header.oldVersion = results[0][0];
            }

            fullObjects.push(header);
          }

        } else {
          // save the object
          results[0][0].objectType = 2;
          fullObjects.push(results[0][0]);
        }
        continue;
      }

      // get a card object
      if (objects[i].objectType === 3) {
        sql = "SELECT Cards.*, Headers.title AS headerName, Pages.pageId, " +
        "Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
        "FROM Cards " +
        "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
        "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
        "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
        "WHERE Cards.approved = 0 " +
        "AND cardId = ?;";
        results = await pool.query(sql, objects[i].objectId);

        if (!results[0].length) {

          sql = "SELECT tempCardId AS cardId, tempCardType AS cardType, tempTitle AS title, " +
          "tempOrderIndex AS orderIndex, tempUserId AS userId, tempCreated AS created, " +
          "Headers.title AS headerName, Pages.pageId, Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
          "FROM Temp_Cards " +
          "LEFT JOIN Cards on Cards.cardId = Temp_Cards.tempCardId " +
          "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
          "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
          "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
          "WHERE tempCardId = ?;";
          results = await pool.query(sql, objects[i].objectId);

          // get the items, see if there is an old version, and save the object
          if (results[0].length) {

            const card = results[0][0];
            card.objectType = 3;

            // get all of the items
            sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
            "Items.iconType, typeName, typeKeyword, contentText, " +
            "contentUrl, contentLabel, contentMode, internal, " +
            "created, approved, color " +
            "FROM Items " +
            "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
            "WHERE cardId = ? " +
            "AND approved = 0 " +
            "ORDER BY orderIndex ASC, itemId ASC";
            results = await pool.query(sql, objects[i].objectId);
            
            if (results[0].length) {
              card.items = results[0];
            }

            // see if there is an old version
            sql = "SELECT Cards.*, Headers.title AS headerName, Pages.pageId, " +
            "Pages.name AS pageName, Pages.pageType, Categories.pluralName AS categoryName " +
            "FROM Cards " +
            "LEFT JOIN Headers on Headers.headerId = Cards.headerId " +
            "LEFT JOIN Pages on Pages.pageId = Headers.pageId " +
            "LEFT JOIN Categories on Pages.pageType = Categories.categoryId " +
            "WHERE Cards.approved = 1 " +
            "AND cardId = ?;";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              card.oldVersion = results[0][0];

              // get all of the old version items
              sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
              "Items.iconType, typeName, typeKeyword, contentText, " +
              "contentUrl, contentLabel, contentMode, internal, " +
              "created, approved, color " +
              "FROM Items " +
              "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
              "WHERE cardId = ? " +
              "AND approved = 1 " +
              "ORDER BY orderIndex ASC, itemId ASC";
              results = await pool.query(sql, objects[i].objectId);

              if (results[0].length) {
                card.oldVersion.items = results[0];
              }
            }

            fullObjects.push(card);
          }

        } else {

          // get the items and save the object
          if (results[0].length) {

            const card = results[0][0];
            card.objectType = 3;

            // get all of the items
            sql = "SELECT DISTINCT itemId, cardId, indentation, orderIndex, " +
            "Items.iconType, typeName, typeKeyword, contentText, " +
            "contentUrl, contentLabel, contentMode, internal, " +
            "created, approved, color " +
            "FROM Items " +
            "LEFT JOIN Icons on Items.iconType = Icons.iconType " +
            "WHERE cardId = ? " +
            "AND approved = 0 " +
            "ORDER BY orderIndex ASC, itemId ASC";
            results = await pool.query(sql, objects[i].objectId);

            if (results[0].length) {
              card.items = results[0];
              fullObjects.push(card);
            }
          }

        }
      }

    }

    finalResults.objects = fullObjects;

    return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getRequest = getRequest;


// return all data for a group of selected objects (pages, headers, cards)
async function getSelection(objects) {

  try {

    const newObjects = [];

    for (let i = 0; i < objects.length; i++) {

      const object = {};

      // if we are looking at a page...
      if (objects[i].objectType === 1) {
        object.objectType = "Page";
        object.key = objects[i].objectId + "P";

        // get the objects name
        let sql = "SELECT name " +
        "FROM Pages " +
        "WHERE pageId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          let sql = "SELECT tempName AS name " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          let results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
        continue;
      }

      // if we are looking at a header...
      if (objects[i].objectType === 2) {
        object.objectType = "Header";
        object.key = objects[i].objectId + "H";

        // get the objects name
        let sql = "SELECT title AS name " +
        "FROM Headers " +
        "WHERE headerId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          let sql = "SELECT tempTitle AS name " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          let results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
        continue;
      }

      // If we are looking at a card...
      if (objects[i].objectType === 3) {
        object.objectType = "Card";
        object.key = objects[i].objectId + "C";

        // get the objects name
        let sql = "SELECT title AS name " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, objects[i].objectId);

        // Check to see if we were able to find the object.
        // If we were, then we add it to the array.
        // If we were not able to find it, then search in the temp objects.
        if (!results[0].length) {

          let sql = "SELECT tempTitle AS name " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          let results = await pool.query(sql, objects[i].objectId);

          if (results[0].length) {
            object.objectName = results[0][0].name;
            newObjects.push(object);
          }

        } else {
          object.objectName = results[0][0].name;
          newObjects.push(object);
        }
      }

    }

      const finalResults = {
        objects: newObjects
      };

      return finalResults;

  } catch (err) {
    console.error("Error searching for request");
    throw Error(err);
  }

}
exports.getSelection = getSelection;


// create a request
async function createRequest(title, description, objects, user) {

  try {

    const idArray = [];
    let filteredObjects = [];
    let finalObjects = [];

    // make sure all objects in the array are valid
    for (let i = 0; i < objects.length; i++) {
      if ((objects[i].objectType !== 1 && objects[i].objectType !== 2 && 
          objects[i].objectType !== 3) || !Number.isInteger(parseInt(objects[i].objectId, 10))) {
        return {error: 1};
      } else {
        const object = {
          objectType: objects[i].objectType,
          objectId: Math.abs(parseInt(objects[i].objectId, 10))
        }
        filteredObjects.push(object);
      }
    }

    // filter out duplicate objects
    for (let i = 0; i < filteredObjects.length; i++) {
      idArray.push(filteredObjects[i].objectType + "_" + filteredObjects[i].objectId);
    }
    filteredObjects = filteredObjects.filter((value, index) => idArray.indexOf(value.objectType + "_" + value.objectId) === index);

    // check the objects against the database to ensure that they are valid
    for (let i = 0; i < filteredObjects.length; i++) {

      // if we are looking at a page...
      if (filteredObjects[i].objectType === 1) {

        // see if the object exists
        let sql = "SELECT * " +
        "FROM Pages " +
        "WHERE pageId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          let sql = "SELECT * " +
          "FROM Temp_Pages " +
          "WHERE tempPageId = ?;";
          let results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

      // if we are looking at a header...
      if (filteredObjects[i].objectType === 2) {

        // see if the object exists
        let sql = "SELECT * " +
        "FROM Headers " +
        "WHERE headerId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          let sql = "SELECT * " +
          "FROM Temp_Headers " +
          "WHERE tempHeaderId = ?;";
          let results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

      // if we are looking at a card...
      if (filteredObjects[i].objectType === 3) {

        // see if the object exists
        let sql = "SELECT * " +
        "FROM Cards " +
        "WHERE cardId = ? " +
        "AND approved = 0;";
        let results = await pool.query(sql, filteredObjects[i].objectId);

        if (!results[0].length) {

          let sql = "SELECT * " +
          "FROM Temp_Cards " +
          "WHERE tempCardId = ?;";
          let results = await pool.query(sql, filteredObjects[i].objectId);

          if (results[0].length) {
            finalObjects.push(filteredObjects[i]);
          }

        } else {
          finalObjects.push(filteredObjects[i]);
        }
        continue;
      }

    }

    // we must have at least one valid object to continue
    if (!finalObjects.length) {
      return {error: 1};
    }

    // create the new request
    let sql = "INSERT INTO Requests (title, description, status, userId) " +
    "VALUES (?, ?, 1, ?);";
    let results = await pool.query(sql, [title, description, user]);

    const insertId = results[0].insertId;

    // add all of the objects to the new request
    for (let i = 0; i < finalObjects.length; i++) {
      sql = "INSERT INTO Request_Objects (requestId, objectId, objectType) " +
      "VALUES (?, ?, ?);";
      results = await pool.query(sql, [insertId, finalObjects[i].objectId, finalObjects[i].objectType]);
    }

    const finalResults = {
      insertId: insertId
    };

    return finalResults;

  } catch (err) {
    console.error("Error creating request");
    throw Error(err);
  }

}
exports.createRequest = createRequest;