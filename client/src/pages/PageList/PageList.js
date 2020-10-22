import React, {useState, useEffect} from "react";
import {useParams, withRouter, Link} from "react-router-dom";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Image from "../../components/General/Image";
import {formatTime} from "../../utilities/formatTime";
import {API_URL} from "../../utilities/constants";
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

  // when the page first loads get a list of all of the pages for this category
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    // grabs and returns list of relevant pages
    async function getCategory() {
      try {

        setLoading(true);

        const results = await fetch(`${API_URL}/categories/${categoryId}`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();

          setCategory(obj);

        } else {

          if (results.status === 404) {
            setCategory({pages: []});
          } else {
            console.error("An internal server error occurred while trying to search for pages. Please try again later.");
          }

        }

        setLoading(false);

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    getCategory();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [categoryId]);

  // generate page links for each page whenever category data changes
  useEffect(() => {
    const linkArray = [];

    for (let i = 0; i < category.pages.length; i++) {
      const url = `/wiki/${category.pluralName.replace(/\s+/g, "-").toLowerCase()}/${category.pages[i].pageId}`;
      linkArray.push(url);
    }

    setPageLinks(linkArray);
  }, [category]);

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
                  <div className="img-result-thumb text-left my-2">
                    <Image
                      url={page.imageUrl}
                      title={page.name}
                      thumbnail={true}
                      header={false}
                    />
                  </div>
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
