import React, {Fragment} from "react";
import BulletPoint from "./BulletPoint";
import PropTypes from "prop-types";
import "./BasicItems.css";

// The contents of a standard card
function BasicItems(props) {

  return (
    <div className="item-separator-div">
        {props.items.map((item) =>
          <BulletPoint
            key={item.itemId}
            url={item.contentUrl}
            id={item.itemId}
            icon={item.typeName}
            text={item.contentText}
            label={item.contentLabel}
            created={item.created}
            indentation={item.indentation}
          />
        )}
    </div>
  );

}
export default BasicItems;

BasicItems.propTypes = {
  items: PropTypes.array
};