import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";

// A group of instruction pages in the sidebar
function Instructions(props) {
  return (
  <Accordion>
    {props.instructions.map((item, i) =>
      <NavLink key={i} to={`/wiki/instructions/${item.pageId}`} className="ml-3 nav_link">
        <Accordion.Toggle as={Card.Header} key={item.pageId} style={{fontSize: "1.2rem"}} eventKey="0" className="nav_link">
          <span>
            {item.name}
            {item.approved === 0 ? (
              <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-wrench fa-sm ml-1" /></span>
            ) : (
              null
            )}
            {item.internal ? (
              <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
            ) : (
              null
            )}
          </span>
        </Accordion.Toggle>
      </NavLink>
    )}
  </Accordion>
  );

}
export default Instructions;

Instructions.propTypes = {
  instructions: PropTypes.array
};

