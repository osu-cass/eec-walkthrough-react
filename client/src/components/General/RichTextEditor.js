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

  // Keep the theme stable to avoid rebuilding Quill when toolbar visibility changes.
  const toolbarVisible = props.showToolbar();

  return (
    <div className={`text-editor ${toolbarVisible ? "" : "simple-text-border hide-toolbar"}`}>
      <ReactQuill
        preserveWhitespace={true}
        value={props.value}
        onChange={(text) => props.onChange(text)}
        id={`quill-${props.id}`}
        modules={modules}
        formats={formats}
        placeholder={props.placeHolder}
        theme="snow"
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
