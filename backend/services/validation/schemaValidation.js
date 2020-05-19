// File: schemaValidation.js
// Description: Validates a submitted object against a predefined schema

const {check} = require('express-validator');

// validation checks for post user
const postUser = Object.freeze({
  validation: [
    check('userName').isLength({ min: 1, max: 50 }),
    check('password').isLength({ min: 8, max: 50 }),
    check('firstName').isLength({ min: 1, max: 50 }),
    check('lastName').isLength({ min: 1, max: 50 }),
    check('email').isEmail()
  ]
});
exports.postUser = postUser;


