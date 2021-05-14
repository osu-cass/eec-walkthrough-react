const express = require("express");
const app = express.Router();

const {
  createTrainingPage,
  getTrainingPagesFromSourcePage,
  getTrainingPage,
  deleteTrainingPage
} = require("../models/trainingPages");

app.post("/", async (req, res) => {
  // create new entry in TrainingPages in database

  const itemList = req.body.itemList;
  const name = req.body.name;
  const description = req.body.description;
  const sourcePageId = req.body.sourcePageId;
  const category = req.body.category;
  // validate ids and name
  const response = await createTrainingPage(
    itemList,
    name,
    description,
    sourcePageId,
    category
  );

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

app.get("/source-page/:sourcePageId", async (req, res) => {
  try {
    const response = await getTrainingPagesFromSourcePage(
      req.params.sourcePageId
    );
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      message: "invalid request"
    });
  }
});

app.delete("/:pageId", async (req, res) => {
  try {

    await deleteTrainingPage(req.params.pageId);
    res.status(201).json({
      message: "OK"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "invalid request"
    });
  }

});

module.exports = app;
