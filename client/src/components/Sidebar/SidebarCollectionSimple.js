import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Accordion, Card} from "react-bootstrap";
import "./SidebarCollection.css";

// A simple list of links to pages in an expandable container
function SidebarCollection(props) {
  return (
    <Accordion>

      {/* Collection title */}
      <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
        <span>
          {props.collectionName}
        </span>
      </Accordion.Toggle>

      {/* Collection links */}
      <Accordion.Collapse eventKey="0">
        <Fragment>
          {props.collection.map((item, i) =>
            <a key={i} href={item.link} className="ml-3 nav_link">
              <Card.Body style={{fontSize: "1rem"}} className="nav_link">
                <span>
                  {item.name}
                </span>
              </Card.Body>
            </a>
          )}
        </Fragment>
      </Accordion.Collapse>

    </Accordion>
  );
}
export default SidebarCollection;

SidebarCollection.propTypes = {
  collectionName: PropTypes.string,
  collection: PropTypes.array
};

