/* eslint-env jest */
import React from "react";
import {render} from "@testing-library/react";
import katex from "katex";
import Sanitized from "./Sanitized";

afterEach(() => {
  jest.restoreAllMocks();
});

test.each(["x^2", "\\frac{a}{b}", "\\sqrt{x}", "\\overline{x}"])(
  "renders stored formula %s from its expression rather than its old markup",
  (expression) => {
    const {container} = render(<Sanitized html={
      `<span class="ql-formula" data-value="${expression}"><span class="katex"><span class="base">old layout</span></span></span>`
    } />);

    expect(container.querySelector(".katex-base")).not.toBeNull();
    expect(container.querySelector(".katex-strut")).not.toBeNull();
    expect(container.textContent).not.toContain("old layout");
    expect(container.querySelector(".ql-formula").getAttribute("data-value")).toBe(expression);
  }
);

test("repairs current markup whose layout classes were stripped during saving", () => {
  const stripped = katex.renderToString("x^2").replace(/katex-(base|strut|sizing)/g, "");
  const {container} = render(<Sanitized html={
    `<span class="ql-formula" data-value="x^2">${stripped}</span>`
  } />);

  expect(container.querySelector(".katex-base")).not.toBeNull();
  expect(container.querySelector(".katex-strut")).not.toBeNull();
  expect(container.querySelector(".katex-sizing")).not.toBeNull();
});

test("keeps malformed TeX readable and sanitizes surrounding HTML", () => {
  const {container} = render(<Sanitized html={
    '<script>alert(1)</script><img src="x" onerror="alert(1)"><span class="ql-formula" data-value="\\notacommand">old</span><a href="javascript:alert(1)">link</a>'
  } />);

  expect(container.textContent).toContain("\\notacommand");
  expect(container.querySelector("script, [onerror], a[href]")).toBeNull();
});

test("keeps trusted HTML commands disabled when regenerating TeX", () => {
  const {container} = render(<Sanitized html={
    '<span class="ql-formula" data-value="\\href{https://example.com}{x}">old</span>'
  } />);

  expect(container.querySelector("a")).toBeNull();
});

test("falls back to text when rendering unexpectedly fails", () => {
  jest.spyOn(katex, "renderToString").mockImplementation(() => {
    throw new Error("render failed");
  });
  const {container} = render(<Sanitized html={
    '<span class="ql-formula" data-value="&lt;img src=x onerror=alert(1)&gt;">old</span>'
  } />);

  expect(container.textContent).toBe("<img src=x onerror=alert(1)>");
  expect(container.querySelector("img")).toBeNull();
});

test("preserves prose and formulas without an expression", () => {
  const {container} = render(<Sanitized html={
    '<p>Before <strong>bold</strong> <span class="ql-formula">existing</span> after</p>'
  } />);

  expect(container.textContent).toBe("Before bold existing after");
  expect(container.querySelector("strong").textContent).toBe("bold");
  expect(container.querySelector(".ql-formula").textContent).toBe("existing");
});

test("only renders formulas again when the HTML changes", () => {
  const renderFormula = jest.spyOn(katex, "renderToString");
  const html = '<span class="ql-formula" data-value="x^2">old</span>';
  const {rerender} = render(<Sanitized html={html} />);

  rerender(<Sanitized html={html} inline={true} />);
  expect(renderFormula).toHaveBeenCalledTimes(1);

  rerender(<Sanitized html={html.replace("x^2", "x^3")} />);
  expect(renderFormula).toHaveBeenCalledTimes(2);
});
