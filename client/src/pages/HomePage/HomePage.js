import React, {useEffect, useState, Fragment} from "react";
import PageCard from "./PageCard";
import Sponsor from "./Sponsor";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {NavLink} from "react-router-dom";
import {API_URL, EEC_HOMEPAGE} from "../../utilities/constants";
import "./HomePage.css";

// Main application home page
function HomePage(props) {

  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [updated, setUpdated] = useState([]);
  const currentYear = new Date().getFullYear();

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
        let results = await fetch(`${API_URL}/pages/updated`, {
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
  }, [props.loginStatusChange]);

  return (
    <Fragment>
      <LoadingOverlay loading={loading} />

      <div className="banner-container">
        {/* Image shown at the top of the page */}
        <img className="home-banner" src="home.jpg" alt="Brewery equipment" />

        <div className="banner-image-div" >
          {/* Text box inside banner image */}
          <div className="banner-image-text px-3 py-3">
            <span>
              Find opportunities<br />to improve industrial<br />efficiency
            </span>
          </div>

          {/* Button inside banner image */}
          <NavLink className="banner-nav-link" to="/wiki/instructions/64">
            <button className="banner-button" >
              Learn how
            </button>
          </NavLink>
        </div>

        {/* Small colored stripe at the bottom of image */}
        <div className="banner-footer" />
      </div>

      {/* Text Row */}
      <div className="text-box-row row">
        {/* First text block */}
        <div className="home-content-block home-on col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="home-inner-block">
            <h2>
              Our Goal
            </h2>
            <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed vel lacus libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Quisque placerat lobortis nisl, eget volutpat nisl volutpat at. Mauris sit amet sem at magna scelerisque blandit.
            Curabitur odio. Vivamus lacinia sit amet sapien sed posuere. Maecenas vel imperdiet erat.
            </span>
            <div className="mt-4">
              <i className="fas fa-fw fa-trophy fa-3x" />
            </div>
          </div>
        </div>

        {/* Second text block */}
        <div className="home-content-block home-off col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="home-inner-block">
            <h2>
              News
            </h2>
            <span>
            Aenean sodales at sem feugiat dignissim. Aliquam commodo ex vel lectus condimentum egestas.
            Donec eget erat eu felis malesuada sagittis. Etiam ac leo ornare, molestie sem ac, ullamcorper justo.
            Vivamus ac accumsan eros, vitae dapibus erat. Cras suscipit neque ut ipsum aliquam, sed vestibulum nisl auctor.
            </span>
            <div className="mt-4">
              <i className="fas fa-fw fa-newspaper fa-3x" />
            </div>
          </div>
        </div>
      </div>

      {/* Recently updated pages */}
      <div className="home-page-list text-center px-4">
        <h2 className="light-home-text">
          Recently Updated
        </h2>
        <div className="page-card-row row justify-content-center">

          {/* Use individual cards for each page */}
          {updated.map((page) =>
            <PageCard
              key={page.pageId}
              imageUrl={page.imageUrl}
              name={page.name}
              description={page.description}
              updated={page.created}
              pageId={page.pageId}
            />
          )}

        </div>
      </div>

      {/* Sponsors row */}
      <div className="text-box-row row">
        {/* Our Sponsors */}
        <div className="home-content-block home-on col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="home-expanded-inner-block">
            <h2>
              Sponsors
            </h2>

            <div className="my-5">
              {sponsors.map((sponsor) =>
                <Sponsor
                  key={sponsor.sponsorId}
                  name={sponsor.name}
                  imageUrl={sponsor.imageUrl}
                  websiteUrl={sponsor.websiteUrl}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Home Page Footer */}
      <div className="home-footer py-2 px-2">
        <div className="home-footer-div ml-3 mr-5">
          <NavLink className="home-footer-nav-link" to={`/contributors`}>
            Contributors
          </NavLink>
        </div>

        <div className="home-footer-div">
          <a href={EEC_HOMEPAGE}>OSU EEC Homepage</a>
        </div>

        <div className="home-footer-div pull-right">
          {`Copyright ${currentYear} | `}
          <NavLink className="home-footer-nav-link" to={`/disclaimer`}>
          Disclaimer
          </NavLink>
        </div>
      </div>

    </Fragment>
  );
}
export default HomePage;

HomePage.propTypes = {
  loginStatusChange: PropTypes.bool
};
