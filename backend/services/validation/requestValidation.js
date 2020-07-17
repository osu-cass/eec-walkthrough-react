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
    check("username").isLength({min: 5, max: 50}),
    check("password").isLength({min: 8, max: 50})
  ]
});
exports.loginUserVal = loginUserVal;

// validation checks for post user
const postUserVal = Object.freeze({
  validation: [
    check("username").isLength({min: 5, max: 50}),
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
    check("username").optional()
      .isLength({min: 5, max: 50}),
    check("oldPassword").optional()
      .isLength({min: 8, max: 50}),
    check("newPassword").optional()
      .isLength({min: 8, max: 50}),
    check("firstName").optional()
      .isLength({min: 1, max: 50}),
    check("lastName").optional()
      .isLength({min: 1, max: 50}),
    check("email").optional()
      .isEmail(),
    check("role").optional()
      .isInt({min: 1, max: 4})
  ]
});
exports.patchUserVal = patchUserVal;

// validation checks for search user
const searchUserVal = Object.freeze({
  validation: [
    check("text").isLength({min: 0, max: 1000}),
    check("role").isInt({min: 0, max: 4}),
    check("sort").isInt({min: 0, max: 10}),
    check("order").isInt({min: 0, max: 1}),
    check("cursorPrimary").isLength({min: 1, max: 1000}),
    check("cursorSecondary").isLength({min: 1, max: 1000})
  ]
});
exports.searchUserVal = searchUserVal;

// validation checks for get page
const getPageVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getPageVal = getPageVal;

// validation checks for search user
const searchPageVal = Object.freeze({
  validation: [
    check("text").isLength({min: 0, max: 1000}),
    check("cursorPrimary").isLength({min: 1, max: 1000}),
    check("cursorSecondary").isLength({min: 1, max: 1000})
  ]
});
exports.searchPageVal = searchPageVal;

// validation checks for post page
const postPageVal = Object.freeze({
  validation: [
    check("pageType").isInt({min: 1, max: 5}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 5000}),
    check("imageUrl").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
  ]
});
exports.postPageVal = postPageVal;

// validation checks for patch page
const patchPageVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("pageType").isInt({min: 1, max: 5}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 5000}),
    check("imageUrl").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
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

// validation checks for move header
const patchHeaderMove = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("direction").isInt({min: 0, max: 1}),
  ]
});
exports.patchHeaderMove = patchHeaderMove;

// validation checks for post header
const postHeaderVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
  ]
});
exports.postHeaderVal = postHeaderVal;

// validation checks for patch header
const patchHeaderVal = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("title").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
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

// validation checks for move card
const patchCardMove = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("direction").isInt({min: 0, max: 1}),
  ]
});
exports.patchCardMove = patchCardMove;

// validation checks for post card
const postCardVal = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("cardType").isInt({min: 0, max: 65535}),
    check("title").isLength({min: 1, max: 1000}),
    check("items").isArray({min: 1})
  ]
});
exports.postCardVal = postCardVal;

// validation checks for patch card
const patchCardVal = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("cardType").isInt({min: 0, max: 65535}),
    check("title").isLength({min: 1, max: 1000}),
    check("items").optional()
      .isArray({min: 1})
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
    check("indentation").isInt({min: 0, max: 4}),
    check("iconType").isInt({min: 1, max: 65535}),
    check("contentText").isLength({min: 0, max: 1000}),
    check("contentUrl").isLength({min: 0, max: 1000}),
    check("contentLabel").isLength({min: 0, max: 1000}),
  ]
});
exports.postItemVal = postItemVal;

// validation checks for patch item
const patchItemVal = Object.freeze({
  validation: [
    check("itemId").isInt({min: 1, max: 4294967295}),
    check("indentation").optional()
      .isInt({min: 0, max: 4}),
    check("iconType").optional()
      .isInt({min: 1, max: 65535}),
    check("contentText").optional()
      .isLength({min: 0, max: 1000}),
    check("contentUrl").optional()
      .isLength({min: 0, max: 1000}),
    check("contentLabel").optional()
      .isLength({min: 0, max: 1000})
  ]
});
exports.patchItemVal = patchItemVal;

// validation checks for patch item timestamp
const patchItemTimeVal = Object.freeze({
  validation: [
    check("itemId").isInt({min: 1, max: 4294967295}),
    check("deadLink").isInt({min: 0, max: 1})
  ]
});
exports.patchItemTimeVal = patchItemTimeVal;

// validation checks for patch homepage
const patchHomeVal = Object.freeze({
  validation: [
    check("mainHeader").isLength({min: 0, max: 1000}),
    check("secondaryHeader").isLength({min: 0, max: 1000}),
    check("sectionsTitle").isLength({min: 0, max: 1000}),
    check("sectionsFooter").isLength({min: 0, max: 5000}),
    check("tidbitsHeader").isLength({min: 0, max: 1000}),
    check("tidbitsTitle").isLength({min: 0, max: 1000}),
    check("tidbitsFooter").isLength({min: 0, max: 5000}),
    check("linksHeader").isLength({min: 0, max: 1000}),
    check("linksTitlePrefix").isLength({min: 0, max: 1000}),
    check("linksTitlePostfixInternal").isLength({min: 0, max: 1000}),
    check("linksTitlePostfixDownload").isLength({min: 0, max: 1000}),
    check("linksFooter").isLength({min: 0, max: 5000}),
    check("disclaimerHeader").isLength({min: 0, max: 1000}),
    check("disclaimerText").isLength({min: 0, max: 25000})
  ]
});
exports.patchHomeVal = patchHomeVal;

// validation checks for post icon
const postIconVal = Object.freeze({
  validation: [
    check("typeKeyword").isLength({min: 1, max: 100}),
    check("typeName").isLength({min: 1, max: 100}),
    check("groupIndex").isInt({min: 0, max: 3}),
    check("color").isLength({min: 7, max: 7})
  ]
});
exports.postIconVal = postIconVal;

// validation checks for patch icon
const patchIconVal = Object.freeze({
  validation: [
    check("typeKeyword").isLength({min: 1, max: 100}),
    check("typeName").isLength({min: 1, max: 100}),
    check("groupIndex").isInt({min: 0, max: 3}),
    check("color").isLength({min: 7, max: 7})
  ]
});
exports.patchIconVal = patchIconVal;

// validation checks for get links
const getLinkVal = Object.freeze({
  validation: [
    check("onlyDead").isInt({min: 0, max: 1})
  ]
});
exports.getLinkVal = getLinkVal;

// validation checks for patch link
const patchLinkVal = Object.freeze({
  validation: [
    check("url").isLength({min: 1, max: 1000})
  ]
});
exports.patchLinkVal = patchLinkVal;

// validation checks for patch sponsors
const patchSponsorsVal = Object.freeze({
  validation: [
    check("sponsors").isArray()
  ]
});
exports.patchSponsorsVal = patchSponsorsVal;