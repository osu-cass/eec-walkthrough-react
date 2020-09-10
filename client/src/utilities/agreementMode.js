// File: agreementMode.js
// Description: uses local storage to track the current agreements
// that the user has accepted

// Gets the current public mode value.
// If the user roles is less than editor, always return public mode.
export function getAgreement(name) {

  const mode = window.localStorage.getItem(`agreement-${name}`);
  if (mode === "true") {
    return true;
  } else {
    return false;
  }

}

// accept agreement
export function acceptAgreement(name) {
  window.localStorage.setItem(`agreement-${name}`, "true");
}