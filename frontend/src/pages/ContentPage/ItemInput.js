import React, {Fragment, useState, useEffect} from "react";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

// An input field for adding or modifying items in a card modal
function ItemInput(props) {

  const [linkText, setLinkText] = useState("Link");

  useEffect(() => {
    updateLink(props.value.contentMode);
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

  return (
    <Fragment>
      {props.contentType === 1 ?
        <FormControl
          className="mx-3"
          placeholder="Item text"
          value={props.value.contentText}
          aria-label="Insert Description"
          aria-describedby="basic-addon1"
          onChange={(e) => props.handleInput(e, props.index, 1)}
          required
        />
        : ""}
      {props.contentType === 2 ?
        <Fragment>
          <FormControl
            className="ml-3"
            placeholder="Graphic description"
            value={props.value.contentLabel}
            aria-label="Insert Description"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 2)}
            required
          />
          <FormControl
            className="mr-3"
            placeholder="Graphic URL"
            value={props.value.contentUrl}
            aria-label="Insert Image URL"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 3)}
            required
          />
        </Fragment>
        : ""}
      {props.contentType === 3 ? (
        <Fragment>
          <Dropdown className="link-select-drop-down-menu ml-2">
            <Dropdown.Toggle variant="outline-dark">
              {linkText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => { updateLink(0); }}>
                  Internal Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => { updateLink(1); }}>
                  External Link
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => { updateLink(2); }}>
                  Internal Download
              </Dropdown.Item>
              <Dropdown.Item style={{cursor: "pointer"}} onClick={() => { updateLink(3); }}>
                  External Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FormControl
            className="ml-3"
            placeholder="Resource text/description"
            value={props.value.contentText}
            aria-label="Insert Description"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 1)}
            required
          />
          <FormControl
            placeholder="Resource URL label"
            value={props.value.contentLabel}
            aria-label="Insert URL Label"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 2)}
            required
          />
          <FormControl
            className="mr-3"
            placeholder="Resource URL"
            value={props.value.contentUrl}
            aria-label="Insert Resource URL"
            aria-describedby="basic-addon1"
            onChange={(e) => props.handleInput(e, props.index, 3)}
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
  handleLinkValue: PropTypes.func
};