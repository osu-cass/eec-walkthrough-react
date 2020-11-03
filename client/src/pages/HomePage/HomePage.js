import React, {useEffect, useState, Fragment} from "react";
import {Card, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import ManageSponsors from "./ManageSponsors";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import "./HomePage.css";

// Main application home page
function Home(props) {

  const [pageChange, setPageChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [updated, setUpdated] = useState([]);

  // fetch homepage data based on the users role
  // more information is shown to internal users
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchHome() {
      try {
        setLoading(true);

        // Fetch all recently updated pages
        let results = await fetch(`${API_URL}/pages/updates`, {
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
          setUpdated(obj.pages);

        } else {
          console.error("Error fetching home page info");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch all sponsors
        results = await fetch(`${API_URL}/home/sponsors`, {
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
          setSponsors(obj.sponsors);

        } else {
          console.error("Error fetching sponsors");
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

    // fixes a bug where fetchHome would sometimes get called twice
    if (typeof props.loginStatusChange === "boolean") {
      fetchHome();
    }

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [props.loginStatusChange, pageChange]);

  return (
    <Fragment>
      <LoadingOverlay loading={loading} />

      <div className="banner-container">
        {/* Image shown at the top of the page */}
        <img className="home-banner" src="home.jpg" alt="Brewery equipment" />

        {/* Text box inside banner image */}
        <div className="banner-image-text px-3 py-3">
          <span>
            Find opportunities<br />to improve industrial<br />efficiency
          </span>
        </div>

        {/* Small colored stripe at the bottom of image */}
        <div className="banner-footer" />
      </div>



      <div className="container home-page-container">



        {/*
        <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
          <div className="row mx-2">
            <div className="col px-0">
              <h2 className="font-weight-bold">{page.mainHeader}</h2>
            </div>
          </div>
          <div className="row">
            <ManageSponsors
              handlePageEdit={() => setPageChange(!pageChange)}
              loginStatusChange={props.loginStatusChange}
              sponsors={sponsors}
            />
          </div>
        </div>
        */}

      </div>
    </Fragment>
  );
}
export default Home;

Home.propTypes = {
  loginStatusChange: PropTypes.bool
};
