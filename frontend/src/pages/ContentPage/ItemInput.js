import React, {Fragment} from "react";
import FormControl from "react-bootstrap/FormControl";
import PropTypes from "prop-types";

// An input field for adding or modifying items in a card modal
function ItemInput(props) {

    return (
      <Fragment>
        {props.contentType === 1 ?
          <FormControl
            className="mx-3"
            placeholder="Item text"
            value={props.value.contentText}
            aria-label="Insert Username"
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
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 2)}
              required
            />
            <FormControl
              className="mr-3"
              placeholder="Graphic URL"
              value={props.value.contentUrl}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 3)}
              required
            />
          </Fragment>
          : ""}
        {props.contentType === 3 ? (
          <Fragment>
            <FormControl
              className="ml-3"
              placeholder="Resource text/description"
              value={props.value.contentText}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 1)}
              required
            />
            <FormControl
              placeholder="Resource URL label"
              value={props.value.contentLabel}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => props.handleInput(e, props.index, 2)}
              required
            />
            <FormControl
              className="mr-3"
              placeholder="Resource URL"
              value={props.value.contentUrl}
              aria-label="Insert Username"
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
  index: PropTypes.any
};