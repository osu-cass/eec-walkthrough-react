import {getProfile} from "./cookieAuth";
import {getMode} from "./pageMode";
import {getPublic} from "./publicMode";
import {getPublished} from "./publishedMode";

vi.mock("./cookieAuth", () => ({
  getProfile: vi.fn()
}));

beforeEach(() => {
  window.localStorage.clear();
});

test("role thresholds override stored modes", () => {
  window.localStorage.setItem("pageMode", "2");
  window.localStorage.setItem("publicMode", "0");
  window.localStorage.setItem("publishedMode", "1");

  getProfile.mockReturnValue({role: 1});
  expect(getMode()).toBe(0);
  expect(getPublic()).toBe(1);

  getProfile.mockReturnValue({role: 3});
  expect(getPublished()).toBe(0);
});

test("page mode uses its default and stored values for editors", () => {
  getProfile.mockReturnValue({role: 2});
  expect(getMode()).toBe(0);

  window.localStorage.setItem("pageMode", "2");
  expect(getMode()).toBe(2);
});

test("public mode uses its default and stored values for editors", () => {
  getProfile.mockReturnValue({role: 2});
  expect(getPublic()).toBe(0);

  window.localStorage.setItem("publicMode", "1");
  expect(getPublic()).toBe(1);
});

test("published mode uses its default and stored values for administrators", () => {
  getProfile.mockReturnValue({role: 4});
  expect(getPublished()).toBe(0);

  window.localStorage.setItem("publishedMode", "1");
  expect(getPublished()).toBe(1);
});
