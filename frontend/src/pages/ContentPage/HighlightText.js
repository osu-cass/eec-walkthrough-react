import React, {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import DiffMatchPatch from "diff-match-patch";
import "./HighlightText.css";

// text that highlights itself based on differences between the new and old version
function HighlightText(props) {

  const [newHighText, setNewHighText] = useState([]);
  const [oldHighText, setOldHighText] = useState([]);

  // when the text changes, update the highlighting
  useEffect(() => {

    // save the strings as arrays
    const newTextArray = props.newText.split("");
    const oldTextArray = props.oldText.split("");
    setNewHighText(newTextArray);
    setOldHighText(oldTextArray);

    // highlight the text
    highlight(newTextArray, oldTextArray, props.newMode);

    // eslint-disable-next-line
  }, [props.newText, props.oldText, props.newMode]);

  // sleep for a specific number of milliseconds (replace at a later time)
  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  // gets difference information
  function getDifference(newMode) {
    const dmp = new DiffMatchPatch();
    const diff = dmp.diff_main(props.newText, props.oldText);
    console.log("diff", diff)
    const diffArray = [];
    if (newMode) {
      for (let i = 0; i < diff.length; i++) {
        for (let j = 0; j < diff[i][1].length; j++) {
          if (diff[i][0] === -1) {
            diffArray.push(1);
          } else if (diff[i][0] === 0) {
            diffArray.push(0);
          }
        }
      }
    } else {
      for (let i = 0; i < diff.length; i++) {
        for (let j = 0; j < diff[i][1].length; j++) {
          if (diff[i][0] === 1) {
            diffArray.push(1);
          } else if (diff[i][0] === 0) {
            diffArray.push(0);
          }
        }
      }
    }
    console.log("diffArray", diffArray)
    return diffArray;
  }

  // highlight the text based on the current mode
  async function highlight(newText, oldText, newMode) {
    await sleep(500);
    const diffArray = getDifference(newMode);
    if (newMode) {
      newText.forEach((character, i) => {
        // see if we should highlight the current character
        if (i < diffArray.length && diffArray[i] === 1) {
          const charElement = document.getElementById(`new-highlight-${i}-${props.elementType}`);
          if (charElement !== null) {
            charElement.classList.add("highlight-new-content");
          }
        }
      });
    } else {
      oldText.forEach((character, i) => {
        if (i < diffArray.length && diffArray[i] === 1) {
          const charElement = document.getElementById(`old-highlight-${i}-${props.elementType}`);
          if (charElement !== null) {
            charElement.classList.add("highlight-old-content");
          }
        }
      });
    }
  }

  if (props.elementType === 1) {

    return props.newMode ? (
      <Fragment>
        {newHighText.map((character, i) =>
          <span key={`new-highlight-${i}`} id={`new-highlight-${i}-${props.elementType}`} style={{fontWeight: "bold", fontSize: "xx-large"}}>{character}</span>
        )}
      </Fragment>
    ) : (
      <Fragment>
        {oldHighText.map((character, i) =>
          <span key={`old-highlight-${i}`} id={`old-highlight-${i}-${props.elementType}`} style={{fontWeight: "bold", fontSize: "xx-large"}}>{character}</span>
        )}
      </Fragment>
    )

  } else if (props.elementType === 2) {

    return props.newMode ? (
      <Fragment>
        {newHighText.map((character, i) =>
          <span key={`new-highlight-${i}`} id={`new-highlight-${i}-${props.elementType}`} style={{fontSize: "x-large"}}>{character}</span>
        )}
      </Fragment>
    ) : (
      <Fragment>
        {oldHighText.map((character, i) =>
          <span key={`old-highlight-${i}`} id={`old-highlight-${i}-${props.elementType}`} style={{fontSize: "x-large"}}>{character}</span>
        )}
      </Fragment>
    )

  } else {

    return props.newMode ? (
      <Fragment>
        {newHighText.map((character, i) =>
          <span key={`new-highlight-${i}`} id={`new-highlight-${i}-${props.elementType}`}>{character}</span>
        )}
      </Fragment>
    ) : (
      <Fragment>
        {oldHighText.map((character, i) =>
          <span key={`old-highlight-${i}`} id={`old-highlight-${i}-${props.elementType}`}>{character}</span>
        )}
      </Fragment>
    )

}

}
export default HighlightText;

HighlightText.propTypes = {
  newText: PropTypes.string,
  oldText: PropTypes.string,
  newMode: PropTypes.bool,
  elementType: PropTypes.number
};
