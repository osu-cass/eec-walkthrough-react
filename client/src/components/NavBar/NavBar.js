import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {getProfile} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import CreateCategory from "../Sidebar/CreateCategory";
import CreatePage from "../Sidebar/CreatePage";
import "./NavBar.css";

// navigation bar that appears at the top of the page
function NavBar (props) {

  const [role, setRole] = useState(0);
  const [userId, setUserId] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [categories, setCategories] = useState([]);

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
      setInstructions(newInstruction);
      setCategories(obj.categories);
    } else {
      console.error("Unable to fetch categories for navbar.");
    }
  }

  return (
    <div className="nav-bar-main mb-5 px-4">

      {/* Button that links to homepage */}
      <a href="/">
        <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
          Home
        </div>
      </a>

      {/* Dropdown for instructions on how to use the site */}
      {instructions.length ? (
        <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
          <span>Help</span>
          <div className="dropdown-content mt-2">
            {instructions.map((page) =>
              <a href={`/wiki/instructions/${page.pageId}`} key={page.pageId}>
                <div className="navbar-item px-2 py-1">
                    {page.name}
                </div>
              </a>
            )}
          </div>
        </div>
      ) : (
        null
      )}

      {/* All internal tool pages */}
      {role >= 2 ? (
        <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
          <span>Internal Tools</span>
          <div className="dropdown-content mt-2">

            {role === 3 ? (
              <a href={`/manage-images/${userId}`}>
                <div className="navbar-item px-2 py-1">
                    Manage Images
                </div>
              </a>
            ) : (
              null
            )}

            {role >= 4 ? (
              <Fragment>
                <a href="/manage-card-titles">
                  <div className="navbar-item px-2 py-1">
                      Manage Card Titles
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

      {/* External sites */}
      <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
        <span>Related Sites</span>
        <div className="dropdown-content mt-2">

          <a href="https://eec.oregonstate.edu/">
            <div className="navbar-item px-2 py-1">
              OSU Energy Efficiency Center
            </div>
          </a>

        </div>
      </div>

      {/* Each category gets its own dropdown */}
      {categories.map((category) =>
        <Fragment key={category.categoryId}>
          {category.pages.length || role >= 3 ? (

            <div className="dropdown dropdown-nav d-inline-block">
              <a href={`/page-list/${category.categoryId}`}>
                <div className="py-2 px-2 w-100 h-100">
                  <span>{category.pluralName}</span>
                  {category.internal ? (
                    <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
                  ) : (
                    null
                  )}
                </div>
              </a>

              <div className="dropdown-content">
                {/* Pages */}
                {category.pages.map((page) =>
                  <a
                    href={`/wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${page.pageId}`}
                    key={page.pageId}
                  >
                    <div className="navbar-item px-2 py-1">
                        {page.name}
                        {page.approved === 0 ? (
                          <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-wrench fa-sm ml-1" /></span>
                        ) : (
                          null
                        )}
                        {page.internal ? (
                          <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
                        ) : (
                          null
                        )}
                    </div>
                  </a>
                )}

                {/* Create Page Button */}
                <CreatePage
                  navbar={true}
                  title={`Create ${category.pluralName} Page`}
                  collectionLink={`wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}`}
                  refresh={() => fetchData()}
                  role={role}
                  categoryId={category.categoryId}
                />
              </div>

            </div>
          ) : (
            null
          )}
        </Fragment>
      )}

      {/* Button for creating new categories */}
      <CreateCategory
        navbar={true}
        refresh={() => fetchData()}
        role={role}
      />

    </div>
  );
}
export default NavBar;

NavBar.propTypes = {
  role: PropTypes.number,
  loginStatusChange: PropTypes.bool
};