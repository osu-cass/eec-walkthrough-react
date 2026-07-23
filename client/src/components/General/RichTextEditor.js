import React from "react";
import PropTypes from "prop-types";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./RichTextEditor.css";
// import RichTextToolbar from "./RichTextToolbar";
window.katex = katex;

// A textarea that supports underline, bold, and italic text
function RichTextEditor(props) {

  const modules = {
    toolbar: [
      [{size: ["small", false, "large", "huge"]}],
      ["bold", "italic", "underline", "strike"],
      ["formula"],
      ["clean"]
    ],
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "formula"
  ];

  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["small", "medium", "large", "huge"];
  Quill.register(Size, true);

  const theme = props.showToolbar() ? "snow" : "bubble";

  return (
    <div className={`text-editor ${props.showToolbar() ? "" : "simple-text-border"}`}>
      <ReactQuill
        // Keying on theme forces React to unmount + remount ReactQuill when the
        // theme changes, instead of letting react-quill regenerate the editor
        // in place. react-quill 2.0.0's in-place regeneration relies on
        // findDOMNode and restores the prior selection during the rebuild; under
        // React 18 that races the DOM update and throws "addRange(): The given
        // range isn't in document", leaving the editor blank. A clean remount
        // rebuilds from `value` with no stale selection to restore.
        key={theme}
        preserveWhitespace={true}
        value={props.value}
        onChange={(text) => props.onChange(text)}
        id={`quill-${props.id}`}
        modules={modules}
        formats={formats}
        placeholder={props.placeHolder}
        theme={theme}
      />
    </div>
  );

}
export default RichTextEditor;

RichTextEditor.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  fontSizes: PropTypes.bool,
  placeHolder: PropTypes.string,
  showToolbar: PropTypes.func
};