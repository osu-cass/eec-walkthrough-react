import React, {useEffect, useState} from "react";
import {Button, Row, FormControl} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import EditContributor from "./EditContributor";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import "./ManageContributors.css";

// page for managing home page text
function ManageContributors() {

  const [ourTeamMessage, setOurTeamMessage] = useState("");
  const [publishContributors, setPublishContributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // when the page first loads, get all contributors info
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchContributors() {
      try {

        setLoading(true);

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
            setOurTeamMessage(obj.info[2].text);
          }
        } else {
          console.error("Error fetching info");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        results = await fetch(`${API_URL}/contributors/requests`, {
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
          setPublishContributors(obj.contributors);

        } else {
          console.error("Error fetching contributor requests");
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

    fetchContributors();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // Submit info changes
  async function submitChanges() {

    setLoading(true);

    // Create objects with the new info
    const teamObject = {
      title: "Our Team",
      text: ourTeamMessage,
      icon: ""
    }

    // Edit team info
    let results = await fetch(`${API_URL}/info/3`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(teamObject)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

    } else {

      // there was an error updating the info
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }
    }

    setLoading(false);
  }

  return (
    <div className="container manage-contributor-container my-5">

      <LoadingOverlay loading={loading} />

      {/* Header bar */}
      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Contributors
          </h4>
        </div>
      </div>

      {/* Edit the current team message */}
      <div className="prompt-container my-3 p-5 bg-white card rounded shadow-sm">
        <span className="h3">Our Team Message</span>
        <FormControl
          as="textarea"
          rows="8"
          className="my-3"
          maxLength="5000"
          placeholder="Enter team message"
          defaultValue={ourTeamMessage}
          aria-label="Team text"
          aria-describedby="basic-addon1"
          onChange={(e) => setOurTeamMessage(e.target.value)}
          required
        />

        {/* Save changes */}
        <div>
          <Row className="mb-2">
            <div className="col">
              <Button variant="primary" className="float-right" onClick={() => submitChanges()}>
                Save changes
              </Button>
            </div>
          </Row>
        </div>

        {/* Error messages */}
        <Error
          message={errorMessage}
        />

      </div>

      <div className="prompt-container my-3 p-5 bg-white card rounded shadow-sm">
        <span className="h3 mb-4">Possible Contributors</span>

        {/* List all possible contributors */}
        <div className="contributor-organizer my-4">
          {publishContributors.map((contributor) =>
            <div className="contributor-container" key={contributor.userId}>


              <div className="d-block my-2">
                <div>

                  {/* Contributors name */}
                  <div className="mb-4">
                    {/* Show an accepted icon if the contributor is being show */}
                    {contributor.active ? (
                      <i className="con-icon-approved fas fa-fw fa-check-circle fa-2x" />
                    ) : (
                      null
                    )}
                    <h2 className="mb-0">
                      {contributor.firstName + " " + contributor.lastName}
                    </h2>
                    <span>({contributor.username})</span>
                  </div>

                  {/* List of publish requests made by the contributor */}
                  <h5>Submitted publish requests:</h5>

                  {contributor.requests.length ? (
                    null
                  ) : (
                    <span>None</span>
                  )}

                  {contributor.requests.map((request) =>
                    <div>
                      <a href={`/publish-requests/${request.requestId}`} key={request.requestId}>
                        {request.title}
                      </a>
                    </div>
                  )}

                </div>

                {/* Button for modifying contributor info */}
                <div className="my-3">
                  <EditContributor
                    userId={contributor.userId}
                    name={contributor.name}
                    title={contributor.title}
                    description={contributor.description}
                    imageUrl={contributor.imageUrl}
                    checked={!!contributor.active}
                  />
                </div>

              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
export default ManageContributors;
