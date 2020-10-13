import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {getProfile} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import "./NavBar.css";

// navigation bar that appears at the top of the page
function NavBar (props) {

  const [role, setRole] = useState(0);
  const [userId, setUserId] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [categories, setCategories] = useState([]);

  // if our login changes, refresh the navbar and the user's role
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

      // if there is a category with an id of 0,
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
      <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
        <a href="/">Home</a>
      </div>

      {/* Dropdown for instructions on how to use the site */}
      {instructions.length ? (
        <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
          <span>Help</span>
          <div className="dropdown-content">
            {instructions.map((page) =>
              <div className="navbar-item px-2 py-1" key={page.pageId}>
                <a href={`/wiki/instructions/${page.pageId}`}>
                  {page.name}
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        null
      )}

      {/* Each category gets its own dropdown */}
      {categories.map((category) =>
        <Fragment key={category.categoryId}>
          {category.pages.length ? (
            <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
              <span>{category.pluralName}</span>
              <div className="dropdown-content">
                {category.pages.map((page) =>
                  <div className="navbar-item px-2 py-1" key={page.pageId}>
                    <a href={`/wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${page.pageId}`}>
                      {page.name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            null
          )}
        </Fragment>
      )}

      {/* All internal tool pages */}
      {role >= 2 ? (
        <div className="dropdown dropdown-nav py-2 px-2 d-inline-block">
          <span>Internal Tools</span>
          <div className="dropdown-content">

            {role === 3 ? (
              <div className="navbar-item px-2 py-1">
                <a href={`/manage-images/${userId}`}>
                  Manage Images
                </a>
              </div>
            ) : (
              null
            )}

            {role >= 4 ? (
              <Fragment>
                <div className="navbar-item px-2 py-1">
                  <a href="/manage-card-titles">
                    Manage Card Titles
                  </a>
                </div>

                <div className="navbar-item px-2 py-1">
                  <a href="/manage-icons">
                    Manage Icons
                  </a>
                </div>

                <div className="navbar-item px-2 py-1">
                  <a href="/manage-uploads">
                    Manage Images
                  </a>
                </div>

                <div className="navbar-item px-2 py-1">
                  <a href="/manage-links">
                    Manage Links
                  </a>
                </div>

                <div className="navbar-item px-2 py-1">
                  <a href="/manage-users">
                    Manage Users
                  </a>
                </div>
              </Fragment>
            ) : (
              null
            )}

            <div className="navbar-item px-2 py-1">
              <a href="/history-report">
                History Report
              </a>
            </div>

            {role >= 3 ? (
              <div className="navbar-item px-2 py-1">
                <a href="/publish-requests">
                  Publish Requests
                </a>
              </div>
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
        <div className="dropdown-content">
          <div className="navbar-item px-2 py-1">
            <a href="https://eec.oregonstate.edu/">
              OSU Energy Efficiency Center
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
export default NavBar;

NavBar.propTypes = {
  role: PropTypes.number,
  loginStatusChange: PropTypes.bool
};