import React, {Fragment} from "react";
import PropTypes from "prop-types";

// Represents a the amount of space preceding an item
function Indent (props) {

  if (props.indentLevel === 1) {
    return <i className="ml-4"/>
  } else if (props.indentLevel === 2) {
    return (<Fragment><i className="ml-4"/><i className="ml-4"/></Fragment>)
  } else if (props.indentLevel === 3) {
    return (<Fragment><i className="ml-4"/><i className="ml-4"/><i className="ml-4"/></Fragment>)
  } else if (props.indentLevel === 4) {
    return (<Fragment><i className="ml-4"/><i className="ml-4"/><i className="ml-4"/><i className="ml-4"/></Fragment>)
  } else {
    return null;
  }

}
export default Indent;

Indent.propTypes = {
  indentLevel: PropTypes.number
};