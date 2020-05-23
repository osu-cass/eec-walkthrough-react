// File: items.js
// Description: handles routing for items

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  postItemVal,
  getItemVal,
  patchItemVal
} = require("../services/validation/requestValidation");
const {
  getItem,
  createItem,
  deleteItem,
  updateItem
} = require("../models/items");


// get information about a single item
app.get("/:itemId", getItemVal.validation, async (req, res) => {

  try {

    const itemId = req.params.itemId;
    console.log("Get item", itemId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // get item data
    const results = await getItem(itemId);

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
app.post("/", postItemVal.validation, async (req, res) => {

  try {

    console.log("Create a new item");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const cardId = req.body.cardId;
    const parentId = req.body.parentId;
    const orderIndex = req.body.orderIndex;
    const iconType = req.body.iconType;
    const contentText = req.body.contentText;
    const contentUrl = req.body.contentUrl;
    const contentLabel = req.body.contentLabel;
    const userId = req.body.userId;

    // create an item
    const results = await createItem(cardId, parentId, orderIndex, iconType, contentText, contentUrl, contentLabel, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Unauthorized user attempting to create item."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Parent card does not exists."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Parent item does not exist."});
      } else if (results.error === 4) {
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
app.delete("/:itemId", getItemVal.validation, async (req, res) => {

  try {

    const itemId = req.params.itemId;
    console.log("Delete item", itemId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
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
app.patch("/:itemId", patchItemVal.validation, async (req, res) => {

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
      return res.status(422).json({errors: errors.array()});
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


module.exports = app;
