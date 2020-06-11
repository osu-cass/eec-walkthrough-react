import React, { Fragment } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from 'react-bootstrap';
import CreatePage from './CreatePage'
import "./SidebarCollection.css";

const SidebarCollection = props => {
  return (
    <Accordion>
      {/* If no collection passed in, make singular link */}
      {props.collection ? (
          <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{ fontSize: "1.2rem" }} eventKey="0">
            {props.collectionName}
          </Accordion.Toggle>
        ) : (
          <NavLink to={`/${props.collectionLink}`}>
            <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{ fontSize: "1.2rem" }} eventKey="0">
              {props.collectionName}
            </Accordion.Toggle>
          </NavLink>
        )
      }
      {props.collection ?
        <Accordion.Collapse eventKey="0">
          <Fragment>
            {props.collection.map((item, i) => {
              return (
                <NavLink key={i} to={`/${props.collectionLink}/${item.pageId}`} className="ml-3 nav_link">
                  <Card.Body key={item.pageId} style={{ fontSize: "1rem" }} className="nav_link">
                    {item.name}
                  </Card.Body>
                </NavLink>
              );
            })}
            <CreatePage
              title={`Create ${props.collectionName} Page`}
              collectionName={props.collectionName}
              refresh={props.refresh}
              role={props.role}
            />
          </Fragment>
        </Accordion.Collapse>
        : ""}
    </Accordion >

  );
}

SidebarCollection.propTypes = {
  collectionName: PropTypes.string,
  collectionLink: PropTypes.string,
  collection: PropTypes.array
};

export default SidebarCollection;
