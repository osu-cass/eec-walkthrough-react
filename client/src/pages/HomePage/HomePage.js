import React, {useEffect, useState, Fragment} from "react";
import PageCard from "./PageCard";
import Sponsor from "./Sponsor";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {NavLink} from "react-router-dom";
import {API_URL, MS_PER_MONTH} from "../../utilities/constants";
import "./HomePage.css";

// Main application home page
function HomePage(props) {

  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [recent, setRecent] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("");
  const [info, setInfo] = useState([
    {
      title: "",
      text: "",
      icon: ""
    },
    {
      title: "",
      text: "",
      icon: ""
    }
  ]);

  // fetch homepage data
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchHome() {
      try {
        setLoading(true);

        // Fetch homepage banners
        let results = await fetch(`${API_URL}/banners`, {
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

          if (obj.banners.length) {
            setBannerUrl(obj.banners[Math.floor(Math.random() * obj.banners.length)].imageUrl);
          }

        } else {
          console.error("Error fetching home page banner");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch text blurbs
        results = await fetch(`${API_URL}/info`, {
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

          if (obj.info.length >= 2) {
            setInfo(obj.info);
          }

        } else {
          console.error("Error fetching home page info");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch all recently updated pages
        results = await fetch(`${API_URL}/pages/updated`, {
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

          // check if the pages were recently updated
          let isRecent = true;

          // the first page must be no more than one month old
          if (obj.pages.length > 0) {
            const previous = Date.parse(obj.pages[0].created);
            const current = Date.now();
            const elapsed = current - previous;
            if (Math.floor(elapsed / MS_PER_MONTH) > 1) {
              isRecent = false;
            }
          }

          // the second page must be no more than six months old
          if (obj.pages.length > 1) {
            const previous = Date.parse(obj.pages[1].created);
            const current = Date.now();
            const elapsed = current - previous;
            if (Math.floor(elapsed / MS_PER_MONTH) > 6) {
              isRecent = false;
            }
          }

          // the third page must be no more than twelve months old
          if (obj.pages.length > 2) {
            const previous = Date.parse(obj.pages[2].created);
            const current = Date.now();
            const elapsed = current - previous;
            if (Math.floor(elapsed / MS_PER_MONTH) > 12) {
              isRecent = false;
            }
          }

          setRecent(isRecent);
          setUpdated(obj.pages);

        } else {
          console.error("Error fetching home page cards");
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
      { loading ? <LoadingOverlay loading={loading} /> :
        <>
          <div className="banner-container">
            {/* Image shown at the top of the page */}
            <img
              className="home-banner"
              src={bannerUrl}
              onError={(e) => e.target.src = "/missing_home.jpg"}
              alt="Home page banner"
            />

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
                  {info[0].title}
                </h2>
                <span>
                  {info[0].text}
                </span>
                <div className="mt-4">
                  <i className={`fas fa-fw fa-${info[0].icon} fa-3x`} />
                </div>
              </div>
            </div>

            {/* Second text block */}
            <div className="home-content-block home-off col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="home-inner-block">
                <h2>
                  {info[1].title}
                </h2>
                <span>
                  {info[1].text}
                </span>
                <div className="mt-4">
                  <i className={`fas fa-fw fa-${info[1].icon} fa-3x`} />
                </div>
              </div>
            </div>
          </div>

          {/* Recently updated pages */}
          <div className="home-page-list text-center px-4">
            <h2 className="light-home-text">
              {recent ? (
                <span>Recently Updated</span>
              ) : (
                <span>Featured Pages</span>
              )}
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
                  recent={recent}
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
        </> }
    </Fragment>
  );
}
export default HomePage;

HomePage.propTypes = {
  loginStatusChange: PropTypes.bool
};
