const express = require("express");
const app = express.Router();

const {createTrainingPage} = require("../models/trainingPages");
const {getTrainingPage} = require("../models/trainingPages");

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


app.get("/:pageId", async (req, res) => {
  const response = await getTrainingPage(req.params.pageId);
  // console.log("route, res: ", response);
  if (response.error) {
    res.status(400).json(response);
  } else {
    res.status(200).json(response);
  }
});

module.exports = app;