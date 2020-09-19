import React, {useState, useEffect, useRef, Fragment} from "react";
import SidebarCollection from "./SidebarCollection";
import SidebarToggleView from "./SidebarToggleView";
import Instructions from "./Instructions";
import {getProfile} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import CreateCategory from "./CreateCategory";
import CreatePage from "./CreatePage";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./Sidebar.css";

// sidebar that can be expanded and hidden
function Sidebar(props) {

  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [role, setRole] = useState(0);
  const [showEdit, setShowEdit] = useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // check user info and which categories to display when login status changes
  useEffect(() => {
    // check user role to see what we should render
    const user = getProfile();
    setRole(user.role);
    fetchData();
  }, [props.loginStatusChange, props.pageEdit]);

  // load local storage data to see if we should show editor buttons
  useEffect(() => {
    const editMode = window.localStorage.getItem("showEditButtons");
    if (editMode === "false") {
      setShowEdit(false);
    } else {
      setShowEdit(true);
    }
  }, []);

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

  // fetch all category data
  async function fetchData() {
    const results = await fetch(`${API_URL}/categories/all`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      const obj = await results.json();

      // if there is a category with an id of 0,
      // remove it from the categories and add it to instructions
      let newInstruction = [];
      for (let i = 0; i < obj.categories.length; i++) {
        if (obj.categories[i].categoryId === 0) {
          newInstruction = obj.categories.splice(i, 1);
        }
      }
      setInstructions(newInstruction);
      setCategories(obj.categories);
    } else {
      console.error("Unable to fetch categories for sidebar.");
    }
  }

  // toggles between showing or hiding the edit/create buttons
  function handleToggleEditorButtons() {
    const editString = (!showEdit).toString(10);
    window.localStorage.setItem("showEditButtons", editString);
    setShowEdit(!showEdit);
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

          {instructions.length ? (
            <Fragment>
              {instructions[0].pages.length ? (
                <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
                  <Instructions
                    instructions={instructions[0].pages}
                  />
                </Card>
              ) : (
                null
              )}
            </Fragment>
          ) : (
            null
          )}

          {showEdit ? (
            <div className="mb-4">
              <CreatePage
                title={"Create Instructions Page"}
                collectionLink={"wiki/instructions"}
                refresh={() => fetchData()}
                role={role}
                categoryId={0}
              />
            </div>
          ) : (
            null
          )}

          <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
            {categories.map((category) =>
              <SidebarCollection
                key={category.categoryId}
                collectionName={category.pluralName}
                collectionLink={`wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}`}
                collection={category.pages}
                category={category}
                internal={category.internal}
                refresh={() => fetchData()}
                show={showEdit}
                role={role}
              />
            )}
          </Card>

          {showEdit ? (
            <div className="mb-4">
              <CreateCategory
                refresh={() => fetchData()}
                role={role}
              />
            </div>
          ) : (
            null
          )}

          {role >= 2 ? (
            <Card className="sidebar-page-container mb-4" bg="dark" border="info" style={{cursor: "pointer"}}>
              {role >= 4 ? (
                <Fragment>
                  <SidebarCollection
                    collectionName="Manage Card Titles"
                    collectionLink="manage-card-titles"
                  />
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
                </Fragment>
              ) : (
                null
              )}
              <SidebarCollection
                collectionName="History Report"
                collectionLink="history-report"
              />
              {role >= 3 ? (
                <Fragment>
                  <SidebarCollection
                    collectionName="Publish Requests"
                    collectionLink="publish-requests"
                  />
                  <SidebarToggleView
                    show={showEdit}
                    onToggleEditorButtons={() => handleToggleEditorButtons()}
                  />
                </Fragment>
              ) : (
                null
              )}
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
