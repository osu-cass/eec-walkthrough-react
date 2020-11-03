// File: formatTime.js
// Description: converts a timestamp to a human readable relative time

export function formatRelativeTime(timestamp) {

  const previous = Date.parse(timestamp);
  const current = Date.now();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (Math.floor(elapsed/1000) === 1) {
      return "1 second ago";
    } else {
      return Math.floor(elapsed/1000) + " seconds ago";
    }
  }

  else if (elapsed < msPerHour) {
    if (Math.floor(elapsed/msPerMinute) === 1) {
      return " 1 minute ago";
    } else {
      return Math.floor(elapsed/msPerMinute) + " minutes ago";
    }
  }

  else if (elapsed < msPerDay ) {
    if (Math.floor(elapsed/msPerHour) === 1) {
      return "1 hour ago";
    } else {
      return Math.floor(elapsed/msPerHour) + " hours ago";
    }
  }

  else if (elapsed < msPerMonth) {
    if (Math.floor(elapsed/msPerDay) === 1) {
      return "1 day ago";
    } else {
      return Math.floor(elapsed/msPerDay) + " days ago";
    }
  }

  else if (elapsed < msPerYear) {
    if (Math.floor(elapsed/msPerMonth) === 1) {
      return " 1 month ago";
    } else {
      return Math.floor(elapsed/msPerMonth) + " months ago";
    }
  }

  else {
    if (Math.floor(elapsed/msPerYear) === 1) {
      return "1 year ago";
    } else {
      return Math.floor(elapsed/msPerYear) + " years ago";
    }
  }
}