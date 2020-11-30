import React, {Fragment} from "react";
import Sanitized from "../../../components/General/Sanitized";
import PropTypes from "prop-types";

// Represents a single field of formatted text
function BulletPointText(props) {

  return (
    <Fragment>

      {/* The row holding the item */}
      <div className={`row mx-auto pb-2 ${props.highlightStyle === 1 ? "new-review-item" : ""}
        ${props.internal ? "internal-item" : ""} ${props.highlightStyle === 2 ? "move-review-item" : ""}
        ${props.highlightStyle === 3 ? "old-review-item" : ""} indent-level-${props.indentation} text-no-overflow`}
      >
        <Sanitized html={props.text} />
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
  internal: PropTypes.number
};