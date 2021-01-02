import React from "react";
import PropTypes from "prop-types";
import SanitizedHTML from "react-sanitized-html";

// Sanitizes the HTML that is passed to it
function Sanitized(props) {
  return (
    <SanitizedHTML
      allowedTags={["a", "p", "strong", "u", "ol", "li", "em", "s", "span",
        "math", "annotation", "semantics", "mtext", "mn", "mo", "mi", "mspace",
        "mover", "munder", "munderover", "msup", "msub", "msubup", "mfrac",
        "mroot", "msqrt", "mtable", "mtr", "mtd", "mlabeledtr", "mrow", "menclose",
        "mstyle", "mpadded", "mphantom", "mglyph", "svg", "line", "path"]}
      allowedAttributes={{a: ["href"]}}
      allowedClasses={{
        a: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        p: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        strong: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        u: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        ol: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        li: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        em: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        s: ["ql-size-huge", "ql-size-large", "ql-size-small"],
        span: ["ql-size-huge", "ql-size-large", "ql-size-small",
          "katex", "mord", "mathnormal", "mtight", "pstrut", "vlist-r", "vlist-t", "base"]
      }}
      html={props.html}
    />
  );
}
export default Sanitized;

Sanitized.propTypes = {
  html: PropTypes.any.isRequired
};

