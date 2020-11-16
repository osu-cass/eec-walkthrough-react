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
  const [contributors] = useState([
    {
      contributorId: 1,
      imageUrl: "https://placekitten.com/500/500",
      name: "John Doe",
      title: "Energy Efficiency Center Director",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 2,
      imageUrl: "https://placekitten.com/1000/1000",
      name: "Jane Doe",
      title: "Assistant Director",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 3,
      imageUrl: "https://placekitten.com/200/200",
      name: "Alden Cantrell",
      title: "Operations Manager",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 4,
      imageUrl: "https://placekitten.com/250/250",
      name: "John Smith",
      title: "General Employee",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
      contributorId: 5,
      imageUrl: "https://placekitten.com/150/150",
      name: "Jim Doe",
      title: "General Employee",
      description: "Quisque mattis nibh id metus cursus, a porttitor nulla tincidunt. Integer euismod nisi id massa ornare lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
  ]);

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
          const results = await fetch(`${API_URL}/info`, {
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
    <div className="container icon-page-container my-5">
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
