// File: isExternalImageUrl.js
// Description: checks if a URL is not a same-origin path (e.g. /uploads/...)

export function isExternalImageUrl(url) {
    if (!url.length) {
      return false;
    }
    if (url.startsWith("//")) {
      return true;
    }
    return /^[a-z][a-z0-9+.-]*:/i.test(url);
}