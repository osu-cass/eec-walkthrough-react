// File: requestValidation.js
// Description: Handles validation for request bodies

const {check} = require("express-validator");

// validation checks for get user
const getUserVal = Object.freeze({
  validation: [
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.getUserVal = getUserVal;

// validation checks for login user
const loginUserVal = Object.freeze({
  validation: [
    check("userName").isLength({min: 1, max: 50}),
    check("password").isLength({min: 8, max: 50})
  ]
});
exports.loginUserVal = loginUserVal;

// validation checks for post user
const postUserVal = Object.freeze({
  validation: [
    check("userName").isLength({min: 1, max: 50}),
    check("password").isLength({min: 8, max: 50}),
    check("firstName").isLength({min: 1, max: 50}),
    check("lastName").isLength({min: 1, max: 50}),
    check("email").isEmail()
  ]
});
exports.postUserVal = postUserVal;

// validation checks for patch user
const patchUserVal = Object.freeze({
  validation: [
    check("userId").isInt({min: 1, max: 4294967295}),
    check("userName").isLength({min: 1, max: 50}),
    check("password").isLength({min: 8, max: 50}),
    check("firstName").isLength({min: 1, max: 50}),
    check("lastName").isLength({min: 1, max: 50}),
    check("email").isEmail(),
    check("role").isInt({min: 1, max: 4})
  ]
});
exports.patchUserVal = patchUserVal;

// validation checks for get page
const getPageVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getPageVal = getPageVal;

// validation checks for post page
const postPageVal = Object.freeze({
  validation: [
    check("pageType").isInt({min: 0, max: 1}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 1000}),
    check("imageUrl").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postPageVal = postPageVal;

// validation checks for patch page
const patchPageVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("pageType").isInt({min: 0, max: 1}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 1000}),
    check("imageUrl").isLength({min: 1, max: 1000}),
    check("approved").isInt({min: 0, max: 1})
  ]
});
exports.patchPageVal = patchPageVal;

// validation checks for get header
const getHeaderVal = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getHeaderVal = getHeaderVal;

// validation checks for post header
const postHeaderVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postHeaderVal = postHeaderVal;

// validation checks for patch header
const patchHeaderVal = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("approved").isInt({min: 0, max: 1})
  ]
});
exports.patchHeaderVal = patchHeaderVal;

// validation checks for get card
const getCardVal = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getCardVal = getCardVal;

// validation checks for post card
const postCardVal = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postCardVal = postCardVal;

// validation checks for patch card
const patchCardVal = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("approved").isInt({min: 0, max: 1})
  ]
});
exports.patchCardVal = patchCardVal;

// validation checks for get item
const getItemVal = Object.freeze({
  validation: [
    check("itemId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getItemVal = getItemVal;

// validation checks for post item
const postItemVal = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("parentId").optional({nullable: true})
      .isInt({min: 1, max: 4294967295}),
    check("iconType").isInt({min: 1, max: 65535}),
    check("contentText").isLength({min: 0, max: 1000}),
    check("contentUrl").isLength({min: 0, max: 1000}),
    check("contentLabel").isLength({min: 0, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postItemVal = postItemVal;

// validation checks for patch item
const patchItemVal = Object.freeze({
  validation: [
    check("itemId").optional()
      .isInt({min: 1, max: 4294967295}),
    check("cardId").optional()
      .isInt({min: 1, max: 4294967295}),
    check("parentId").optional({nullable: true})
      .isInt({min: 0, max: 4294967295}),
    check("iconType").optional()
      .isInt({min: 1, max: 65535}),
    check("contentText").optional()
      .isLength({min: 0, max: 1000}),
    check("contentUrl").optional()
      .isLength({min: 0, max: 1000}),
    check("contentLabel").optional()
      .isLength({min: 0, max: 1000}),
    check("approved").optional()
      .isInt({min: 0, max: 1})
  ]
});
exports.patchItemVal = patchItemVal;