import React, {useEffect, useState} from "react";
import BulletPoint from "./BulletPoint";
import PropTypes from "prop-types";
import "./BasicItems.css";

// The contents of a standard card
function BasicItems(props) {

  const [showChecklistItem, setShowChecklistItem] = useState(true);

  function showChecklist(show) {
    setShowChecklistItem(show);
  }

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
          contentMode={item.contentMode}
          created={item.created}
          indentation={item.indentation}
          mode={props.mode}
          handleTimestamp={(m) => props.handleTimestamp(m, item.approved, item.itemId)}
          toggled={props.toggled}
          showChecklist={(e) => showChecklist(e)}
          showChecklistItem={showChecklistItem}
        />
      )}
    </div>
  );

}
export default BasicItems;

BasicItems.propTypes = {
  handleTimestamp: PropTypes.func,
  items: PropTypes.array,
  mode: PropTypes.number,
  toggled: PropTypes.bool
};
