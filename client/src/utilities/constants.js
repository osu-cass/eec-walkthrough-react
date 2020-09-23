// File: constants.js
// Description: constants that need to be easily referenced

// set the default API address
let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "/api";
} else {
  API_URL = `${process.env.REACT_APP_API_HOST}/api`;
}

// generic constants
module.exports = Object.freeze({
  API_URL: API_URL,
  UPLOAD_TERMS: "Before uploading any images you must agree that " +
  "you will only upload images that you have intellectual property rights to use. " +
  "You must also agree to only upload images that are suitable for the general public to view."
});