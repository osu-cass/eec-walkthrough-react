import React from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";
import "./Sidebar.css";
import "./SidebarCollection.css";

// button for showing or hiding create / edit buttons in the sidebar
function SidebarToggleView(props) {
  return (
    <Accordion onClick={() => props.onToggleEditorButtons()}>
      <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
        {props.show ? (
          <span>
            Hide Edit Buttons
          </span>
        ) : (
          <span>
            Show Edit Buttons
          </span>
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