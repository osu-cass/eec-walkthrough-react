import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {getProfile} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import CreateCategory from "../Sidebar/CreateCategory";
import NavBarTab from "./NavBarTab";
import NavBarMore from "./NavBarMore";
import "./NavBar.css";

// Navigation bar that appears at the top of the page
function NavBar (props) {

  const [role, setRole] = useState(0);
  const [userId, setUserId] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleTabs, setVisibleTabs] = useState([true]);
  const [tabWidths, setTabWidths] = useState([]);
  const [newCheck, setNewCheck] = useState(false);

  // If our login changes, refresh the navbar and the user's role
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
    setUserId(user.userId);
    fetchData();
  }, [props.loginStatusChange]);

  // fetch all category data
  async function fetchData() {
    const results = await fetch(`${API_URL}/categories/all`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      const obj = await results.json();

      // If there is a category with an id of 0,
      // remove it from the categories and add it to instructions
      let newInstruction = [];
      for (let i = 0; i < obj.categories.length; i++) {
        if (obj.categories[i].categoryId === 0) {
          newInstruction = obj.categories.splice(i, 1);
          newInstruction = newInstruction[0].pages;
        }
      }
      setInstructions(newInstruction.reverse());
      setCategories(obj.categories);
      setTabWidths([]);

      // perform one last resize check after a short time has passed
      setTimeout(() => setNewCheck(true), 50);
    } else {
      console.error("Unable to fetch categories for navbar.");
    }
  }

  // add event listener for screen width changes that checks tabs
  useEffect(() => {
    checkTabs(); // we also want to check when the categories change
    window.addEventListener("resize", checkTabs);
    return () => window.removeEventListener("resize", checkTabs);
    // eslint-disable-next-line
  }, [categories, newCheck]);

  // checks to see which tabs are off screen and record each ones state
  function checkTabs() {
    const visibleArray = initializeVisibleTabsArray(categories);
    const widthArray = tabWidths;

    // check if the create category tab exists and should be hidden
    const tab = document.getElementById("nav-create-cat");
    if (tab) {
      const bounding = tab.getBoundingClientRect();
      widthArray[0] = bounding.right;
    }
    if (widthArray[0] >= window.innerWidth - 600) {
      visibleArray[0] = false;
    }

    // check if any category tabs exist and should be hidden
    for (let i = 0; i < categories.length; i++) {
      const tab = document.getElementById(`category-tab-${categories[i].categoryId}`);
      if (tab) {
        const bounding = tab.getBoundingClientRect();
        widthArray[categories[i].categoryId] = bounding.right;
      }
      if (widthArray[categories[i].categoryId] >= window.innerWidth - 600) {
        visibleArray[categories[i].categoryId] = false;
      }
    }

    setTabWidths(widthArray);
    setVisibleTabs(visibleArray);
  }

  // given categories, return an array with all possible categories set to true
  function initializeVisibleTabsArray(newCategories) {
    const visible = [true];
    for (let i = 0; i < newCategories.length; i++) {
      visible[newCategories[i].categoryId] = true;
    }
    return visible;
  }

  return (
    <div className="nav-bar-main px-4 d-print-none">

      {/* Button that links to homepage */}
      <a href="/">
        <div className="dropdown dropdown-nav mild-tab py-2 px-2 d-inline-block">
          Home
        </div>
      </a>

      {/* Dropdown for instructions on how to use the site */}
      {instructions.length ? (
        <div className="dropdown-nav dropdown mild-tab d-inline-block">
          <div className="py-2 px-2 w-100 h-100">
            <span>Help</span>
          </div>
          <div className="dropdown-content">
            {instructions.map((page) =>
              <a href={`/wiki/instructions/${page.pageId}`} key={page.pageId}>
                <div className="navbar-item px-2 py-1">
                  {page.name}
                </div>
              </a>
            )}
            <a href="/disclaimer">
              <div className="navbar-item px-2 py-1">
                Disclaimer
              </div>
            </a>
          </div>
        </div>
      ) : (
        null
      )}

      {/* All internal tool pages */}
      {role >= 2 ? (
        <div className="dropdown-nav dropdown mild-tab d-inline-block">
          <div className="py-2 px-2 w-100 h-100">
            <span>Tools</span>
          </div>
          <div className="dropdown-content">

            {role === 3 || role === 4 ? (
              <a href={`/manage-images/${userId}`}>
                <div className="navbar-item px-2 py-1">
                    Manage Images
                </div>
              </a>
            ) : (
              null
            )}

            {role >= 5 ? (
              <Fragment>
                <a href="/manage-card-titles">
                  <div className="navbar-item px-2 py-1">
                      Manage Card Titles
                  </div>
                </a>

                <a href="/manage-contributors">
                  <div className="navbar-item px-2 py-1">
                    Manage Contributors
                  </div>
                </a>

                <a href="/manage-home">
                  <div className="navbar-item px-2 py-1">
                    Manage Home
                  </div>
                </a>

                <a href="/manage-icons">
                  <div className="navbar-item px-2 py-1">
                    Manage Icons
                  </div>
                </a>

                <a href="/manage-uploads">
                  <div className="navbar-item px-2 py-1">
                    Manage Images
                  </div>
                </a>

                <a href="/manage-links">
                  <div className="navbar-item px-2 py-1">
                    Manage Links
                  </div>
                </a>

                <a href="/manage-users">
                  <div className="navbar-item px-2 py-1">
                    Manage Users
                  </div>
                </a>
              </Fragment>
            ) : (
              null
            )}


            <a href="/history-report">
              <div className="navbar-item px-2 py-1">
                History Report
              </div>
            </a>

            {role >= 3 ? (
              <a href="/publish-requests">
                <div className="navbar-item px-2 py-1">
                  Publish Requests
                </div>
              </a>
            ) : (
              null
            )}

          </div>
        </div>
      ) : (
        null
      )}

      {/* Each category gets its own dropdown */}
      {categories.map((category) =>
        <Fragment key={category.categoryId}>
          {category.pages.length || role >= 3 ? (
            <NavBarTab
              role={role}
              category={category}
              fetchData={() => fetchData()}
              visibleTabs={visibleTabs}
              subTab={false}
            />
          ) : (
            null
          )}
        </Fragment>
      )}

      {/* Button for creating new categories or more button */}
      {role >= 5 ? (

        <Fragment>
          {/* Admins care about the location of the create category tab */}
          {visibleTabs[0] ? (
            <CreateCategory
              navbar={true}
              refresh={() => fetchData()}
              role={role}
            />
          ) : (
            <NavBarMore
              categories={categories}
              visibleTabs={visibleTabs}
              refresh={() => fetchData()}
              role={role}
            />
          )}
        </Fragment>

      ) : (

        <Fragment>
          {/* If we are not an admin ignore the create category tab */}
          {visibleTabs[visibleTabs.length - 1] ? (
            null
          ) : (
            <NavBarMore
              categories={categories}
              visibleTabs={visibleTabs}
              refresh={() => fetchData()}
              role={role}
            />
          )}
        </Fragment>

      )}

    </div>
  );
}
export default NavBar;

NavBar.propTypes = {
  loginStatusChange: PropTypes.bool
};