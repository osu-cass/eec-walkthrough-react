import React, {Fragment, useState} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import {Card} from "react-bootstrap";
import CreatePage from "./CreatePage";
import EditCategory from "./EditCategory";
import {EEC_HOMEPAGE} from "../../utilities/constants";
import "./SidebarCollection.css";

// A group of pages that can be expanded or hidden on the sidebar
function SidebarCollection(props) {

  const [active, setActive] = useState(false);

  return (
    <Accordion>
      {/* If no collection passed in, make singular link */}
      {props.collection ? (
        <Fragment>
          {props.role >= 3 || props.collection.length ? (
            <Accordion.Toggle as={Card.Header} className={`sidebarCollection ${active ? "active" : ""}`} onClick={() => setActive(!active)} eventKey="0">
              <span>
                {props.collectionIcon ? (
                  <i className={`fas fa-fw fa-${props.collectionIcon} mr-2 my-1`} />
                ) : (
                  null
                )}
                {props.collectionName}
                {active ? (
                  <span className="pull-right">&#11206;</span>
                ) : (
                  <span className="pull-right">&#11208;</span>
                )}
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
                className="sidebarCollection"
                eventKey="0"
              >
                {props.collectionIcon ? (
                  <i className={`fas fa-fw fa-${props.collectionIcon} mr-2 my-1`} />
                ) : (
                  null
                )}
                {props.collectionName}
              </Accordion.Toggle>
            </a>
          ) : (
            <NavLink className="page-sidebar-nav-link" to={`/${props.collectionLink}`}>
              <Accordion.Toggle
                as={Card.Header}
                className="sidebarCollection"
                eventKey="0"
              >
                {props.collectionIcon ? (
                  <i className={`fas fa-fw fa-${props.collectionIcon} mr-2 my-1`} />
                ) : (
                  null
                )}
                {props.collectionName}
              </Accordion.Toggle>
            </NavLink>
          )}
        </Fragment>
      )}
      {props.collection ? (
        <Accordion.Collapse eventKey="0">
          <Fragment>
            {props.collection.map((item, i) =>
              <NavLink key={i} to={`/${props.collectionLink}/${item.pageId}`} className="ml-3 sidebar-nav-link">
                <Card.Body key={item.pageId} className="sidebar-nav-link">
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
            )}
            {/* If we have extra pages, show it after the rest of the items */}
            {props.extra ? (
              <Fragment>
                <NavLink to="/contributors" className="ml-3 sidebar-nav-link">
                  <Card.Body className="sidebar-nav-link">
                    <span>
                      Contributors
                    </span>
                  </Card.Body>
                </NavLink>

                <NavLink to="/disclaimer" className="ml-3 sidebar-nav-link">
                  <Card.Body className="sidebar-nav-link">
                    <span>
                      Disclaimer
                    </span>
                  </Card.Body>
                </NavLink>

                <a href={EEC_HOMEPAGE} className="ml-3 sidebar-nav-link">
                  <Card.Body className="sidebar-nav-link">
                    <span>
                      OSU EEC Homepage
                    </span>
                  </Card.Body>
                </a>
              </Fragment>
            ) : (
              null
            )}
            {props.show ? (
              <Fragment>
                <CreatePage
                  title={`Create ${props.collectionName} Page`}
                  collectionLink={props.collectionLink}
                  refresh={props.refresh}
                  role={props.role}
                  categoryId={props.category.categoryId}
                />
                {!props.hideEdit ? (
                  <EditCategory
                    refresh={props.refresh}
                    role={props.role}
                    category={props.category}
                  />
                ) : (
                  null
                )}
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
  show: PropTypes.bool,
  hideEdit: PropTypes.bool,
  collectionIcon: PropTypes.string,
  extra: PropTypes.bool
};

