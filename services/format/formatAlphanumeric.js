// File: formatAlphanumeric.js
// Description: converts a string into a alphanumeric string

function formatAlphanumeric(text) {
  return text.replace(/[\W_]+/g, " ");
}
exports.formatAlphanumeric = formatAlphanumeric;