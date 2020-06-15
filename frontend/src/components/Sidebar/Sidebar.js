import React, {useState, useEffect, useRef, Fragment} from "react";
import SidebarCollection from "./SidebarCollection";
import {getProfile} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
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
  function fetchData() {
    fetch("/pages/all")
      .then(res => res.json())
      .then(res => res.pages)
      .then(pages => setPages(pages));
  }

  return pages ? (
    < div
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
          <Card bg="dark" border="info" style={{cursor: "pointer"}}>
            <SidebarCollection
              collectionName="Home"
              collectionLink=""
            />
            <SidebarCollection
              collectionName="Subjects"
              collectionLink="subjects"
              collection={pages.subjects}
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
            {role === 4 ? (
              <SidebarCollection
                collectionName="Manage Users"
                collectionLink="manage-users"
              />
            ) : (
              null
            )}
          </Card>

          <Card bg="info" border="dark" as="h5" className="mt-3 p-2 back">
            <NavLink to={`/`} onClick={props.closeSidebar} className="text-center">
              Back to Page
            </NavLink>
          </Card>
        </Col>
      </nav>

    </div >
  ) : <Fragment></Fragment>;

}
export default Sidebar;

Sidebar.propTypes = {
  loginStatusChange: PropTypes.any,
  closeSidebar: PropTypes.any,
  className: PropTypes.any
};
