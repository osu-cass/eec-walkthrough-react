// File: files.js
// Description: handles routing files

const multer = require("multer");
const upload = multer({dest: "uploads/"});
const express = require("express");
const crypto = require("crypto");
const app = express();
const {
  requireAuth,
  roleCheck
} = require("../services/authentication/cookieAuth");
const {
  uploadFile
} = require("../models/files");

app.post('/single', upload.single("image"), (req, res) => {
  console.log(req.file)
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

// file handling middleware
/*
const upload = multer({
  storage: multer.diskStorage({
    destination: "$(__dirname}/uploads",
    filename: (req, file, callback) => {
      // store image files with the correct extension.
      const basename = crypto.pseudoRandomBytes(16).toString("hex");
      const extension = imageTypes[file.mimetype];
      callback(null, `${basename}.${extension}`);
    }
  }),
  // rejects non jpg or png files
  fileFilter: (req, file, callback) => {
    callback(null, !!imageTypes[file.mimetype]);
  }
});
*/

// upload a new file
// app.post("/upload", requireAuth, async (req, res) => {





/*
app.post("/upload", async (req, res) => {
  console.log("UPLOAD")
  const imageTypes = {
    "image/jpeg": "jpg",
    "image/png": "png"
  };

  var storage = multer.diskStorage({
    destination: `${__dirname}/../uploads`,
    filename: (req, file, callback) => {
      // store image files with the correct extension.
      const basename = crypto.pseudoRandomBytes(16).toString("hex");
      const extension = imageTypes[file.mimetype];
      callback(null, `${basename}.${extension}`);
    }
  });
  var upload = multer({ storage : storage}).any();

  console.log("getFileName", storage.getFileName)

  upload(req,res,function(err) {
      if(err) {
        console.log(err);
        console.log("Error uploading file.")
        res.status(500).send({error: "An internal server error occurred. Please try again later."});
      } else {
        console.log("File has been uploaded.")
        res.status(200).send({url: "File uploaded"});
      }
  });
*/




  /*
  console.log(req.body)
  if (!req.file) {
    console.log("No file received")
    res.status(500).send({error: "An internal server error occurred. Please try again later."})
  } else {
    res.status(200).send({url: "this url"});
  }*/

  /*
  try {

    const files = req.files;
    console.log(files)
    console.log("Upload a new file");

    // make sure the user is allowed to perform this action
    if (!await roleCheck(3, req.auth.userId)) {
      res.status(401).send({error: "Unauthorized user attempting to upload a file."});
      return;
    }

    // upload a new file
    const results = await uploadFile(files);

    if (results.url) {
      res.status(201).send(results);
    } else {
      res.status(500).send({error: "An internal server error occurred. Please try again later."});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({error: "An internal server error occurred. Please try again later."});
  }
  });
*/


module.exports = app;
