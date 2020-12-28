import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import "./QuickLinks.css";

// A single card that is a quick link to all headers on the page
function QuickLinks(props) {

  const [headers, setHeaders] = useState([]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const newHeaders = [...props.headers];

    if (props.references) {
      const newHeader = {
        title: "References",
        headerId: "references",
        approved: 1
      };
      newHeaders.push(newHeader);
    }

    if (props.quiz) {
      const newHeader = {
        title: "Quiz",
        headerId: "quiz",
        approved: 1
      };
      newHeaders.push(newHeader);
    }

    setHeaders(newHeaders);
  }, [props.headers, props.quiz, props.references]);

  // determines if the current object is only internal viewable
  function isInternal(header) {
    if (props.mode === 1 || (props.mode === 2 && props.publishedMode === 0)) {
      if ((header.tempHeaderId && header.tempInternal) || (!header.tempHeaderId && header.internal)) {
        return 1;
      }
    } else {
      if (header.internal) {
        return 1;
      }
    }
    return 0;
  }

  // see if this header should be viewable
  function shouldBeViewable(header) {
    const checkUnviewable1 = !header.approved && props.mode !== 1 && (props.mode !== 2 || props.publishedMode !== 0);
    const checkUnviewable2 = (props.publicMode === 1 && isInternal(header) && props.mode === 0);
    return !checkUnviewable1 && !checkUnviewable2;
  }

  // If there are no headers, don't display this content list
  return (headers.length) ? (
    <div className="quick-link-container">
      <h5 className="font-weight-bold align-bottom">Contents</h5>
      {headers.map((header) =>
        <Fragment key={header.headerId}>
          {shouldBeViewable(header) ? (
            <a href={`#header-${header.headerId}`}>
              <button className="btn btn-info d-print-none mr-2 my-2">
                {header.title}
              </button>
            </a>
          ) : (
            null
          )}
        </Fragment>
      )}
    </div>
  ) : (
    null
  );
}
export default QuickLinks;

QuickLinks.propTypes = {
  headers: PropTypes.array,
  quiz: PropTypes.bool,
  references: PropTypes.bool,
  mode: PropTypes.number,
  publishedMode: PropTypes.number,
  publicMode: PropTypes.number
};
