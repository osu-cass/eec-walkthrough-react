import React, {useState, useEffect} from "react";
import ContributorBlock from "./ContributorBlock";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import "./Contributors.css";

// A list of all of the contributors
function Contributors() {

  const [loading, setLoading] = useState(true);
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
    },
    {
      title: "",
      text: "",
      icon: ""
    }
  ]);
  const [contributors, setContributors] = useState([]);

  // fetch text blurb
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchText() {
      try {
        setLoading(true);

        // Fetch text blurbs
        let results = await fetch(`${API_URL}/info`, {
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

          if (obj.info.length >= 3) {
            setInfo(obj.info);
          }

        } else {
          console.error("Error fetching contributor info");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch contributors
        results = await fetch(`${API_URL}/contributors`, {
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
          setContributors(obj.contributors);

        } else {
          console.error("Error fetching contributors");
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

    fetchText();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  return (
    <div className="container contributor-page-container my-5">
      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Contributors
          </h4>
        </div>
      </div>

      <div className="prompt-container mb-3 py-4 bg-white card rounded shadow-sm">

        {/* General team message */}
        <div className="team-text-box-row row">
          <div className="contributor-content-block">
            <div className="contributor-inner-block">
              <h2>
                {info[2].title}
              </h2>
              <span>
                {info[2].text}
              </span>
            </div>
          </div>
        </div>

        {/* Individual contributors */}
        <div className="contributor-organizer my-4">
          {contributors.map((contributor) =>
            <ContributorBlock
              key={contributor.contributorId}
              name={contributor.name}
              imageUrl={contributor.imageUrl}
              title={contributor.title}
              description={contributor.description}
            />
          )}
        </div>

      </div>

    </div>
  );
}
export default Contributors;
