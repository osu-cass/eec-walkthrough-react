import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {NavLink} from "react-router-dom";
import {logout} from "../../utilities/cookieAuth";
import {formatTime} from "../../utilities/formatTime";
import {API_URL} from "../../utilities/constants";
import CreateRequest from "./CreateRequest";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import {Button} from "react-bootstrap";
import "./PublishRequests.css";

// page for viewing and creating publish requests
function PublishRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeLoadMore, setChangeLoadMore] = useState(false);
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
  });
  const [searchFields, setSearchFields] = useState({
    sortValue: 0,
    orderValue: 1
  });

  // when the page first loads, get all of the pending publish requests
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchRequests(cursor) {
      try {
        setLoading(true);

        const sortValue = searchFields.sortValue;
        const orderValue = searchFields.orderValue;

        // construct the request body
        const postObj = {
          sort: sortValue,
          order: orderValue,
          cursorPrimary: cursor.primary,
          cursorSecondary: cursor.secondary
        };

        // Fetch all requests
        const results = await fetch(`${API_URL}/requests/status/0`, {
          signal: controller.signal,
          method: "POST",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(postObj)
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();

          if (cursor.primary === "null") {
            setRequests([...obj.requests]);
          } else {
            setRequests([...requests, ...obj.requests]);
          }
          setCursor(obj.nextCursor);

        } else {

          // if the user is performing an unauthorized action
          // log them out and return them to the homepage
          if (results.status === 401) {
            logout();
            window.location.href = "/";
          } else {
            setRequests([]);
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

    fetchRequests(cursor);

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [searchFields.orderValue, searchFields.sortValue, changeLoadMore]);

  // updates the sorting order of the table columns
  function changeSort(sortValue, alternateOrder) {
    if (alternateOrder) {
      setCursor({
        primary: "null",
        secondary: "null"
      });
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1 - searchFields.orderValue
      });
    } else {
      setCursor({
        primary: "null",
        secondary: "null"
      });
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1
      });
    }
  }

  return (
    <div className="container request-page-container my-5">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row w-100 mx-2">

          {/* Page title */}
          <div className="col-auto">
            <h4 className="flex-grow-1 font-weight-bold">
              Publish Requests
            </h4>
          </div>

          <div className="col px-0">
            <div className="btn-group align-self-center float-right">

              {/* Link to request history listing */}
              <div className="text-center mx-2 pull-right">
                <NavLink to="/publish-request-history">
                  <Button variant="dark">
                    <i
                      className="fas fa-fw fa-history text-white mr-2"
                      style={{transform: "scale(1.5)"}}></i>
                    <span className="text-white">View Request History</span>
                  </Button>
                </NavLink>
              </div>

              {/* Button and modal for creating a new request */}
              <div className="ml-2 pull-right">
                <CreateRequest />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* The list of all pending publish requests */}
      {requests.length ? (
        <Fragment>
          <table className="request-table shadow mb-5">
            <thead>
              <tr>
                {searchFields.sortValue === 0 ? (
                  <th className="pl-4 active-sort" style={{width: "25%"}} onClick={() => changeSort(0, true)}>
                  Created <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th className="pl-4" style={{width: "25%"}} onClick={() => changeSort(0, false)}>
                  Created <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 1 ? (
                  <th className="pl-4 active-sort" style={{width: "30%"}} onClick={() => changeSort(1, true)}>
                  Title <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th className="pl-4" style={{width: "30%"}} onClick={() => changeSort(1, false)}>
                  Title <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 2 ? (
                  <th className="pl-4 active-sort" style={{width: "20%"}} onClick={() => changeSort(2, true)}>
                  Username <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th className="pl-4" style={{width: "20%"}} onClick={() => changeSort(2, false)}>
                  Username <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 3 ? (
                  <th className="pl-4 active-sort" style={{width: "10%"}} onClick={() => changeSort(3, true)}>
                  Status <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th className="pl-4" style={{width: "10%"}} onClick={() => changeSort(3, false)}>
                  Status <small>▼</small>
                  </th>
                )}
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
                    {request.status === 3 ? (
                      <span
                        className="request-dot green-dot text-center"
                        title="Awaiting admin approval"
                      >
                        <i
                          className="fas fa-fw fa-check text-white fa-sm request-check"
                        />
                      </span>
                    ) : (
                      <span
                        className={`request-dot ${request.status === 1 ? "orange-dot" : "black-dot"}`}
                        title={request.status === 1 ? "Awaiting orange review" : "Awaiting black review"}
                      />
                    )}
                  </td>
                  <td className="request-data align-top">
                    <NavLink to={`/publish-requests/${request.requestId}`}>
                      <Button size="sm" variant="success" onClick={() => {}}>
                        <i
                          className="fas fa-fw fa-stamp text-white mr-2"
                          style={{transform: "scale(1.5)"}}
                        />
                        <span className="text-white">Review Request</span>
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {cursor.primary === "null" ? (
            null
          ) : (
            <div className="text-center">
              <LoadMoreButton
                onUpdate={() => setChangeLoadMore(!changeLoadMore)}
                loading={loading}
              />
            </div>
          )}
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
