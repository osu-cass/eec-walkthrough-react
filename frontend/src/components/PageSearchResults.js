import React, {useState, useEffect} from "react";
import {withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import LoadMoreButton from "./LoadMoreButton";
import "./PageSearchResults.css";

// search results for a page search
function PageSearchResults(props) {

  const [pageLinks, setPageLinks] = useState([]);

  // generate page links for each page
  useEffect(() => {

    const linkArray = [];

    for (let i = 0; i < props.pages.length; i++) {

      let url = "";
      if (props.pages[i].pageType) {
        url = `/industries/${props.pages[i].pageId}`;
      } else {
        url = `/subjects/${props.pages[i].pageId}`;
      }

      linkArray.push(url);

    }

    setPageLinks(linkArray);

  }, [props.pages]);

  if (props.pages.length) {
    return (
      <div className="content-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            {props.pages.map((page, index) =>
              <Link to={pageLinks[index]}>
                <div className="page-info-container" key={page.pageId + "a"}>
                  <span key={page.pageId + "b"}>
                    {page.name}
                  </span>
                </div>
              </Link>
            )}
        </div>
        {props.cursor.primary === "null" ? (
          null
        ) : (
          <LoadMoreButton onUpdate={() => props.onLoadMore(props.cursor)}
            loading={props.loading} />
        )}
      </div>
    );
  } else {
    return (
      <div className="content-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5">No results found for "{props.searchText}"</h3>
        </div>
      </div>
    );
  }

}
export default withRouter(PageSearchResults);

PageSearchResults.propTypes = {
  searchText: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.object,
  pages: PropTypes.array,
  cursor: PropTypes.object,
  onLoadMore: PropTypes.func,
  onLoading: PropTypes.func
};