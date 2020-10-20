import React, {Fragment} from "react";
import PropTypes from "prop-types";
import CreateCategory from "../Sidebar/CreateCategory";
import "./NavBar.css";

// Dropdown for categories that couldn't fit in the navbar
function NavBarMore (props) {

  return (

    <div
      className="dropdown dropdown-nav d-inline-block"
      id={`more-category-tab`}
    >

      <div className="py-2 px-2 w-100 h-100">
        <span>More...</span>
      </div>

      <div className="dropdown-content">
        {/* Categories */}
        {props.categories.map((category) =>
          <Fragment key={category.categoryId}>
            {!props.visibleTabs[category.categoryId] ? (
              <a href={`/page-list/${category.categoryId}`} >
                <div className="navbar-item px-2 py-1">
                  {category.pluralName}
                  {category.internal ? (
                    <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
                  ) : (
                    null
                  )}
                </div>
              </a>
            ) : (
              null
            )}
          </Fragment>
        )}

        {/* Create category button */}
        <CreateCategory
          navbar={true}
          tinyNav={true}
          refresh={() => props.fetchData()}
          role={props.role}
        />

      </div>

    </div>

  );
}
export default NavBarMore;

NavBarMore.propTypes = {
  role: PropTypes.number,
  categories: PropTypes.array,
  visibleTabs: PropTypes.array,
  fetchData: PropTypes.func
};