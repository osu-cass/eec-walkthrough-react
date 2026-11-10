// Unit test for RichTextEditor (react-quill wrapper).
// Fast, isolated guard that react-quill 2.0.0 integrates under React 18 + jsdom:
// the component mounts a Quill editor without throwing, honors the showToolbar()
// theme switch, and passes the placeholder through. Deep editing behavior
// (typing, formatting, formula, save round-trip) is covered by the Playwright
// e2e specs against a real browser, where Quill's contenteditable actually
// works; jsdom cannot faithfully drive that, so this stays at the mount/wiring
// level on purpose.
import React from "react";
import {render} from "@testing-library/react";

Object.defineProperty(document, "execCommand", {
  configurable: true,
  value: vi.fn(() => false)
});
Object.defineProperty(document, "queryCommandSupported", {
  configurable: true,
  value: vi.fn(() => false)
});

const {default: RichTextEditor} = await import("./RichTextEditor");

const baseProps = {
  id: "unit-test",
  value: "",
  onChange: () => {},
  placeHolder: "Enter text",
};

test("mounts a Quill editor without crashing under React 18", () => {
  const {container} = render(<RichTextEditor {...baseProps} showToolbar={() => true} />);
  // Quill's contenteditable surface. If react-quill 2.0.0 failed to mount under
  // React 18, this node would be absent.
  expect(container.querySelector(".ql-editor")).toBeInTheDocument();
});

test("showToolbar() true renders the snow theme with a toolbar", () => {
  const {container} = render(<RichTextEditor {...baseProps} showToolbar={() => true} />);
  expect(container.querySelector(".ql-container.ql-snow")).toBeInTheDocument();
  expect(container.querySelector(".ql-toolbar.ql-snow")).toBeInTheDocument();
  // Toolbar mode drops the plain-border wrapper class.
  expect(container.querySelector(".text-editor")).not.toHaveClass("simple-text-border");
});

test("showToolbar() false keeps the snow editor mounted but flags the hidden toolbar", () => {
  const {container} = render(<RichTextEditor {...baseProps} showToolbar={() => false} />);
  // Theme stays snow (never bubble) so selection never rebuilds the editor.
  expect(container.querySelector(".ql-container.ql-snow")).toBeInTheDocument();
  expect(container.querySelector(".ql-container.ql-bubble")).not.toBeInTheDocument();
  // Wrapper flags the hidden-toolbar state; CSS collapses the toolbar.
  expect(container.querySelector(".text-editor")).toHaveClass("simple-text-border");
  expect(container.querySelector(".text-editor")).toHaveClass("hide-toolbar");
});

test("passes the placeholder through to Quill", () => {
  render(<RichTextEditor {...baseProps} placeHolder="Enter text" showToolbar={() => true} />);
  // Quill mirrors the placeholder onto the editor's data-placeholder attribute.
  const editor = document.querySelector(".ql-editor");
  expect(editor).toHaveAttribute("data-placeholder", "Enter text");
});
