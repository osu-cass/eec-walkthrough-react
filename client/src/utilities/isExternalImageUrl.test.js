import {isExternalImageUrl} from "./isExternalImageUrl";

test("treats empty and local paths as internal", () => {
  ["", "/uploads/example.png", "images/example.png"].forEach(url => {
    expect(isExternalImageUrl(url)).toBe(false);
  });
});

test("recognizes protocol-relative and HTTP URLs as external", () => {
  ["//cdn.example.com/image.png", "http://example.com/image.png", "https://example.com/image.png"].forEach(url => {
    expect(isExternalImageUrl(url)).toBe(true);
  });
});

test("recognizes other URL schemes as external", () => {
  ["data:image/png;base64,abc", "blob:https://example.com/id", "ftp://example.com/image.png"].forEach(url => {
    expect(isExternalImageUrl(url)).toBe(true);
  });
});
