import React, {useState, useEffect} from "react";
import {useParams, withRouter, Link} from "react-router-dom";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {formatTime} from "../../utilities/formatTime";
import "./PageList.css";

// lists pages for each section
function PageList() {

  const [category, setCategory] = useState({
    pluralName: "",
    singleName: "",
    description: "",
    internal: 0,
    pages: []
  });
  const [pageLinks, setPageLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams();

  // display loading spinner and gets pages
  useEffect(() => {
    setLoading(true);
    getCategory();
    // eslint-disable-next-line
  }, []);

  // generate page links for each page
  useEffect(() => {

    const linkArray = [];

    for (let i = 0; i < category.pages.length; i++) {

      const url = `/wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${category.pages[i].pageId}`;

      linkArray.push(url);

    }

    setPageLinks(linkArray);

    // remove spinner after finished generating links
    setLoading(false);
    // eslint-disable-next-line
  }, [category]);

  // grabs and returns list of relevant pages
  async function getCategory() {
    const getUrl = `/api/categories/${categoryId}`;
    let obj = [];

    const results = await fetch(getUrl);

    if (results.ok) {

      obj = await results.json();

      setCategory(obj);

    } else {

      if (results.status === 404) {
        setCategory({});
      } else {
        console.error("An internal server error occurred while trying to search for pages. Please try again later.");
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
              <h3 id="title" className="py-4 font-weight-bold">{category.singleName} Pages</h3>
              {category.pages.map((page, index) =>

                <div className="page-info-container card m-5" key={page.pageId}>
                <Link to={pageLinks[index]}>
                  <h5 className="page-link-header font-weight-bold text-left">
                    {page.name}
                  </h5>
                </Link>
                <span className="text-left float-left">
                  {page.description}
                </span>
                <span className="page-link-created text-left float-left">
                    Last updated {formatTime(page.created)}
                </span>
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
            <h3 className="py-5 font-weight-bold">There are no {category.singleName} pages to view.</h3>
          </div>
        </div>
      </div>
    );
  }

}
export default withRouter(PageList);
