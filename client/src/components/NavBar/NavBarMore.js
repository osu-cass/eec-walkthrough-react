import React, {Fragment} from "react";
import PropTypes from "prop-types";
import CreateCategory from "../Sidebar/CreateCategory";
import NavBarTab from "./NavBarTab";
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

              <NavBarTab
                role={props.role}
                category={category}
                fetchData={() => props.fetchData()}
                visibleTabs={props.visibleTabs}
                subTab={true}
              />

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