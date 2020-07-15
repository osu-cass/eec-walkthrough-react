import React, {useState, useEffect, useRef, Fragment} from "react";
import SidebarCollection from "./SidebarCollection";
import {getProfile} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./Sidebar.css";

function Sidebar(props) {

  const [pages, setPages] = useState([]);
  const [role, setRole] = useState(0);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // check user info and which pages to display when login status changes
  useEffect(() => {

    // check user role to see what we should render
    const user = getProfile();
    setRole(user.role);
    fetchData();

  }, [props.loginStatusChange]);

  // fetch page data on page edit
  useEffect(() => {
    fetchData();
  }, [props.pageEdit]);

  // check for a click outside of the sidebar
  // if a click is detected, then close the sidebar
  function useOutsideAlerter(ref) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.closeSidebar();
        }
      }

      // bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };

    }, [ref]);
  }

  // fetch all page data
  async function fetchData() {
    const results = await fetch("/pages/all");
    if (results.ok) {
      const obj = await results.json();
      setPages(obj.pages);
    } else {
      console.error("Unable to fetch pages for sidebar.");
    }
  }

  return (
    <div
      className={"wrapper " + props.className}
      ref={wrapperRef}
    >
      {/* Wrapper is created to be able to click outside sidebar to close it */}
      <nav id='sidebar'>
        <Card bg="info" as="h2">
          <Card.Header>
            Directory
          </Card.Header>
        </Card>

        <Col className="mt-3">
          <Card className="sidebar-page-container my-4" bg="dark" border="info" style={{cursor: "pointer"}}>
            <SidebarCollection
              collectionName="Home"
              collectionLink=""
            />
          </Card>

          <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
            <SidebarCollection
              collectionName="Assessments"
              collectionLink="assessments"
              collection={pages.assessments}
              refresh={() => fetchData()}
              role={role}
            />
            <SidebarCollection
              collectionName="Industries"
              collectionLink="industries"
              collection={pages.industries}
              refresh={() => fetchData()}
              role={role}
            />
            <SidebarCollection
              collectionName="Processes"
              collectionLink="processes"
              collection={pages.processes}
              refresh={() => fetchData()}
              role={role}
            />
            <SidebarCollection
              collectionName="Productivity"
              collectionLink="productivity"
              collection={pages.productivity}
              refresh={() => fetchData()}
              role={role}
            />
            <SidebarCollection
              collectionName="Technologies"
              collectionLink="technologies"
              collection={pages.technologies}
              refresh={() => fetchData()}
              role={role}
            />
          </Card>

            {role === 4 ? (
              <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
                <SidebarCollection
                  collectionName="Manage Icons"
                  collectionLink="manage-icons"
                />
                <SidebarCollection
                  collectionName="Manage Links"
                  collectionLink="manage-links"
                />
                <SidebarCollection
                  collectionName="Manage Users"
                  collectionLink="manage-users"
                />
              </Card>
            ) : (
              null
            )}

            <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
              <SidebarCollection
                collectionName="OSU EEC"
                externalLink="https://eec.oregonstate.edu/"
              />
            </Card>
        </Col>
      </nav>
    </div >
  );

}
export default Sidebar;

Sidebar.propTypes = {
  loginStatusChange: PropTypes.any,
  pageEdit: PropTypes.any,
  closeSidebar: PropTypes.any,
  className: PropTypes.any
};
