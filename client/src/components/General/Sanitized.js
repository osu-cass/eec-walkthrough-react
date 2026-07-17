import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "./Sanitized.css";


// DOMPurify configuration objects for allowed classes and styles
const allowedClasses = {
  a: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  p: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  strong: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  u: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  ol: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  li: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  em: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  s: ["ql-size-huge", "ql-size-large", "ql-size-small"],
  span: [
    "katex", "katex-mathml", "katex-html", "ql-size-huge", "ql-size-large", "ql-size-small",
    "ql-formula", "strut", "mspace", "mord", "mathnormal", "mtight", "pstrut", "vlist",
    "vlist-r", "vlist-r2", "vlist-t", "vlist-t2", "vlist-s", "vlist-s2", "msupsub", "base",
    "accentunder", "accent-body", "svg-align", "accent", "overline-line", "underline-line",
    "frac-line", "underline", "overline", "stretchy", "halfarrow-left", "halfarrow-right",
    "arrow-left", "arrow-right", "brace-left", "brace-right", "brace-center", "mopen",
    "mfrac", "nulldelimiter", "delimcenter", "delimsizing", "sizing", "size1", "size2",
    "size3", "size4", "size5", "size6", "size7", "size8", "size9", "reset-size1",
    "reset-size2", "reset-size3", "reset-size4", "reset-size5", "reset-size6", "reset-size7",
    "reset-size8", "reset-size9", "mop", "op-symbol", "small-op", "mtable", "col-align-c",
    "col-align-r", "col-align-l", "arraycolsep", "mbin", "mspace", "mrel", "vertical-separator",
    "horizontal-separator", "hdashline", "vdashline", "hline", "vline", "mathit", "text",
    "mathbb", "mover", "sout", "munder", "vbox", "thinbox", "rlap", "inner", "fix",
    "boxpad", "mclose", "fbox", "op-limits",
    // katex >= 0.16 renamed/added layout classes; keep the old names above for
    // content stored while katex 0.12 was in use
    "katex-base", "katex-strut", "katex-sizing", "katex-overline", "katex-underline",
    "katex-accent", "katex-overlay", "sqrt", "hide-tail", "minner", ""
  ]
};

const allowedStyles = {
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
};

const config = {
  ADD_TAGS: [
    "math","annotation","semantics","mtext","mn","mo","mi","mspace","mover","munder","munderover",
    "msup","msub","msubup","mfrac","mroot","msqrt","mtable","mtr","mtd","mlabeledtr","mrow",
    "menclose","mstyle","mpadded","mphantom","mglyph","svg","line","path","span","s"
  ],
  ADD_ATTR: [
    "stretchy","notation","x1","y1","x2","y2","stroke-width","encoding","accentunder","accent",
    "width","height","viewBox","preserveAspectRatio","d","row","rowspacing","rowalign","rowlines",
    "column","columnspacing","columnalign","columnlines","spacing","scriptlevel","displaystyle",
    "style","data-value","contenteditable","aria-hidden","href"
  ],
  ALLOWED_URI_REGEXP: /^https?:/i,
}

// DOMPurify hook for post-sanitization class and style cleanup
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  const tagName = node.tagName.toLowerCase();
  
  // Filter out classes
  if (allowedClasses[tagName]) {
    const classList = node.classList;
    // Iterate backwards to remove safely while looping
    for (let i = classList.length - 1; i >= 0; i--) {
      const className = classList[i];
      if (!allowedClasses[tagName].includes(className)) {
        classList.remove(className);
      }
    }
    // If no classes remain, standard DOMPurify might leave an empty class attribute.
    if (classList.length === 0) {
      node.removeAttribute('class');
    }
  } else {
    // If the tag is not in our allowedClasses list at all, strip all classes
    node.removeAttribute('class');
  }

  // Filter out styles
  if (allowedStyles[tagName]) {
    const style = node.style;
    // Iterate over all style properties defined on the element
    for (let i = style.length - 1; i >= 0; i--) {
      const propName = style[i];
      const propValue = style.getPropertyValue(propName);
      
      const allowedRegexes = allowedStyles[tagName][propName];
      
      // If no rules for this property, or value doesn't match any regex, remove it
      if (!allowedRegexes || !allowedRegexes.some(regex => regex.test(propValue))) {
        style.removeProperty(propName);
      }
    }
    // Remove empty style attribute
    if (style.length === 0) {
      node.removeAttribute('style');
    }
  } else {
    // If tag not allowed to have styles, strip them
    node.removeAttribute('style');
  }
})

// Sanitizes the HTML that is passed to it
function Sanitized(props) {

  let clean = props.html;

  // Don't allow rich text to be wrapped in block elements. Should be inline.
  if (clean.startsWith("<p>")) {
    clean = clean.slice(3, clean.length - 4);
  }
  
  clean = DOMPurify.sanitize(clean, config);

  return (
    <span dangerouslySetInnerHTML={{__html: clean}} className={props.inline ? "sanitized-inline-text" : "sanitized-text"}/>
  );
}
export default Sanitized;

Sanitized.propTypes = {
  html: PropTypes.any.isRequired,
  inline: PropTypes.bool
};