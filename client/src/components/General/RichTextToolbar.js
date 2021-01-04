import React from "react";
import "./RichTextToolbar.css";

// Custom toolbar
function RichTextToolbar() {
  return (
    <div id="toolbar">
      {/* Font sizes */}
      <select className="ql-size">
        <option value="small">Small</option>
        <option value="medium" selected>Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>

      {/* Buttons for text formatting */}
      <button className="ql-bold ml-2" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike mr-2" />

      {/* Buttons for making lists */}
      <button className="ql-list ml-2" value="ordered" />
      <button className="ql-list mr-2" value="bullet" />

      {/* Button for making links */}
      <button className="ql-link mx-2" />

      {/* Buttons for KaTeX functions */}
      <button className="ql-formula ml-2" />
      <a href="https://katex.org/docs/supported.html" target="_blank" rel="noreferrer">
        <button className="ql-katex question-mark-button mr-2">
          <span className="font-weight-bold">?</span>
        </button>
      </a>

      {/* Button for cleaning formatting from text */}
      <button className="ql-clean ml-2" />
    </div>
  );
}
export default RichTextToolbar;