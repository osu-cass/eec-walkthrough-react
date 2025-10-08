import React from "react";
import {useNavigate, Link} from "react-router-dom";
import PropTypes from "prop-types";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import {formatTime} from "../../utilities/formatTime";
import Image from "../../components/General/Image";
import Sanitized from "../../components/General/Sanitized";
import "./PageSearchResults.css";

// search results for a page search
function PageSearchResults(props) {

  const navigate = useNavigate();

  if (props.pages.length) {
    return (
      <div className="content-container my-5">
        <div className="prompt-container bg-white card rounded shadow-sm">
          <div className="page-search-inner-container m-5">
            <h3 id="title" className="py-4 font-weight-bold">Search Results</h3>
            {props.pages.map((page) =>
              <div className="page-info-container card m-5" key={page.pageId}>
                <div className="img-result-thumb text-left my-2">
                  <Image
                    url={page.imageUrl}
                    title={page.name}
                    thumbnail={true}
                    header={false}
                  />
                </div>
                <Link to={page.url}>
                  <h5 className="page-link-header font-weight-bold text-left">
                    {page.name}
                  </h5>
                </Link>
                <span className="text-left float-left">
                  <Sanitized html={page.description} />
                </span>
                <span className="page-link-created text-left float-left">
                    Last updated {formatTime(page.created)}
                </span>
              </div>

            )}
          </div>
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
      <div className="content-container my-5">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5 font-weight-bold">No results found for &quot;{props.searchText}&quot;.</h3>
        </div>
      </div>
    );
  }

}
export default PageSearchResults;

PageSearchResults.propTypes = {
  searchText: PropTypes.string,
  loading: PropTypes.bool,
  navigate: PropTypes.object,
  pages: PropTypes.array,
  cursor: PropTypes.object,
  onLoadMore: PropTypes.func,
  onLoading: PropTypes.func
};