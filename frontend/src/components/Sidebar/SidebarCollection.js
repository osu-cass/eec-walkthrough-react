import React, {Fragment} from "react";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";
import CreatePage from "./CreatePage";
import EditCategory from "./EditCategory";
import "./SidebarCollection.css";

// a group of links that can be expanded or hidden on the sidebar
function SidebarCollection(props) {
  return (
    <Accordion>
      {/* If no collection passed in, make singular link */}
      {props.collection ? (
        <Fragment>
          {props.role >= 3 || props.collection.length ? (
            <Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{fontSize: "1.2rem"}} eventKey="0">
              <span>
                {props.collectionName}
                {props.internal ? (
                  <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
                ) : (
                  null
                )}
              </span>
            </Accordion.Toggle>
          ) : (
            null
          )}
        </Fragment>
      ) : (
        <Fragment>
          {props.externalLink ? (
            <a className="page-sidebar-nav-link" href={props.externalLink}>
              <Accordion.Toggle
                as={Card.Header}
                id="sidebarCollection"
                style={{fontSize: "1.2rem"}}
                eventKey="0"
              >
                {props.collectionName}
              </Accordion.Toggle>
            </a>
          ) : (
            <NavLink className="page-sidebar-nav-link" to={`/${props.collectionLink}`}>
              <Accordion.Toggle
                as={Card.Header}
                id="sidebarCollection"
                style={{fontSize: "1.2rem"}}
                eventKey="0"
              >
                {props.collectionName}
              </Accordion.Toggle>
            </NavLink>
          )}
        </Fragment>
      )}
      {props.collection ? (
        <Accordion.Collapse eventKey="0">
          <Fragment>
            {props.collection.map((item, i) => {
              return (
                <NavLink key={i} to={`/${props.collectionLink}/${item.pageId}`} className="ml-3 nav_link">
                  <Card.Body key={item.pageId} style={{fontSize: "1rem"}} className="nav_link">
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
                  </Card.Body>
                </NavLink>
              );
            })}
            {props.show ? (
              <Fragment>
                <CreatePage
                  title={`Create ${props.collectionName} Page`}
                  refresh={props.refresh}
                  role={props.role}
                  categoryId={props.category.categoryId}
                />
                <EditCategory
                  refresh={props.refresh}
                  role={props.role}
                  category={props.category}
                />
              </Fragment>
            ) : (
              null
            )}
          </Fragment>
        </Accordion.Collapse>
      ) : (
        null
      )}
    </Accordion>

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
  externalLink: PropTypes.string,
  category: PropTypes.object,
  internal: PropTypes.number,
  show: PropTypes.bool
};

