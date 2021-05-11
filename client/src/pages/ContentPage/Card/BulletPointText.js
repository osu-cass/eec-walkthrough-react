import React, {Fragment} from "react";
import Sanitized from "../../../components/General/Sanitized";
import Source from "./Source";
import PropTypes from "prop-types";
import TrainingSelectIcon from "./TrainingSelectIcon";
import CommentIcon from "./CommentIcon";
// Represents a single field of formatted text
function BulletPointText(props) {
  return (
    <Fragment>
      {/* The row holding the item */}
      {/* icon to add to training view */}
      <div style={{display: "flex"}}>

        {props.mode === 3 && (
          <TrainingSelectIcon
            selected={props.selected}
            onSelect={props.onSelect}
          />
        )}
        <div
          className={`row mx-auto ${
            props.highlightStyle === 1 ? "new-review-item" : ""
          }
        ${props.internal ? "internal-item" : ""} ${
      props.highlightStyle === 2 ? "move-review-item" : ""
    }
        ${
    props.highlightStyle === 3 ? "old-review-item" : ""
    } indent-level-text-${props.indentation} text-no-overflow`}
        >

          <div
            className={`${
              props.inline ? "d-inline mr-2" : ""
            } content-td pb-2 col`}
          >
            <span>
              <Sanitized html={props.text} inline={!!props.inline} />
            </span>
            <Source source={props.source} sourceText={props.sourceText} />
          </div>
          {props.selected && (
            <CommentIcon onAnnotationClicked={props.onAnnotationClicked} />
          )}
        </div>
      </div>

    </Fragment>
  );
}
export default BulletPointText;

BulletPointText.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  mode: PropTypes.number,
  indentation: PropTypes.number,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  inline: PropTypes.number,
  source: PropTypes.number,
  sourceText: PropTypes.string,
  onSelect: PropTypes.func,
  onAnnotationClicked: PropTypes.func,
  selected: PropTypes.bool
};
