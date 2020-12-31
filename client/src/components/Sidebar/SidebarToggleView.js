import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";
import "./Sidebar.css";
import "./SidebarCollection.css";

// button for showing or hiding create / edit buttons in the sidebar
function SidebarToggleView(props) {
  return (
    <Accordion onClick={() => props.onToggleEditorButtons()}>
      <Accordion.Toggle as={Card.Header} className="sidebarCollection view-toggle-button" eventKey="0">
        {props.show ? (
          <Fragment>
            <i className={`fas fa-fw fa-eye-slash mr-2 my-1`} />
            <span>
              Hide Create Buttons
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <i className={`fas fa-fw fa-eye mr-2 my-1`} />
            <span>
              Show Create Buttons
            </span>
          </Fragment>
        )}
      </Accordion.Toggle>
    </Accordion>
  );
}
export default SidebarToggleView;

SidebarToggleView.propTypes = {
  onToggleEditorButtons: PropTypes.func,
  show: PropTypes.bool
};