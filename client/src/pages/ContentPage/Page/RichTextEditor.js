import React, {useState, useRef} from "react";
import "./RichTextEditor.css";
import PropTypes from "prop-types";

// A textarea that supports underline, bold, and italic text
function RichTextEditor(props) {

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [textValue, setTextValue] = useState(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // set bold text
  function boldText() {
    if (bold) {
      setBold(false);
    } else {
      setBold(true);
      outputRef.current.innerHTML += "<strong></strong>";
    }
  }

  // set italic text
  function italicText() {
    if (italic) {
      setItalic(false);
    } else {
      setItalic(true);
      outputRef.current.innerHTML += "<em></em>";
    }
  }

  // set underlined text
  function underlineText() {
    if (underline) {
      setUnderline(false);
    } else {
      setUnderline(true);
      outputRef.current.innerHTML += "<u></u>";
    }
  }

  // formats the text
  function formatText(text) {
    switch (true) {
      case bold:
        const allBold = outputRef.current.getElementsByTagName("strong");
        const lastBold = allBold[allBold.length - 1];
        lastBold.innerText += text;
        break;
      case italic:
        const allItalized = outputRef.current.getElementsByTagName("em");
        const lastItalized = allItalized[allItalized.length - 1];
        lastItalized.innerText += text;
        break;
      case underline:
        const allUnderlined = outputRef.current.getElementsByTagName("u");
        const lastUnderlined = allUnderlined[allUnderlined.length - 1];
        lastUnderlined.innerText += text;
        break;
      default:
        outputRef.current.innerHTML += text;
        break;
    }
  }

  // handles changes to the text
  function handleChange(text) {
    const input = inputRef.current.value;
    const output = outputRef.current.innerText;
    const newText = input.slice(output.length);
    formatText(newText);
    setTextValue(outputRef.current.innerHTML);
  }

  return (
    <div className="rich-text-container">
      <header className="rich-text-header">

        <div ref={outputRef}>
          
        </div>

        <span className="rich-text-controls">
          <button 
            className={`rich-text-button ${bold ? "selected" : ""}`}
            onClick={() => boldText()}
          >
            <strong>B</strong>
          </button>
          <button 
            className={`rich-text-button ${italic ? "selected" : ""}`}
            onClick={() => italicText()}
          >
            <em>I</em>
          </button>
          <button 
            className={`rich-text-button ${underline ? "selected" : ""}`}
            onClick={() => underlineText()}
          >
            <u>U</u>
          </button>
        </span>
        <textarea 
          rows="5"
          className="rich-text-text"
          maxLength={props.charLimit}
          ref={inputRef}
          onChange={(text) => handleChange(text)}
        />
      </header>
    </div>
  );

}
export default RichTextEditor;

RichTextEditor.propTypes = {
  charLimit: PropTypes.number
};