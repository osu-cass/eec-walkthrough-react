// File: items.js
// Description: handles routing for items

const express = require("express");
const app = express.Router();
const {validationResult} = require("express-validator");
const {
  roleCheck,
  requireAuth,
} = require("../services/authentication/cookieAuth");
const {
  patchItemTimeVal
} = require("../services/validation/requestValidation");
const {
  updateItemTime
} = require("../models/items");


// update an items created timestamp (used to reflect the state of a link item)
app.patch("/:itemId/timestamp", requireAuth, patchItemTimeVal.validation, async (req, res) => {

  try {

    console.log("Update an item's timestamp");

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

    if (typeof results.timestamp !== "undefined") {
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
