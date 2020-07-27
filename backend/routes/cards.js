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
  patchCardVal,
  patchCardMove
} = require("../services/validation/requestValidation");
const {
  createCard,
  deleteCard,
  deleteCardChanges,
  updateCard,
  publishCard,
  unpublishCard,
  moveCard,
  moveTempCard
} = require("../models/cards");


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
    const title = req.body.title.trim();
    const items = req.body.items;
    const userId = req.auth.userId;

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to create card."});
      return;
    }

    // create a card
    const results = await createCard(headerId, cardType, title, items, userId);

    if (results.insertId) {
      res.status(201).send(results);
    } else {

      if (results.error === 1) {
        res.status(403).send({error: "Card already exists."});
      } else if (results.error === 2) {
        res.status(403).send({error: "Parent header does not exist."});
      } else if (results.error === 3) {
        res.status(404).send({error: "Invalid item type in card."});
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
    if (!await roleCheck(4, req.auth.userId)) {
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


// delete a card edit
app.delete("/:cardId/changes", requireAuth, getCardVal.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    console.log("Delete card changes", cardId);

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to delete a cards changes."});
      return;
    }

    // delete the card data
    const results = await deleteCardChanges(cardId);

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
    const cardType = req.body.cardType;
    const title = req.body.title.trim();
    const items = req.body.items;
    const userId = req.auth.userId;

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
    const results = await updateCard(cardId, cardType, title, items, userId);

    if (results.cardId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Card not found."});
      } else if (results.error === 2) {
        res.status(404).send({error: "Invalid item type in card."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// publish a card
app.post("/:cardId/publish", getUserID, getCardVal.validation, async (req, res) => {

  try {

    console.log("Publish a card");

    const cardId = req.params.cardId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to publish a card."});
      return;
    }

    // publish a card
    const results = await publishCard(cardId);

    if (results.cardId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Card not found."});
      } else if (results.error === 2) {
        res.status(403).send({error: "A card with this name already exists under this header."});
      } else {
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      }

    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }

});


// unpublish a card
app.post("/:cardId/unpublish", getUserID, getCardVal.validation, async (req, res) => {

  try {

    console.log("Unpublish a card");

    const cardId = req.params.cardId;

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (!await roleCheck(4, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to unpublish a card."});
      return;
    }

    // unpublish a card
    const results = await unpublishCard(cardId);

    if (results.cardId >= 0) {
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


// move a card relative to other cards
app.patch("/:cardId/move/:direction/:mode", requireAuth, patchCardMove.validation, async (req, res) => {

  try {

    const cardId = req.params.cardId;
    const direction = req.params.direction;
    const mode = req.params.mode;

    if (parseInt(direction, 10)) {
      console.log("Move card", cardId, "up");
    } else {
      console.log("Move card", cardId, "down");
    }

    // confirm that the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(422).json({errors: errors.array()});
    }

    // make sure the user is allowed to perform this action
    if (parseInt(mode, 10)) {
      if (!await roleCheck(4, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move card."});
        return;
      }
    } else {
      if (!await roleCheck(3, req.auth.userId)) {
        res.status(401).send({error: "Unauthorized user attempting to move card."});
        return;
      }
    }

    // update a card
    let results;
    if (parseInt(mode, 10)) {
      results = await moveCard(cardId, parseInt(direction, 10));
    } else {
      results = await moveTempCard(cardId, parseInt(direction, 10));
    }

    if (results.cardId >= 0) {
      res.status(200).send(results);
    } else {

      if (results.error === 1) {
        res.status(404).send({error: "Card not found."});
      } else if (results.error === 2) {
        if (parseInt(direction, 10)) {
          res.status(403).send({error: "No card exists above this card"});
        } else {
          res.status(403).send({error: "No card exists below this card"});
        }
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
