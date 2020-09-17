import React, {useEffect} from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import "./Source.css";

// Represents an inline citation that links to the reference card
function Source (props) {

  useEffect(() => {
    if (props.source > 0) {
      window.$('[data-toggle="popover"]').popover();
    }
  }, [props.source]);

  return props.source > 0 ? (
    <sup className="inline-citation">
      <a
        href={`#source-${props.source}`}
        title="Reference"
        data-toggle="popover"
        data-trigger="hover"
        data-content={sanitizeHtml(props.sourceText, {
          allowedTags: [],
          allowedAttributes: {}
        })}
        className="text-wrap pre-wrap"
      >
        [{props.source}]
      </a>
    </sup>
  ) : (
    null
  );

}
export default Source;

Source.propTypes = {
  source: PropTypes.number,
  sourceText: PropTypes.string
};