import React, {Fragment, useState, useEffect} from "react";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import ImageInput from "../../../components/General/ImageInput";
import RichTextEditor from "../../../components/General/RichTextEditor";
import sanitizeHtml from "sanitize-html";
import PropTypes from "prop-types";
import "./ItemInput.css";

// An input field for adding or modifying items in a card modal
function ItemInput(props) {
  const [linkValue, setLinkValue] = useState(props.value.contentMode);
  const [sourceValue, setSourceValue] = useState(props.sourceId);
  const [linkText, setLinkText] = useState("Link");
  const [sourceText, setSourceText] = useState("Source: None");
  const [sources, setSources] = useState(props.sources);
  const {value, index, handleLinkValue, handleSourceValue} = props;

  // updates the link dropdown text to match a selection
  useEffect(() => {
    switch (linkValue) {
      case 0:
        setLinkText("IL");
        handleLinkValue(index, 0);
        break;
      case 1:
        setLinkText("EL");
        handleLinkValue(index, 1);
        break;
      case 2:
        setLinkText("ID");
        handleLinkValue(index, 2);
        break;
      case 3:
        setLinkText("ED");
        handleLinkValue(index, 3);
        break;
      default:
        setLinkText("Link");
        handleLinkValue(index, -1);
    }
    // eslint-disable-next-line
  }, [linkValue, value.contentMode, index]);

  // updates the source dropdown text to match a selection
  useEffect(() => {
    // if no source is selected
    if (sourceValue === 0) {
      setSourceText("Source: None");
      handleSourceValue(index, 0);
    } else {
      // find the text for the current selected source
      for (let i = 0; i < sources.length; i++) {
        if (sourceValue === sources[i].sourceId) {
          const cleanString = sanitizeHtml(sources[i].text, {allowedTags: [], allowedAttributes: {}});
          setSourceText(`Source: ${cleanString.substring(0, 8).trim()}...`);
          handleSourceValue(index, sources[i].sourceId);
          break;
        }
      }
    }
    // eslint-disable-next-line
  }, [sourceValue, sources]);

  // sanitize all sources by removing all HTML tags
  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(props.sources));
    for (let i = 0; i < props.sources.length; i++) {
      const newSourceText = sanitizeHtml(props.sources[i].text, {
        allowedTags: [],
        allowedAttributes: {}
      });

      copy[i].text = newSourceText;
    }
    setSources(copy);
  }, [props.sources]);

  return (
    <Fragment>

      {props.groupIndex === 1 ? (
        <Fragment>
          <div className="ml-3 small-text-editor-input">
            <RichTextEditor
              id={`submit-text-${props.index}`}
              value={props.value.contentText}
              onChange={(e) => props.handleInput(e, props.index, 1)}
              placeHolder="Item Text"
              showToolbar={props.isSelected}
            />
          </div>
          <Dropdown className="source-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {sourceText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setSourceValue(0)}>
                  None
              </Dropdown.Item>
              {sources.map((source) =>
                <Dropdown.Item
                  className="source-dropdown-val"
                  style={{cursor: "pointer"}}
                  onClick={() => setSourceValue(source.sourceId)}
                  key={source.sourceId}
                >
                  {source.text.length > 75 ? (
                    source.text.substring(0, 75).trim() + "..."
                  ) : (
                    source.text
                  )}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Fragment>
      ) : (
        null
      )}

      {props.groupIndex === 2 ? (
        <Fragment>
          <div className="ml-3 very-small-text-editor-input">
            <RichTextEditor
              id={`submit-text-${props.index}`}
              value={props.value.contentLabel}
              onChange={(text) => props.handleInput(text, props.index, 2)}
              placeHolder="Graphic Label"
              showToolbar={props.isSelected}
            />
          </div>
          <div className="col px-0">
            <FormControl
              as="textarea"
              rows="1"
              maxLength="1000"
              className={`${props.internal ? "internal-modal-item" : ""} ${props.inline ? "inline-modal-item" : ""}`}
              placeholder="Image URL"
              value={props.value.contentUrl}
              aria-label="Insert Image URL"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 3)}
              required
            />
            <ImageInput
              id={props.index}
              internal={props.internal}
              inline={props.inline}
              onNewImage={(newImage) => props.onNewImage(newImage, props.index)}
              default={"... or Upload an Image"}
            />
          </div>
          <Dropdown className="source-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {sourceText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setSourceValue(0)}>
                  None
              </Dropdown.Item>
              {sources.map((source) =>
                <Dropdown.Item
                  className="source-dropdown-val"
                  style={{cursor: "pointer"}}
                  onClick={() => setSourceValue(source.sourceId)}
                  key={source.sourceId}
                >
                  {source.text.length > 75 ? (
                    source.text.substring(0, 75).trim() + "..."
                  ) : (
                    source.text
                  )}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Fragment>
      ) : (
        null
      )}

      {props.groupIndex === 3 ? (
        <Fragment>
          <Dropdown className="link-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {linkText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setLinkValue(0)}>
                  Internal Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setLinkValue(1)}>
                  External Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setLinkValue(2)}>
                  Internal Download
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => setLinkValue(3)}>
                  External Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={`ml-3 ${props.internal ? "internal-modal-item" : ""} ${props.inline ? "inline-modal-item" : ""}`}
            placeholder="Resource Label"
            value={props.value.contentLabel}
            aria-label="Resource Label"
            onChange={(text) => props.handleInput(text, props.index, 5)}
            required
          />
          <div className="col px-0">
            <FormControl
              as="textarea"
              rows="1"
              maxLength="1000"
              className={`${props.internal ? "internal-modal-item" : ""} ${props.inline ? "inline-modal-item" : ""}`}
              placeholder="Resource URL"
              value={props.value.contentUrl}
              aria-label="Insert Resource URL"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 3)}
              required
            />
            <ImageInput
              id={props.index}
              internal={props.internal}
              inline={props.inline}
              onNewImage={(newImage) => props.onNewImage(newImage, props.index)}
              default={"... or Upload a PDF"}
            />
            <FormControl
              as="textarea"
              rows="1"
              maxLength="1000"
              className={`${props.internal ? "internal-modal-item" : ""} ${props.inline ? "inline-modal-item" : ""}`}
              placeholder="Main Webpage Source URL"
              value={props.value.learnMoreUrl}
              aria-label={"Insert Main Webpage URL"}
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 6)}
            />
          </div>
          <div className="very-small-text-editor-input">
            <RichTextEditor
              id={`submit-text-${props.index}`}
              value={props.value.contentText}
              onChange={(text) => props.handleInput(text, props.index, 1)}
              placeHolder="Description (optional)"
              showToolbar={props.isSelected}
            />
          </div>
        </Fragment>
      ) : (
        null
      )}

    </Fragment>
  );

}
export default ItemInput;

ItemInput.propTypes = {
  groupIndex: PropTypes.number,
  value: PropTypes.any,
  handleInput: PropTypes.func,
  onNewImage: PropTypes.func,
  index: PropTypes.number,
  handleLinkValue: PropTypes.func,
  handleSourceValue: PropTypes.func,
  internal: PropTypes.number,
  inline: PropTypes.number,
  sourceId: PropTypes.number,
  sources: PropTypes.array,
  isSelected: PropTypes.func
};