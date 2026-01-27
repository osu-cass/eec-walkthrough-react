import React, {useState, Fragment} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {Accordion, Card} from "react-bootstrap";
import "./SidebarCollection.css";
import { CustomToggle } from "./SidebarCollection";

// A simple list of links to pages in an expandable container
function SidebarCollection(props) {

  const [active, setActive] = useState(false);

  return (
    <Accordion>

      {/* Collection title */}
      <CustomToggle eventKey="0" className={`sidebarCollection ${active ? "active" : ""}`} onClick={() => setActive(!active)}>
        <span>
          {props.collectionIcon ? (
            <i className={`fas fa-fw fa-${props.collectionIcon} mr-2 my-1`} />
          ) : (
            null
          )}
          {props.collectionName}
          {active ? (
            <span className="pull-right">
              <i className="fas fa-fw fa-caret-down" />
            </span>
          ) : (
            <span className="pull-right">
              <i className="fas fa-fw fa-caret-right" />
            </span>
          )}
        </span>
      </CustomToggle>

      {/* Collection links */}
      <Accordion.Collapse eventKey="0">
        <Fragment>
          {props.collection.map((item, i) =>
            <Fragment key={i}>
              {/* Determine if this is a link to an external or internal page */}
              {item.link[0] === "/" ? (
                <NavLink to={item.link} className="ml-3 sidebar-nav-link">
                  <Card.Body className="sidebar-nav-link">
                    <span>
                      {item.name}
                    </span>
                  </Card.Body>
                </NavLink>
              ) : (
                <a key={i} href={item.link} className="ml-3 sidebar-nav-link">
                  <Card.Body className="sidebar-nav-link">
                    <span>
                      {item.name}
                    </span>
                  </Card.Body>
                </a>
              )}
            </Fragment>
          )}
        </Fragment>
      </Accordion.Collapse>

    </Accordion>
  );
}
export default SidebarCollection;

SidebarCollection.propTypes = {
  collectionName: PropTypes.string,
  collection: PropTypes.array,
  collectionIcon: PropTypes.string
};

