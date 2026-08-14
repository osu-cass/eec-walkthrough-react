import {changeUsername, getProfile, loggedIn, logout} from "./cookieAuth";

const cookieNames = ["userId_ck", "username_ck", "role_ck"];

function clearAuthCookies() {
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

function setAuthCookies({userId = "42", username = "alex", role = "3"} = {}) {
  document.cookie = `userId_ck=${userId}; path=/;`;
  document.cookie = `username_ck=${username}; path=/;`;
  document.cookie = `role_ck=${role}; path=/;`;
}

beforeEach(clearAuthCookies);
afterEach(clearAuthCookies);

test("parses a valid user profile", () => {
  setAuthCookies();

  expect(getProfile()).toEqual({username: "alex", userId: 42, role: 3});
});

test("falls back to the logged-out profile for missing or malformed cookies", () => {
  const loggedOutProfile = {username: "", userId: 0, role: 0};
  expect(getProfile()).toEqual(loggedOutProfile);

  setAuthCookies({role: "editor"});
  expect(getProfile()).toEqual(loggedOutProfile);
});

test("reports whether the current cookie profile is logged in", () => {
  expect(loggedIn()).toBe(false);

  setAuthCookies();
  expect(loggedIn()).toBe(true);
});

test("changes the username without changing the remaining profile", () => {
  setAuthCookies();

  changeUsername("casey");

  expect(getProfile()).toEqual({username: "casey", userId: 42, role: 3});
});

test("logs out by clearing all authentication cookies", () => {
  setAuthCookies();

  logout();

  expect(getProfile()).toEqual({username: "", userId: 0, role: 0});
  cookieNames.forEach(name => expect(document.cookie).not.toContain(`${name}=`));
});
