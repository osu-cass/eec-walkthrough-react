// File: cards.js
// Description: handles routing for cards

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth,
  getUserID
} = require("../services/authentication/cookieAuth");
const {
  postCardVal,
  getCardVal,
  patchCardVal
} = require("../services/validation/requestValidation");
const {
  getCard,
  createCard,
  deleteCard,
  updateCard
} = require("../models/cards");


// get information about a single card
app.get("/:cardId", getUserID, getCardVal.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Get card", cardId);

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

    // get card data
    const results = await getCard(cardId, viewAll);

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
app.post("/", requireAuth, postCardVal.validation, async (req, res) => {

  try {

    console.log("Create a new card");

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    const headerId = req.body.headerId;
    const cardType = req.body.cardType;
    const orderIndex = req.body.orderIndex;
    const title = req.body.title;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create card."});
      return;
    }

    // create a card
    const results = await createCard(headerId, cardType, orderIndex, title, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Card already exists."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Parent header does not exist."});
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
app.delete("/:cardId", requireAuth, getCardVal.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Delete card", cardId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete card."});
      return;
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


// update a card
app.patch("/:cardId", requireAuth, patchCardVal.validation, async (req, res) => {

  try {

    console.log("Update a card");

    const cardId = req.params.cardId;
    const headerId = req.body.headerId;
    const cardType = req.body.cardType;
    const orderIndex = req.body.orderIndex;
    const title = req.body.title;
    const approved = req.body.approved;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to update card."});
      return;
    }

    // update a card
    const results = await updateCard(cardId, headerId, cardType, orderIndex, title, approved);

    if (results.changedRows >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Card not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Selected parent header does not exist."});
      } else if (results.error === 3) {
        res.status(403).send({error: "Selected parent header already has a card with the selected title."});
      } else if (results.error === 4) {
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
