import React, {Fragment, useState, useEffect} from "react";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

// An input field for adding or modifying items in a card modal
function ItemInput(props) {

  const [linkText, setLinkText] = useState("Link");
  const [sourceText, setSourceText] = useState("Source: None");

  useEffect(() => {
    updateLink(props.value.contentMode);

    // find the matching index for the source ID
    for (let i = 0; i < props.sources.length; i++) {
      if (props.sourceId === props.sources[i].sourceId) {
        updateSource(i + 1, props.sources[i].text);
        break;
      }
    }
    // eslint-disable-next-line
  }, [props.value.contentMode]);

  function updateLink(value) {
    switch (value) {
      case 0:
        setLinkText("IL");
        props.handleLinkValue(props.index, 0);
        break;
      case 1:
        setLinkText("EL");
        props.handleLinkValue(props.index, 1);
        break;
      case 2:
        setLinkText("ID");
        props.handleLinkValue(props.index, 2);
        break;
      case 3:
        setLinkText("ED");
        props.handleLinkValue(props.index, 3);
        break;
      default:
        setLinkText("Link");
        props.handleLinkValue(props.index, -1);
    }
  }

  function updateSource(value, text) {
    if (value === 0) {
      setSourceText("Source: None");
      props.handleSourceValue(props.index, 0);
    } else {
      setSourceText(`Source: ${text.substring(0, 8).trim()}...`);
      props.handleSourceValue(props.index, props.sources[value - 1].sourceId);
    }
  }

  return (
    <Fragment>
      {props.contentType === 1 ? (
        <Fragment>
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={`ml-3 ${props.internal ? "internal-modal-item" : ""}`}
            placeholder="Item Text"
            value={props.value.contentText}
            aria-label="Insert Description"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 1)}
            required
          />
          <Dropdown className="source-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {sourceText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateSource(0)}>
                  None
              </Dropdown.Item>
              {props.sources.map((source, i) =>
                <Dropdown.Item
                  className="source-dropdown-val"
                  style={{cursor: "pointer"}}
                  onClick={() => updateSource(i + 1, source.text)}
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
      {props.contentType === 2 ? (
        <Fragment>
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={`ml-3 ${props.internal ? "internal-modal-item" : ""}`}
            placeholder="Graphic Label"
            value={props.value.contentLabel}
            aria-label="Insert Description"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 2)}
            required
          />
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={props.internal ? "internal-modal-item" : ""}
            placeholder="Graphic URL"
            value={props.value.contentUrl}
            aria-label="Insert Image URL"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 3)}
            required
          />
          <Dropdown className="source-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {sourceText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateSource(0)}>
                  None
              </Dropdown.Item>
              {props.sources.map((source, i) =>
                <Dropdown.Item
                  className="source-dropdown-val"
                  style={{cursor: "pointer"}}
                  onClick={() => updateSource(i + 1, source.text)}
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
      {props.contentType === 3 ? (
        <Fragment>
          <Dropdown className="link-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {linkText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateLink(0)}>
                  Internal Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateLink(1)}>
                  External Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateLink(2)}>
                  Internal Download
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => updateLink(3)}>
                  External Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={`ml-3 ${props.internal ? "internal-modal-item" : ""}`}
            placeholder="Resource Label"
            value={props.value.contentLabel}
            aria-label="Insert URL Label"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 2)}
            required
          />
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={props.internal ? "internal-modal-item" : ""}
            placeholder="Resource URL"
            value={props.value.contentUrl}
            aria-label="Insert Resource URL"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 3)}
            required
          />
          <FormControl
            as="textarea"
            rows="1"
            maxLength="1000"
            className={props.internal ? "internal-modal-item" : ""}
            placeholder="Description (optional)"
            value={props.value.contentText}
            aria-label="Insert Description"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 1)}
            required
          />
        </Fragment>
      ) : (
        null
      )}
    </Fragment>
  );

}
export default ItemInput;

ItemInput.propTypes = {
  contentType: PropTypes.any,
  value: PropTypes.any,
  handleInput: PropTypes.any,
  index: PropTypes.any,
  handleLinkValue: PropTypes.func,
  handleSourceValue: PropTypes.func,
  internal: PropTypes.number,
  sourceId: PropTypes.number,
  sources: PropTypes.array
};