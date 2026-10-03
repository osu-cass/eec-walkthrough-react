const express = require("express");
const app = express.Router();

const {validationResult} = require("../services/validation/validationResult");
const {
  requireAuth,
  getUserID,
  roleCheck,
  internalCheck
} = require("../services/authentication/cookieAuth");
const {
  postTrainingPageVal,
  patchTrainingPageVal,
  deleteTrainingPageVal
} = require("../services/validation/requestValidation");
const {
  createTrainingPage,
  updateTrainingPage,
  getTrainingPagesFromSourcePage,
  getTrainingPage,
  deleteTrainingPage
} = require("../models/trainingPages");

// keep only the fields the model writes, so unexpected body fields are dropped
function normalizedTrainingPage(req) {
  return {
    itemList: req.body.itemList.map(item => ({
      id: item.id,
      annotation: item.annotation
    })),
    name: req.body.name,
    // description is optional; mysql2 rejects undefined bind parameters
    description: req.body.description === undefined ? null : req.body.description,
    viewers: req.body.viewers,
    sourcePageId: req.body.sourcePageId,
    category: req.body.category
  };
}

// respond with 422 and report if the request failed validation
function invalidRequest(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    res.status(422).json({errors: errors.array()});
    return true;
  }
  return false;
}

// translate database errors from a create or update into a client response
function writeError(err, res, action) {
  if (err && err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: action === "update"
        ? "Another training page with this name already exists. Pick a " +
          "different name."
        : "A training page with this name already exists. Use the edit " +
          "button on that training page to update it, or pick a different name."
    });
  }
  if (err && (err.code === "ER_NO_REFERENCED_ROW" || err.code === "ER_NO_REFERENCED_ROW_2")) {
    return res.status(400).json({
      error: "Unknown source page, category, or training item."
    });
  }
  console.error(err);
  return res.status(500).json({
    error: "An internal server error occurred. Please try again later."
  });
}

app.post("/", requireAuth, postTrainingPageVal.validation, async (req, res) => {
  try {
    if (invalidRequest(req, res)) {
      return;
    }
    if (!await roleCheck(3, req.auth.userId)) {
      return res.status(401).json({
        error: "Unauthorized user attempting to create training page."
      });
    }

    const page = normalizedTrainingPage(req);
    if (page.viewers === "internal" && !await internalCheck(req.auth.userId)) {
      return res.status(403).json({
        error: "This user is not allowed to create internal training pages."
      });
    }

    const response = await createTrainingPage(
      page.itemList,
      page.name,
      page.description,
      page.viewers,
      page.sourcePageId,
      page.category
    );

    res.status(201).json({
      id: response.id,
      message: "OK"
    });
  } catch (err) {
    writeError(err, res);
  }
});

app.get("/:pageId", getUserID, async (req, res) => {
  try {
    const response = await getTrainingPage(req.params.pageId);
    if (response.error) {
      return res.status(400).json(response);
    }
    if (response.viewers === "internal" && !await internalCheck(req.auth.userId)) {
      return res.status(403).json({
        error: "This training page is only available to internal users."
      });
    }
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later."
    });
  }
});

app.get("/source-page/:sourcePageId", getUserID, async (req, res) => {
  try {
    let response = await getTrainingPagesFromSourcePage(
      req.params.sourcePageId
    );
    if (!await internalCheck(req.auth.userId)) {
      response = response.filter(page => page.viewers !== "internal");
    }
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      message: "invalid request"
    });
  }
});

app.patch("/:pageId", requireAuth, patchTrainingPageVal.validation, async (req, res) => {
  try {
    if (invalidRequest(req, res)) {
      return;
    }
    // editing an existing training page is admin-only, so an external editor
    // cannot flip an internal page to everyone; no internalCheck is needed
    if (!await roleCheck(5, req.auth.userId)) {
      return res.status(401).json({
        error: "Unauthorized user attempting to update training page."
      });
    }

    const page = normalizedTrainingPage(req);
    const response = await updateTrainingPage(
      req.params.pageId,
      page.itemList,
      page.name,
      page.description,
      page.viewers,
      page.sourcePageId,
      page.category
    );

    if (!response) {
      return res.status(404).json({error: "Training page not found."});
    }

    res.status(200).json({
      id: response.id,
      message: "OK"
    });
  } catch (err) {
    writeError(err, res, "update");
  }
});

app.delete("/:pageId", requireAuth, deleteTrainingPageVal.validation, async (req, res) => {
  try {
    if (invalidRequest(req, res)) {
      return;
    }
    if (!await roleCheck(5, req.auth.userId)) {
      return res.status(401).json({
        error: "Unauthorized user attempting to delete training page."
      });
    }
    const results = await deleteTrainingPage(req.params.pageId);
    if (!results.affectedRows) {
      return res.status(404).json({error: "Training page not found."});
    }

    res.status(201).json({
      message: "OK"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An internal server error occurred. Please try again later."
    });
  }
});

module.exports = app;
