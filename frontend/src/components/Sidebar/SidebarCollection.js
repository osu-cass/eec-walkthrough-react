import React, {Fragment} from "react";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";
import CreatePage from "./CreatePage";
import "./SidebarCollection.css";

function SidebarCollection(props) {
  return (
    <Accordion>
      {/* If no collection passed in, make singular link */}
      {props.collection ? (
        <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
          {props.collectionName}
        </Accordion.Toggle>
      ) : (
        <Fragment>
          {props.externalLink ? (
            <a className="page-sidebar-nav-link" href={props.externalLink}>
              <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
                {props.collectionName}
              </Accordion.Toggle>
            </a>
          ) : (
            <NavLink className="page-sidebar-nav-link" to={`/${props.collectionLink}`}>
              <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
                {props.collectionName}
              </Accordion.Toggle>
            </NavLink>
          )}
        </Fragment>
      )}
      {props.collection ?
        <Accordion.Collapse eventKey="0">
          <Fragment>
            {props.collection.map((item, i) => {
              return (
                <NavLink key={i} to={`/${props.collectionLink}/${item.pageId}`} className="ml-3 nav_link">
                  <Card.Body key={item.pageId} style={{fontSize: "1rem"}} className="nav_link">
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
export default SidebarCollection;

SidebarCollection.propTypes = {
  collectionName: PropTypes.string,
  collectionLink: PropTypes.string,
  collection: PropTypes.array,
  closeSidebar: PropTypes.any,
  className: PropTypes.any,
  closedSidebar: PropTypes.any,
  refresh: PropTypes.any,
  role: PropTypes.any,
  externalLink: PropTypes.string
};

