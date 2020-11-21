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
      .isInt({min: 1, max: 5})
  ]
});
exports.patchUserVal = patchUserVal;

// validation checks for search user
const searchUserVal = Object.freeze({
  validation: [
    check("text").isLength({min: 0, max: 1000}),
    check("role").isInt({min: 0, max: 5}),
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
    check("pageType").isInt({min: 0, max: 4294967295}),
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
    check("pageType").isInt({min: 0, max: 4294967295}),
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
    check("headerId").isInt({min: 1, max: 4294967295})
  ]
});
exports.getHeaderVal = getHeaderVal;

// validation checks for move header
const patchHeaderMove = Object.freeze({
  validation: [
    check("headerId").isInt({min: 1, max: 4294967295}),
    check("direction").isInt({min: 0, max: 1}),
    check("mode").isInt({min: 0, max: 1})
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
const patchCardMoveVal = Object.freeze({
  validation: [
    check("cardId").isInt({min: 1, max: 4294967295}),
    check("direction").isInt({min: 0, max: 1}),
    check("mode").isInt({min: 0, max: 1})
  ]
});
exports.patchCardMoveVal = patchCardMoveVal;

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

// validation checks for patching a link timestamp
const patchLinkTimeVal = Object.freeze({
  validation: [
    check("deadLink").isInt({min: 0, max: 1})
  ]
});
exports.patchLinkTimeVal = patchLinkTimeVal;

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
    check("onlyDead").isInt({min: 0, max: 1}),
    check("sort").isInt({min: 0, max: 10}),
    check("order").isInt({min: 0, max: 1}),
    check("cursorPrimary").isLength({min: 1, max: 1000}),
    check("cursorSecondary").isLength({min: 1, max: 1000})
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

// validation checks for get category
const getCategoryVal = Object.freeze({
  validation: [
    check("categoryId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getCategoryVal = getCategoryVal;

// validation checks for post category
const postCategoryVal = Object.freeze({
  validation: [
    check("singleName").isLength({min: 1, max: 1000}),
    check("pluralName").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
  ]
});
exports.postCategoryVal = postCategoryVal;

// validation checks for patch category
const patchCategoryVal = Object.freeze({
  validation: [
    check("categoryId").isInt({min: 1, max: 4294967295}),
    check("singleName").isLength({min: 1, max: 1000}),
    check("pluralName").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 1000}),
    check("internal").isInt({min: 0, max: 1})
  ]
});
exports.patchCategoryVal = patchCategoryVal;

// validation checks for post view
const postViewVal = Object.freeze({
  validation: [
    check("headers").isArray(),
    check("publicView").isInt({min: 0, max: 1}),
    check("viewName").isLength({min: 1, max: 500})
  ]
});
exports.postViewVal = postViewVal;

// validation checks for get request
const getRequestVal = Object.freeze({
  validation: [
    check("requestId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getRequestVal = getRequestVal;

// validation checks for get request status
const getRequestStatusVal = Object.freeze({
  validation: [
    check("status").isInt({min: 0, max: 4294967295}),
    check("sort").isInt({min: 0, max: 10}),
    check("order").isInt({min: 0, max: 1}),
    check("cursorPrimary").isLength({min: 1, max: 1000}),
    check("cursorSecondary").isLength({min: 1, max: 1000})
  ]
});
exports.getRequestStatusVal = getRequestStatusVal;

// validation checks for get request selection
const getSelectionVal = Object.freeze({
  validation: [
    check("objects").isArray({min: 1})
  ]
});
exports.getSelectionVal = getSelectionVal;

// validation checks for post request
const postRequestVal = Object.freeze({
  validation: [
    check("title").isLength({min: 1, max: 1000}),
    check("description").isLength({min: 1, max: 5000}),
    check("objects").isArray({min: 1})
  ]
});
exports.postRequestVal = postRequestVal;

// validation checks for post comment
const postCommentVal = Object.freeze({
  validation: [
    check("requestId").isInt({min: 1, max: 4294967295}),
    check("comment").isLength({min: 1, max: 5000}),
    check("targetId").isLength({min: 1, max: 100}),
    check("status").isInt({min: 0, max: 4}),
  ]
});
exports.postCommentVal = postCommentVal;

// validation checks for patch comment
const patchCommentVal = Object.freeze({
  validation: [
    check("commentText").isLength({min: 1, max: 5000})
  ]
});
exports.patchCommentVal = patchCommentVal;

// validation checks for get sources
const getSourcesVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
  ]
});
exports.getSourcesVal = getSourcesVal;

// validation checks for post source
const postSourceVal = Object.freeze({
  validation: [
    check("text").isLength({min: 1, max: 5000})
  ]
});
exports.postSourceVal = postSourceVal;

// validation checks for post sources
const postSourcesVal = Object.freeze({
  validation: [
    check("pageId").isInt({min: 1, max: 4294967295}),
    check("sources").isArray()
  ]
});
exports.postSourcesVal = postSourcesVal;

// validation checks for post card titles
const postCardTitleVal = Object.freeze({
  validation: [
    check("titles").isArray()
  ]
});
exports.postCardTitleVal = postCardTitleVal;

// validation checks for get files
const getFilesVal = Object.freeze({
  validation: [
    check("userId").isInt({min: 1, max: 4294967295}),
    check("sort").isInt({min: 0, max: 10}),
    check("order").isInt({min: 0, max: 1}),
    check("cursor").isLength({min: 1, max: 1000})
  ]
});
exports.getFilesVal = getFilesVal;

// validation checks for get directories
const getDirectoriesVal = Object.freeze({
  validation: [
    check("sort").isInt({min: 0, max: 10}),
    check("order").isInt({min: 0, max: 1}),
    check("cursor").isLength({min: 1, max: 1000})
  ]
});
exports.getDirectoriesVal = getDirectoriesVal;

// validation checks for patch info
const patchInfoVal = Object.freeze({
  validation: [
    check("infoId").isInt({min: 0, max: 4294967295}),
    check("title").isLength({min: 0, max: 150}),
    check("text").isLength({min: 0, max: 5000}),
    check("icon").isLength({min: 0, max: 100})
  ]
});
exports.patchInfoVal = patchInfoVal;

// validation checks for post contributor
const postContributorVal = Object.freeze({
  validation: [
    check("userId").isInt({min: 0, max: 4294967295}),
    check("name").isLength({min: 1, max: 100}),
    check("title").isLength({min: 1, max: 500}),
    check("description").isLength({min: 1, max: 5000}),
    check("imageUrl").isLength({min: 1, max: 5000}),
    check("active").isInt({min: 0, max: 1})
  ]
});
exports.postContributorVal = postContributorVal;

const postBannerVal = Object.freeze({
  validation: [
    check("banners").isArray({min: 0, max: 25})
  ]
});
exports.postBannerVal = postBannerVal;