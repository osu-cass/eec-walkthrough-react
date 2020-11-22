import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// A textarea that supports underline, bold, and italic text
function RichTextEditor(props) {

  const modules = {
    toolbar: [
      [{size: ["small", false, "large", "huge"]}],
      ["bold", "italic", "underline", "strike"],
      [{list: "ordered"}, {list: "bullet"}],
      ["link"],
      ["clean"]
    ],
  };

  const formats = [
    "size",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "link"
  ];

  return (
    <ReactQuill
      value={props.value}
      onChange={(text) => props.onChange(text)}
      id={`quill-${props.id}`}
      modules={modules}
      formats={formats}
    />
  );

}
export default RichTextEditor;

RichTextEditor.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  fontSizes: PropTypes.bool
};