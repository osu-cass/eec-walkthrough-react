import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {NavLink} from "react-router-dom";
import {logout} from "../../utilities/cookieAuth";
import {formatTime} from "../../utilities/formatTime";
import CreateRequest from "./CreateRequest";
import {Button} from "react-bootstrap";
import "./PublishRequests.css";

// page for viewing and creating publish requests
function PublishRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  // fetch request data
  async function fetchRequests() {
    setLoading(true);

    // Fetch all requests
    const results = await fetch(`/api/requests/all`);

    if (results.ok) {

      const obj = await results.json();
      console.log(obj)
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
  }

  return (
    <div className="container request-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Publish Requests
          </h4>
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
                      <Button size="sm" variant="success" onClick={() => {}}>
                        <i
                          className="fas fa-fw fa-stamp text-white mr-2"
                          style={{transform: "scale(1.5)"}}></i>
                        <span className="text-white">Review Request</span>
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <CreateRequest />
        </Fragment>
      ) : (
        <div className="table-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-2 font-weight-bold">No publish requests awaiting review</h3>
            <h5 className="py-1 font-weight-bold">Would you like to create a request?</h5>
            <CreateRequest />
          </div>
        </div>
      )}
    </div>
  );
}
export default PublishRequests;
