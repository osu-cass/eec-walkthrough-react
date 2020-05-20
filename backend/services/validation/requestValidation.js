// File: requestValidation.js
// Description: Handles validation for request bodies

const {check} = require("express-validator");

// validation checks for post user
const postUser = Object.freeze({
  validation: [
    check("userName").isLength({min: 1, max: 50}),
    check("password").isLength({min: 8, max: 50}),
    check("firstName").isLength({min: 1, max: 50}),
    check("lastName").isLength({min: 1, max: 50}),
    check("email").isEmail()
  ]
});
exports.postUser = postUser;

// validation checks for post page
const postPage = Object.freeze({
  validation: [
    check("pageType").isInt({min: 0, max: 1}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 1000}),
    check("imageUrl").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postPage = postPage;

// validation checks for post header
const postHeader = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postHeader = postHeader;

// validation checks for post card
const postCard = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postCard = postCard;

// validation checks for post item
const postItem = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("parentId").isInt({min: 0, max: 4294967295}),
    check("iconType").isInt({min: 1, max: 65535}),
    check("contentText").isLength({min: 0, max: 1000}),
    check("contentUrl").isLength({min: 0, max: 1000}),
    check("contentLabel").isLength({min: 0, max: 1000}),
    check("userId").isInt({min: 1, max: 4294967295})
  ]
});
exports.postItem = postItem;

