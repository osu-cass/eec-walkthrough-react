import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";

// Sanitizes the HTML that is passed to it
function Sanitized(props) {

  const clean = sanitizeHtml(props.html, {
    parser: {
      lowerCaseAttributeNames: false,
    },
    allowedTags: [
      "a",
      "p",
      "strong",
      "u",
      "ol",
      "li",
      "ul",
      "em",
      "s",
      "span",
      "math",
      "annotation",
      "semantics",
      "mtext",
      "mn",
      "mo",
      "mi",
      "mspace",
      "mover",
      "munder",
      "munderover",
      "msup",
      "msub",
      "msubup",
      "mfrac",
      "mroot",
      "msqrt",
      "mtable",
      "mtr",
      "mtd",
      "mlabeledtr",
      "mrow",
      "menclose",
      "mstyle",
      "mpadded",
      "mphantom",
      "mglyph",
      "svg",
      "line",
      "path",
      "menclose"
    ],
    disallowedTagsMode: "discard",
    allowedAttributes: {
      a: [
        "href"
      ],
      mo: [
        "stretchy"
      ],
      menclose: [
        "notation"
      ],
      line: [
        "x1",
        "y1",
        "x2",
        "y2",
        "stroke-width"
      ],
      annotation: [
        "encoding"
      ],
      munder: [
        "accentunder"
      ],
      mover: [
        "accent"
      ],
      svg: [
        "width",
        "height",
        "viewBox",
        "preserveAspectRatio"
      ],
      path: [
        "d"
      ],
      mtable: [
        "row",
        "rowspacing",
        "rowalign",
        "rowlines",
        "column",
        "columnspacing",
        "columnalign",
        "columnlines",
        "spacing"
      ],
      mstyle: [
        "scriptlevel",
        "displaystyle"
      ],
      span: [
        "style",
        "data-value",
        "contenteditable",
        "aria-hidden"
      ]
    },
    allowedSchemes: [
      "http",
      "https"
    ],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [
      "href",
      "src",
      "cite"
    ],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
    allowedClasses: {
      a: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      p: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      strong: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      u: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      ol: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      li: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      em: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      s: [
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small"
      ],
      span: [
        "katex",
        "katex-mathml",
        "katex-html",
        "ql-size-huge",
        "ql-size-large",
        "ql-size-small",
        "ql-formula",
        "strut",
        "mspace",
        "mord",
        "mathnormal",
        "mtight",
        "pstrut",
        "vlist",
        "vlist-r",
        "vlist-r2",
        "vlist-t",
        "vlist-t2",
        "vlist-s",
        "vlist-s2",
        "msupsub",
        "base",
        "accentunder",
        "accent-body",
        "svg-align",
        "accent",
        "overline-line",
        "underline-line",
        "frac-line",
        "underline",
        "overline",
        "stretchy",
        "halfarrow-left",
        "halfarrow-right",
        "arrow-left",
        "arrow-right",
        "brace-left",
        "brace-right",
        "brace-center",
        "mopen",
        "mfrac",
        "nulldelimiter",
        "delimcenter",
        "delimsizing",
        "sizing",
        "size1",
        "size2",
        "size3",
        "size4",
        "size5",
        "size6",
        "size7",
        "size8",
        "size9",
        "reset-size1",
        "reset-size2",
        "reset-size3",
        "reset-size4",
        "reset-size5",
        "reset-size6",
        "reset-size7",
        "reset-size8",
        "reset-size9",
        "mop",
        "op-symbol",
        "small-op",
        "mtable",
        "col-align-c",
        "col-align-r",
        "col-align-l",
        "arraycolsep",
        "mbin",
        "mspace",
        "mrel",
        "vertical-separator",
        "horizontal-separator",
        "hdashline",
        "vdashline",
        "hline",
        "vline",
        "mathit",
        "text",
        "mathbb",
        "mover",
        "sout",
        "munder",
        "vbox",
        "thinbox",
        "rlap",
        "inner",
        "fix",
        "boxpad",
        "mclose",
        "fbox",
        "op-limits",
        ""
      ]
    },
    allowedStyles: {
      span: {
        "background-color": [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        "border-bottom-width": [/^-?\d*\.?\d*em$/],
        "border-color": [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        "border-right-style": [/^none$/, /^hidden$/, /^dotted$/, /^dashed$/, /^solid$/, /^double$/, /^groove$/, /^ridge$/, /^inset$/, /^outset$/, /^initial$/, /^inherit$/],
        "border-right-width": [/^-?\d*\.?\d*em$/],
        "border-top-width": [/^-?\d*\.?\d*em$/],
        "border-style": [/^none$/, /^hidden$/, /^dotted$/, /^dashed$/, /^solid$/, /^double$/, /^groove$/, /^ridge$/, /^inset$/, /^outset$/, /^initial$/, /^inherit$/],
        "border-width": [/^-?\d*\.?\d*em$/],
        bottom: [/^-?\d*\.?\d*em$/],
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        height: [/^-?\d*\.?\d*em$/],
        left: [/^-?\d*\.?\d*em$/],
        margin: [/^-?\d*\.?\d*em$/],
        "margin-left": [/^-?\d*\.?\d*em$/],
        "margin-right": [/^-?\d*\.?\d*em$/],
        "margin-top": [/^-?\d*\.?\d*em$/],
        "min-width": [/^-?\d*\.?\d*em$/],
        "padding-left": [/^-?\d*\.?\d*em$/],
        position: [/^static$/, /^relative$/, /^fixed$/, /^absolute$/, /^sticky$/],
        top: [/^-?\d*\.?\d*em$/],
        width: [/^-?\d*\.?\d*em$/],
        "vertical-align": [/^baseline$/, /^text-top$/, /^text-bottom$/, /^sub$/, /^super$/, /^-?\d*\.?\d*em$/]
      }
    }
  });

  return (
    <span dangerouslySetInnerHTML={{__html: clean}} />
  );
}
export default Sanitized;

Sanitized.propTypes = {
  html: PropTypes.any.isRequired
};