// File: itemType.js
// Description: functions for checking if an item is of a specific type

// checks if the item is a simple item
export function isSimpleItem(item) {
  if (item.contentText.length && !item.contentUrl.length && !item.contentLabel.length) {
    return true;
  } else {
    return false;
  }
}

// checks if the item is a graphic
export function isGraphic(item) {
  if (!item.contentText.length && item.contentUrl.length && item.contentLabel.length) {
    return true;
  } else {
    return false;
  }
}

// checks if the item is a link
export function isLink(item) {
  if (item.contentText.length && item.contentUrl.length && item.contentLabel.length) {
    return true;
  } else {
    return false;
  }
}