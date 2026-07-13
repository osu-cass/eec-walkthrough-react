import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CreatePage from "../Sidebar/CreatePage";
import EditCategory from "../Sidebar/EditCategory";
import "./NavBar.css";

// A single dropdown for a category that appears on the navigation bar
function NavBarTab (props) {

  const [subShow, setSubShow] = useState(false);
  const [categoryGroups, setCategoryGroups] = useState([]);

  // Store category pages in groups of three, so that we can easily make rows
  useEffect(() => {
    const groups = [];
    if (props.category.pages.length) {

      let counter = 0;

      // create a group for each three pages
      for (let i = counter; counter < props.category.pages.length; i++) {
        const newGroup = {
          id: i,
          pages: []
        };
        // save up to three pages into the new group
        for (let i = counter; i < props.category.pages.length && i < counter + 3; i++) {
          newGroup.pages.push(props.category.pages[i]);
        }
        counter += 3;
        groups.push(newGroup);
      }

      setCategoryGroups(groups);

    } else {
      setCategoryGroups([]);
    }
  }, [props.category]);

  return (
    props.visibleTabs[props.category.categoryId] || (props.subTab && !props.visibleTabs[props.category.categoryId]) ? (
      <div
        className={props.subTab ? "navbar-item" : "dropdown-nav dropdown d-inline-block"}
        id={props.subTab ? `more-tab-${props.category.categoryId}` : `category-tab-${props.category.categoryId}`}
        onMouseEnter={() => setSubShow(true)}
        onMouseLeave={() => setSubShow(false)}
      >
        <a className="no-underline" href={`/page-list/${props.category.categoryId}`}>

          {/* expanding arrow symbol */}
          <div className="py-2 px-2 w-100 h-100">
            {props.subTab ? (
              <span className="mr-1"> &#11207; </span>
            ) : (
              null
            )}

            {/* Category title */}
            <span>{props.category.pluralName}</span>

            {/* Internal category icon */}
            {props.category.internal ? (
              <span>&nbsp;<i className="sidebar-icons fas fa-fw fa-unlock-alt fa-sm ml-1" /></span>
            ) : (
              null
            )}
          </div>
        </a>

        {/* Include images if this isn't extended from a 'more' tab */}
        {props.subTab ? (

          <div className={`sub-dropdown-content dropdown-menu-right" ${subShow ? "sub-show" : ""}`} >

            {/* Pages */}
            {props.category.pages.map((page) =>
              <a
                href={`/wiki/${props.category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${page.pageId}`}
                key={page.pageId}
                className="no-underline"
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

        ) : (

          <div className={`dropdown-content dropdown-size-${props.category.pages.length > 3 ? "3" : props.category.pages.length}`} >

            {/* Pages */}
            {categoryGroups.map((row) =>
              <div className="row align-items-end px-0 mx-0" key={row.id}>
                {row.pages.map((page) =>
                  <div className="col dropdown-nav-col px-0 mx-0" key={page.pageId}>
                    <a
                      href={`/wiki/${props.category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${page.pageId}`}
                      className="no-underline"
                    >
                      <div className="navbar-item navbar-image-item text-center pt-auto px-2 py-1">
                        <img src={page.imageUrl} alt={page.name} className="cat-tag-img mb-2" onError={(e) => e.target.src = "/missing.png"} />
                        <br />
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
                  </div>
                )}
              </div>
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

        )}

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
  visibleTabs: PropTypes.array,
  subTab: PropTypes.bool
};