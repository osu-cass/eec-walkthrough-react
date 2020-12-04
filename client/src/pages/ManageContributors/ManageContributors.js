import React, {useEffect, useState} from "react";
import {Button, Row} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import EditContributor from "./EditContributor";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import ContributorBlock from "../Contributors/ContributorBlock";
import RichTextEditor from "../../components/General/RichTextEditor";
import "./ManageContributors.css";

// page for managing home page text
function ManageContributors() {

  const [ourTeamMessage, setOurTeamMessage] = useState("");
  const [publishContributors, setPublishContributors] = useState([]);
  const [pendingContributors, setPendingContributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageRequests, setErrorMessageRequests] = useState("");

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

        results = await fetch(`${API_URL}/contributors/pending`, {
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
          setPendingContributors(obj.contributors);

        } else {
          console.error("Error fetching pending contributors");
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
    };

    // Edit team info
    const results = await fetch(`${API_URL}/info/3`, {
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

  // approve or reject a contributor request
  async function handleRequest(contributorId, status) {

    // check if the user wants to proceed with the action
    if (status) {
      if (!window.confirm("Are you sure you want to approve this request?\nThis card will become visible to all users.")) {
        return;
      }

      // the user wants to accept the request
      setLoading(true);

      const results = await fetch(`${API_URL}/contributors/pending/${contributorId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
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
          setErrorMessageRequests("An internal server error occurred. Please try again later.");
        } else {
          setErrorMessageRequests(obj.error);
        }
      }

      setLoading(false);

    } else {

      if (!window.confirm("Are you sure you want to reject this request?")) {
        return;
      }

      // the user wants to reject the request
      setLoading(true);

      const results = await fetch(`${API_URL}/contributors/pending/${contributorId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
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
          setErrorMessageRequests("An internal server error occurred. Please try again later.");
        } else {
          setErrorMessageRequests(obj.error);
        }
      }

      setLoading(false);
    }
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
        <span className="mb-4">
          This message is shown at the top of the&nbsp;
          <a href="/contributors">contributors page</a>.
        </span>
        <RichTextEditor
          id={`submit-text-100`}
          value={ourTeamMessage}
          onChange={(text) => setOurTeamMessage(text)}
        />

        {/* Save changes */}
        <div>
          <Row className="mt-4 mb-2">
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

      {/* List all pending contributor requests */}
      {pendingContributors.length ? (
        <div className="prompt-container my-3 p-5 bg-white card rounded shadow-sm">
          <span className="h3 mb-2">
            Pending Contributor Requests
          </span>
          <span>
            This is a list of contributor requests made by users.
          </span>
          <span className="mb-5">
            If you approve a request it will be shown on the&nbsp;
            <a href="/contributors">contributors page</a>.
          </span>

          <div className="contributor-organizer my-4">
            {pendingContributors.map((contributor) =>
              <ContributorBlock
                key={contributor.contributorId}
                name={contributor.name}
                imageUrl={contributor.imageUrl}
                title={contributor.title}
                description={contributor.description}
                contributorId={contributor.contributorId}
                pending={true}
                onRequest={(contributorId, status) => handleRequest(contributorId, status)}
              />
            )}
          </div>

          <Error
            message={errorMessageRequests}
          />

        </div>
      ) : (
        null
      )}

      {/* List all possible contributors */}
      <div className="prompt-container my-3 p-5 bg-white card rounded shadow-sm">
        <span className="h3 mb-2">Possible Contributors</span>
        <span>
          This is a list of all users who have editor privileges.
        </span>
        <span className="mb-5">
          You may edit their contributor information so that it is shown on the&nbsp;
          <a href="/contributors">contributors page</a>.
        </span>

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
                    <div key={request.requestId}>
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
