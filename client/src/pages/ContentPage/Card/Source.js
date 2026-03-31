import React, {useEffect} from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "./Source.css";
import { Popover } from "bootstrap";

// Represents an inline citation that links to the reference card
function Source (props) {

  useEffect(() => {
    if (props.source > 0) {
      window.$('[data-bs-toggle="popover"]').popover();
    }
  }, [props.source]);

  return props.source > 0 ? (
    <sup className="inline-citation">

      <a
        href={`#source-${props.source}`}
        title="Reference"
        data-bs-toggle="popover"
        data-trigger="hover"
        data-html="true"
        data-content={DOMPurify.sanitize(props.sourceText)}
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