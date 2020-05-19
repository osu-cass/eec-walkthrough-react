// File: cards.js
// Description: handles routing for cards

const express = require('express');
const app = express.Router();
const {
  getCard,
} = require('../models/cards');


// get information about a single card
app.get("/:cardId", async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Get card", cardId);

    // get card data
    const results = await getCard(cardId);

    if (results.cardId === 0) {
      res.status(404).send({error: "Card not found."});
    } else {
      res.status(200).send(results);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// create a card


module.exports = app;
