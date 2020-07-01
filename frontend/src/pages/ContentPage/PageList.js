import React, {useState, useEffect} from "react";
import {useParams, withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./PageList.css";

// search results for a page search
function PageList() {

  const {pageName} = useParams();
  const [pages, setPages] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPage();
  }, []);

  // generate page links for each page
  useEffect(() => {

    const linkArray = [];

    for (let i = 0; i < pages.length; i++) {

      let url = "";
      if (pages[i].pageType) {
        url = `/industries/${pages[i].pageId}`;
      } else {
        url = `/subjects/${pages[i].pageId}`;
      }

      linkArray.push(url);

    }

    setPageLinks(linkArray);
    setLoading(false);

  }, [pages]);

  async function getPage() {
    const page = pageName;
    const getUrl = "/pages/all";
    let obj = [];

    const results = await fetch(getUrl);

    if (results.ok) {

      obj = await results.json();

      if (page === "subjects") {
        setPages(obj.pages.subjects);
      } else if (page === "industries") {
        setPages(obj.pages.industries);
      } else {
        setPages([]);
      }

    } else {

      if (results.status === 404) {
        setPages([]);
      } else {
        console.error("An internal server error occurred while trying to search for a page. Please try again later.");
      }

    }
  }

  if (pageLinks.length) {
    return (
      <div className="container">
        <LoadingOverlay loading={loading} />
        <div className="content-container mb-5">
          <div className="prompt-container bg-white card rounded shadow-sm">
            <div className="page-search-inner-container m-5">
              {pages.map((page, index) =>

                <div className="page-info-container card m-5" key={page.pageId + "a"}>
                  <Link to={pageLinks[index]}>
                    <h5 className="page-link-header font-weight-bold text-left" key={page.pageId + "b"}>
                      {page.name}
                    </h5>
                  </Link>
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <LoadingOverlay loading={loading} />
        <div className="content-container mb-5">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-5 font-weight-bold">No results found for &quot;{pageName}&quot;.</h3>
          </div>
        </div>
      </div>
    );
  }

}
export default withRouter(PageList);

PageList.propTypes = {
  searchText: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.object,
  pages: PropTypes.array,
  cursor: PropTypes.object,
  onLoadMore: PropTypes.func,
  onLoading: PropTypes.func
};
