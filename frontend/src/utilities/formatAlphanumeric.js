// File: formatAlphanumeric.js
// Description: converts a string into a alphanumeric string

export function formatAlphanumeric(text) {
  return text.replace(/[\W_]+/g, " ");
}