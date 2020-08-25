import React, {Fragment} from "react";
import PropTypes from "prop-types";

// Represents an inline citation that links to the reference card
function Source (props) {

  return props.source > 0 ? (
    <a href={`#source-${props.source}`}>[{props.source}]</a>
  ) : (
    <Fragment>
      {props.source < 0 && props.mode === 1 ? (
        <a href={`#source-star`}>[*]</a>
      ) : (
        null
      )}
    </Fragment>
  );

}
export default Source;

Source.propTypes = {
  source: PropTypes.number
};