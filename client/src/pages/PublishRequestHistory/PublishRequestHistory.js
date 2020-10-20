import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {NavLink} from "react-router-dom";
import {logout} from "../../utilities/cookieAuth";
import {formatTime} from "../../utilities/formatTime";
import {API_URL} from "../../utilities/constants";
import {Button} from "react-bootstrap";
import "./PublishRequestHistory.css";

// page for viewing closed publish requests
function PublishRequestHistory() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // when the page first loads, get all of the pending publish requests
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchRequests() {
      try {

        setLoading(true);

        // Fetch all requests
        const results = await fetch(`${API_URL}/requests/status/2`, {
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
          setRequests(obj.requests);

        } else {

          // if the user is performing an unauthorized action
          // log them out and return them to the homepage
          if (results.status === 401) {
            logout();
            window.location.href = "/";
          } else {
            console.error("Error fetching requests list");
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

    fetchRequests();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);


  return (
    <div className="container request-page-container mb-5">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row w-100 mx-2">

          {/* Page title */}
          <div className="col-auto">
            <h4 className="flex-grow-1 font-weight-bold">
              Publish Request History
            </h4>
          </div>

          <div className="col px-0">
            <div className="btn-group align-self-center float-right">

              {/* Link to request history listing */}
              <div className="text-center mx-2 pull-right">
                <NavLink to="/publish-requests">
                  <Button variant="dark">
                    <i
                      className="fas fa-fw fa-book text-white mr-2"
                      style={{transform: "scale(1.5)"}}
                    />
                    <span className="text-white">View Pending Requests</span>
                  </Button>
                </NavLink>
              </div>

            </div>
          </div>

        </div>

      </div>

      {requests.length ? (
        <Fragment>
          <table className="request-table shadow mb-5">
            <thead>
              <tr>
                <th className="pl-4" style={{width: "25%"}}>
                  Created
                </th>
                <th style={{width: "35%"}}>
                  Title
                </th>
                <th style={{width: "25%"}}>
                  Username
                </th>
                <th style={{width: "15%"}}>
                  Review
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) =>
                <tr key={request.requestId}>
                  <td className="pl-4 request-data align-top">
                    <span className="request-date">
                      {"Created " + formatTime(request.created)}
                    </span>
                  </td>
                  <td className="request-data align-top">
                    {request.title}
                  </td>
                  <td className="request-data align-top">
                    {request.username}
                  </td>
                  <td className="request-data align-top">
                    <NavLink to={`/publish-requests/${request.requestId}`}>
                      <Button size="sm" variant="info" onClick={() => {}}>
                        <i
                          className="fas fa-fw fa-comment text-white mr-2"
                          style={{transform: "scale(1.5)"}}
                        />
                        <span className="text-white">View Comments</span>
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <div className="table-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-2 font-weight-bold">No requests have been published or closed</h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default PublishRequestHistory;
