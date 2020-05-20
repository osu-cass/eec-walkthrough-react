// File: items.js
// Description: handles routing for items

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {postItem} = require("../services/validation/requestValidation");
const {
  getItem,
  createItem
} = require("../models/items");


// get information about a single item
app.get("/:itemId", async (req, res) => {

  try {

    const itemId = req.params.itemId;
    console.log("Get item", itemId);

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
app.post("/", postItem.validation, async (req, res) => {

  try {

    // confirm that the request body has a valid item
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const cardId = req.body.cardId;
    const parentId = req.body.parentId;
    const iconType = req.body.iconType;
    const contentText = req.body.contentText;
    const contentUrl = req.body.contentUrl;
    const contentLabel = req.body.contentLabel;
    const userId = req.body.userId;
    console.log("Create a new item");

    // create an item
    const results = await createItem(cardId, parentId, iconType, contentText, contentUrl, contentLabel, userId);

    if (results.insertId) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Unauthorized user attempting to create item."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Invalid parent card."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Invalid parent item."});
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
