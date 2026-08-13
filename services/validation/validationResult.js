// File: validationResult.js
// Description: Preserves the API's validation error response format

const {validationResult} = require("express-validator");

function formatValidationError(error) {
  return {
    value: error.value,
    msg: error.msg,
    param: error.path,
    location: error.location
  };
}

exports.validationResult = validationResult.withDefaults({
  formatter: formatValidationError
});
