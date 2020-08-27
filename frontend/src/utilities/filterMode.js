// File: filterMode.js
// Description: uses local storage to see if the user should show filter bars


// Gets the current show filter status
export function getFilterShow() {

  const mode = window.localStorage.getItem("showFilters");
  if (mode) {
    return parseInt(mode);
  } else {
    return 1;
  }

}

// sets the show filter value
export function setFilterShow(showValue) {
  window.localStorage.setItem("showFilters", showValue.toString(10));
}