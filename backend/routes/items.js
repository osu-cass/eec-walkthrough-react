// File: items.js
// Description: handles routing for items

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth,
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  postItemVal,
  getItemVal,
  patchItemVal,
  patchItemTimeVal
} = require("../services/validation/requestValidation");
const {
  getItem,
  createItem,
  deleteItem,
  updateItem,
  updateItemTime
} = require("../models/items");


// get information about a single item
app.get("/:itemId", getUserID, getItemVal.validation, async (req, res) => {

  try {

    const itemId = req.params.itemId;
    console.log("Get item", itemId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // check if the current user should be able to view this content
    let viewAll = false;
    if (await roleCheck(2, req.auth.userId)) {
      viewAll = true;
    }

    // get item data
    const results = await getItem(itemId, viewAll);

    if (results.itemId === 0) {
      res.status(404).send({error: "Item not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create an item
app.post("/", requireAuth, postItemVal.validation, async (req, res) => {

  try {

    console.log("Create a new item");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const cardId = req.body.cardId;
    const parentId = req.body.parentId;
    const orderIndex = req.body.orderIndex;
    const iconType = req.body.iconType;
    const contentText = req.body.contentText;
    const contentUrl = req.body.contentUrl;
    const contentLabel = req.body.contentLabel;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create item."});
      return;
    }

    // create an item
    const results = await createItem(cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Parent card does not exists."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Parent item does not exist."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Invalid icon type assigned to item."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete an item
app.delete("/:itemId", requireAuth, getItemVal.validation, async (req, res) => {

  try {

    const itemId = req.params.itemId;
    console.log("Delete item", itemId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete item."});
      return;
    }

    // delete the item data
    const results = await deleteItem(itemId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Item not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update an item
app.patch("/:itemId", requireAuth, patchItemVal.validation, async (req, res) => {

  try {

    console.log("Update an item");

    const itemId = req.params.itemId;
    const cardId = req.body.cardId;
    const parentId = req.body.parentId;
    const orderIndex = req.body.orderIndex;
    const iconType = req.body.iconType;
    const contentText = req.body.contentText;
    const contentUrl = req.body.contentUrl;
    const contentLabel = req.body.contentLabel;
    const approved = req.body.approved;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update item."});
      return;
    }

    // update an item
    const results = await updateItem(itemId, cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel, approved);

    if (results.changedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Item not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Selected parent card does not exist."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Selected parent item does not exist."});
      } else if (results.error === 4) {
        res.status(403).send({error: "Invalid icon type assigned to item."});
      } else if (results.error === 5) {
        res.status(422).send({error: "Request doesn't include any fields to update."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// update an items created timestamp (used to reflect the state of a link item)
app.patch("/:itemId/timeStamp", requireAuth, patchItemTimeVal.validation, async (req, res) => {

  try {

    console.log("Update an items timestamp");

    const itemId = req.params.itemId;
    const deadLink = req.body.deadLink;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update item."});
      return;
    }

    // update an item
    const results = await updateItemTime(itemId, deadLink);

    if (results.message) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Item not found."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


module.exports = app;
