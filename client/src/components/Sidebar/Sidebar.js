import React, {useState, useEffect, useRef, Fragment} from "react";
import SidebarCollection from "./SidebarCollection";
import SidebarCollectionSimple from "./SidebarCollectionSimple";
import SidebarToggleView from "./SidebarToggleView";
import {getProfile} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import CreateCategory from "./CreateCategory";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./Sidebar.css";

// sidebar that can be expanded and hidden
function Sidebar(props) {

  const [categories, setCategories] = useState([]);
  const [instructions, setInstructions] = useState({pages: []});
  const [role, setRole] = useState(0);
  const [userId, setUserId] = useState(0);
  const [showEdit, setShowEdit] = useState(true);
  const [tools, setTools] = useState([]);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // change which tools to display based on the users role
  useEffect(() => {
    const toolList = [];

    if (role < 2) {
      setTools([]);
    } else {
      if (role === 3 || role === 4) {
        toolList.push({name: "Manage Images", link: `/manage-images/${userId}`});
      }
      if (role >= 5) {
        toolList.push({name: "Manage Card Titles", link: "/manage-card-titles"});
        toolList.push({name: "Manage Contributors", link: "/manage-contributors"});
        toolList.push({name: "Manage Home", link: "/manage-home"});
        toolList.push({name: "Manage Icons", link: "/manage-icons"});
        toolList.push({name: "Manage Images", link: "/manage-uploads"});
        toolList.push({name: "Manage Links", link: "/manage-links"});
        toolList.push({name: "Manage Users", link: "/manage-users"});
      }
      toolList.push({name: "History Report", link: "/history-report"});
      if (role >= 3) {
        toolList.push({name: "Publish Requests", link: "/publish-requests"});
      }
      setTools(toolList);
    }
  }, [role, userId]);

  // check user info and which categories to display when login status changes
  useEffect(() => {
    // check user role to see what we should render
    const user = getProfile();
    setRole(user.role);
    setUserId(user.userId);
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
          setInstructions(newInstruction[0]);
        }
      }
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
      <nav id="sidebar">
        <Card as="h2" id="sidebar-header">
          <Card.Header>
            Directory
          </Card.Header>
        </Card>

        <Col id="sidebar-body">

          {/* Home */}
          <Card className="sidebar-page-container" bg="dark">
            <SidebarCollection
              collectionName="Home"
              collectionLink=""
              collectionIcon="home"
            />
          </Card>

          {/* Help */}
          {instructions.pages.length ? (
            <Card className="sidebar-page-container" bg="dark">
              <SidebarCollection
                key={instructions.categoryId}
                collectionName="Help"
                collectionLink="wiki/instructions"
                collection={instructions.pages.reverse()}
                category={instructions}
                internal={instructions.internal}
                refresh={() => fetchData()}
                show={showEdit}
                role={role}
                hideEdit={true}
                collectionIcon="question-circle"
              />
            </Card>
          ) : (
            null
          )}

          {/* Tools */}
          {tools.length ? (
            <Card className="sidebar-page-container" bg="dark">
              <SidebarCollectionSimple
                collectionName="Tools"
                collection={tools}
                collectionIcon="briefcase"
              />
            </Card>
          ) : (
            null
          )}

          {/* Categories */}
          {categories.map((category) =>
            <Fragment key={category.categoryId}>
              {category.pages.length ? (
                <Card className="sidebar-page-container" bg="dark">
                  <SidebarCollection
                    collectionName={category.pluralName}
                    collectionLink={`wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}`}
                    collection={category.pages}
                    category={category}
                    internal={category.internal}
                    refresh={() => fetchData()}
                    show={showEdit}
                    role={role}
                    collectionIcon="file-text"
                  />
                </Card>
              ) : (
                null
              )}
            </Fragment>
          )}

          {/* Create Category */}
          {showEdit ? (
            <Card className="sidebar-page-container" bg="dark">
              <CreateCategory
                refresh={() => fetchData()}
                role={role}
              />
            </Card>
          ) : (
            null
          )}

          {/* Hide Extra Buttons */}
          {role >= 3 ? (
            <Card className="sidebar-page-container" bg="dark">
              <SidebarToggleView
                show={showEdit}
                onToggleEditorButtons={() => handleToggleEditorButtons()}
              />
            </Card>
          ) : (
            null
          )}

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
