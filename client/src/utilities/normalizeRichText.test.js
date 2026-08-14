import {normalizeEmptyRichText} from "./normalizeRichText";

test("normalizes empty paragraph, break, and non-breaking-space markup", () => {
  [
    "",
    "<p></p>",
    "<p><br></p>",
    "<p>&nbsp;</p>",
    "<p> <br /> &nbsp; </p>"
  ].forEach(value => expect(normalizeEmptyRichText(value)).toBe(""));
});

test("preserves the original rich text when content remains", () => {
  const value = "<p>Hello<br>world</p>";

  expect(normalizeEmptyRichText(value)).toBe(value);
});

test("passes non-string values through unchanged", () => {
  const objectValue = {html: "<p></p>"};

  expect(normalizeEmptyRichText(null)).toBeNull();
  expect(normalizeEmptyRichText(objectValue)).toBe(objectValue);
});
