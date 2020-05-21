// File: cards.js
// Description: handles routing for cards

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  postCardVal,
  getCardVal
} = require("../services/validation/requestValidation");
const {
  getCard,
  createCard,
  deleteCard
} = require("../models/cards");


// get information about a single card
app.get("/:cardId", getCardVal.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Get card", cardId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

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
app.post("/", postCardVal.validation, async (req, res) => {

  try {

    console.log("Create a new card");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const headerId = req.body.headerId;
    const title = req.body.title;
    const userId = req.body.userId;

    // create a card
    const results = await createCard(headerId, title, userId);

    if (results.insertId) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Unauthorized user attempting to create card."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Card already exists."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Invalid parent header."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// delete a card
app.delete("/:cardId", getCardVal.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Delete card", cardId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // delete the card data
    const results = await deleteCard(cardId);

    if (results.affectedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Card not found."});
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
