import React, {useState, useEffect} from "react";
import {useParams, withRouter, Link} from "react-router-dom";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./PageList.css";

// lists pages for each section
function PageList() {

  const {pageName} = useParams();
  const [pages, setPages] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // display loading spinner and gets pages
  useEffect(() => {
    setLoading(true);
    getPage();
    // eslint-disable-next-line
  }, []);

  // generate page links for each page
  useEffect(() => {

    const linkArray = [];

    for (let i = 0; i < pages.length; i++) {

      let url = "";
      if (pages[i].pageType === 1) {
        url = `/industries/${pages[i].pageId}`;
      } else if (pages[i].pageType === 2) {
        url = `/technologies/${pages[i].pageId}`;
      } else if (pages[i].pageType === 3) {
        url = `/processes/${pages[i].pageId}`;
      } else if (pages[i].pageType === 4) {
        url = `/productivity/${pages[i].pageId}`;
      } else {
        url = `/assessments/${pages[i].pageId}`;
      }

      linkArray.push(url);

    }

    setPageLinks(linkArray);

    // remove spinner after finished generating links
    setLoading(false);
    // eslint-disable-next-line
  }, [pages]);

  // grabs and returns list of relevant pages
  async function getPage() {
    const page = pageName;
    const getUrl = "/pages/all";
    let obj = [];

    const results = await fetch(getUrl);

    if (results.ok) {

      obj = await results.json();

      if (page === "industry") {
        setPages(obj.pages.industries);
      } else if (page === "technology") {
        setPages(obj.pages.technologies);
      } else if (page === "process") {
        setPages(obj.pages.processes);
      } else if (page === "productivity") {
        setPages(obj.pages.productivity);
      } else if (page === "assessment") {
        setPages(obj.pages.assessments);
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
              <h3 id="title" className="py-4 font-weight-bold">{pageName} Pages</h3>
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
            <h3 className="py-5 font-weight-bold">There are no {pageName} pages to view.</h3>
          </div>
        </div>
      </div>
    );
  }

}
export default withRouter(PageList);
