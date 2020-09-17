import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// A textarea that supports underline, bold, and italic text
function RichTextEditor(props) {

  return (
    <ReactQuill
      value={props.value}
      onChange={(text) => props.onChange(text)}
      id={`quill-${props.id}`}
    />
  );

}
export default RichTextEditor;

RichTextEditor.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};