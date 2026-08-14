import React from "react";
import {render, screen} from "@testing-library/react";
import Sanitized from "./Sanitized";

test("removes scripts and event handlers while retaining visible content", () => {
  const {container} = render(
    <Sanitized html={'<div><script>alert("unsafe")</script><button onclick="alert(1)">Safe content</button></div>'} />
  );

  expect(screen.getByRole("button", {name: "Safe content"})).not.toHaveAttribute("onclick");
  expect(container.querySelector("script")).not.toBeInTheDocument();
});

test("removes unsafe URLs", () => {
  render(<Sanitized html={'<a href="javascript:alert(1)">Unsafe link</a>'} />);

  expect(screen.getByText("Unsafe link")).not.toHaveAttribute("href");
});

test("filters classes and styles to the intentional rich-text allowlist", () => {
  const {container} = render(
    <Sanitized html={'<span class="ql-size-large injected" style="color:#123456; background-image:url(javascript:alert(1))">Styled text</span>'} />
  );
  const content = screen.getByText("Styled text");

  expect(content).toHaveClass("ql-size-large");
  expect(content).not.toHaveClass("injected");
  expect(content).toHaveStyle({color: "rgb(18, 52, 86)"});
  expect(content.style.backgroundImage).toBe("");
  expect(container.querySelector("[class~='injected']")).not.toBeInTheDocument();
});

test("preserves intentional Quill and KaTeX MathML markup", () => {
  const html = '<div><p class="ql-size-huge">Formula <span class="ql-formula katex" data-value="x^2"><span class="katex-mathml"><math><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">x^2</annotation></semantics></math></span></span></p></div>';
  const {container} = render(<Sanitized html={html} />);

  expect(screen.getByText("Formula", {exact: false})).toHaveClass("ql-size-huge");
  expect(container.querySelector(".ql-formula.katex .katex-mathml math msup")).not.toBeNull();
  expect(container.querySelector("annotation")?.textContent).toBe("x^2");
});
