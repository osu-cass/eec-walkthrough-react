import React from "react";
import PropTypes from "prop-types";

// Represents an inline citation that links to the reference card
function Source (props) {

  return props.source > 0 ? (
    <a href={`#source-${props.source}`}>[{props.source}]</a>
  ) : (
    null
  );

}
export default Source;

Source.propTypes = {
  source: PropTypes.number
};