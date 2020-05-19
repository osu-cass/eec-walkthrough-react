// File: items.js
// Description: handles routing for items

const express = require('express');
const app = express.Router();
const {validationResult} = require('express-validator');
const {postItem} = require('../services/validation/requestValidation');
const {
  getItem,
} = require('../models/items');


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


module.exports = app;
