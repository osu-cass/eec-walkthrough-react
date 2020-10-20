import React from "react";
import PropTypes from "prop-types";
import CreatePage from "../Sidebar/CreatePage";
import EditCategory from "../Sidebar/EditCategory";
import "./NavBar.css";

// A single dropdown for a category that appears on the navigation bar
function NavBarTab (props) {

  return (
    props.visibleTabs[props.category.categoryId] ? (
      <div
        className="dropdown dropdown-nav d-inline-block"
        id={`category-tab-${props.category.categoryId}`}
      >
        <a href={`/page-list/${props.category.categoryId}`}>
          <div className="py-2 px-2 w-100 h-100">
            <span>{props.category.pluralName}</span>
            {props.category.internal ? (
              <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
            ) : (
              null
            )}
          </div>
        </a>

        <div className="dropdown-content">
          {/* Pages */}
          {props.category.pages.map((page) =>
            <a
              href={`/wiki/${props.category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${page.pageId}`}
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

          {/* Create page button */}
          <CreatePage
            navbar={true}
            title={`Create ${props.category.pluralName} Page`}
            collectionLink={`wiki/${props.category.pluralName.replace(/\s+/g, "-").toLowerCase()}`}
            refresh={() => props.fetchData()}
            role={props.role}
            categoryId={props.category.categoryId}
          />

          {/* Edit category button */}
          <EditCategory
            navbar={true}
            refresh={() => props.fetchData()}
            role={props.role}
            category={props.category}
          />
        </div>

      </div>
    ) : (
      null
    )
  );
}
export default NavBarTab;

NavBarTab.propTypes = {
  role: PropTypes.number,
  category: PropTypes.object,
  fetchData: PropTypes.func,
  visibleTabs: PropTypes.array
};