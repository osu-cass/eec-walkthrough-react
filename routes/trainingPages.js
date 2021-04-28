const express = require("express");
const app = express.Router();

const {createTrainingPage} = require("../models/trainingPages");

app.post("/", async (req, res) => {
  // create new entry in TrainingPages in database

  const itemList = req.body.itemList;
  const name = req.body.name;
  // validate ids and name

  const response = await createTrainingPage(itemList, name);

  // if there's an error, then there's an error code
  if (response.error) {
    res.status(400).json(response);
  } else {
    console.log(response);
    // if no error, response 201
    res.status(201).json({
      id: response.insertId,
      message: "OK"
    });
  }
});

module.exports = app;