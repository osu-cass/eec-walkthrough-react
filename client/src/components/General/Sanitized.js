import React from "react";
import PropTypes from "prop-types";
import SanitizedHTML from "react-sanitized-html";

// Sanitizes the HTML that is passed to it
function Sanitized(props) {
  return (
    <SanitizedHTML
      allowedTags={["a", "p", "strong", "u", "ol", "li", "em", "s"]}
      allowedAttributes={{a: ["href"]}}
      html={props.html}
    />
  );
}
export default Sanitized;

Sanitized.propTypes = {
  html: PropTypes.any.isRequired
};

