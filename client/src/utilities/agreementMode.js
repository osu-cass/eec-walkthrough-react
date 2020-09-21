// File: agreementMode.js
// Description: uses local storage to track the current agreements
// that the user has accepted

// gets the current agreement mode value
export function getAgreement(name) {
  const agreementString = window.localStorage.getItem(`agreement-store-${name}`);
  
  // see if there is any value in storage
  if (!agreementString) {
    return false;
  }

  const agreement = JSON.parse(agreementString);
  const currentTime = new Date();

  // compare the expiry time of the agreement with the current time
  if (currentTime.getTime() > agreement.expiry) {
    window.localStorage.removeItem(`agreement-store-${name}`);
    return false;
  } else {
    return true;
  }
}

// accept agreement
export function acceptAgreement(name) {
  // this is how long we will wait until asking for a new agreement
  const expirationLimit = 12 * 60 * 60 * 1000; // 12 hours
  const currentTime = new Date();

  // save the time that the agreement was made
  const agreement = {
    value: "true",
    expiry: currentTime.getTime() + expirationLimit
  }

  // store the agreement
  window.localStorage.setItem(`agreement-store-${name}`, JSON.stringify(agreement));
}