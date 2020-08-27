import React, {Fragment} from "react";
import PropTypes from "prop-types";

// icon for filtering out non-opportunities at the top level
function ListToggle(props) {
  return props.showToggle ? (
    <Fragment>
        {props.toggled ? (
          <i
            className={`fas fa-fw fa-check-square mx-2`}
            title="Check All"
            onClick={() => props.toggleList()}
          />
        ) : (
          <i
            className={`fas fa-fw fa-square mx-2`}
            title="Uncheck All"
            onClick={() => props.toggleList()}
          />
        )}
    </Fragment>
  ) : (
    null
  );
}
export default ListToggle;

ListToggle.propTypes = {
  showToggle: PropTypes.bool,
  toggled: PropTypes.number,
  toggleList: PropTypes.func
};
