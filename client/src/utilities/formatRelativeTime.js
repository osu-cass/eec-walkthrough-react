// File: formatTime.js
// Description: converts a timestamp to a human readable relative time

import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  MS_PER_MONTH,
  MS_PER_YEAR
} from "./constants";

export function formatRelativeTime(timestamp) {

  const previous = Date.parse(timestamp);
  const current = Date.now();
  const elapsed = current - previous;

  if (elapsed < MS_PER_MINUTE) {
    if (Math.floor(elapsed / MS_PER_SECOND) === 1) {
      return "1 second ago";
    } else {
      return Math.floor(elapsed / MS_PER_SECOND) + " seconds ago";
    }
  } else if (elapsed < MS_PER_HOUR) {
    if (Math.floor(elapsed / MS_PER_MINUTE) === 1) {
      return " 1 minute ago";
    } else {
      return Math.floor(elapsed / MS_PER_MINUTE) + " minutes ago";
    }
  } else if (elapsed < MS_PER_DAY) {
    if (Math.floor(elapsed / MS_PER_HOUR) === 1) {
      return "1 hour ago";
    } else {
      return Math.floor(elapsed / MS_PER_HOUR) + " hours ago";
    }
  } else if (elapsed < MS_PER_MONTH) {
    if (Math.floor(elapsed / MS_PER_DAY) === 1) {
      return "1 day ago";
    } else {
      return Math.floor(elapsed / MS_PER_DAY) + " days ago";
    }
  } else if (elapsed < MS_PER_YEAR) {
    if (Math.floor(elapsed / MS_PER_MONTH) === 1) {
      return " 1 month ago";
    } else {
      return Math.floor(elapsed / MS_PER_MONTH) + " months ago";
    }
  } else {
    if (Math.floor(elapsed / MS_PER_YEAR) === 1) {
      return "1 year ago";
    } else {
      return Math.floor(elapsed / MS_PER_YEAR) + " years ago";
    }
  }
}