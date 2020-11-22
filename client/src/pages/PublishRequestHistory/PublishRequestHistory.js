import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import LoadMoreButton from "../../components/General/LoadMoreButton";
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
        const results = await fetch(`${API_URL}/requests/status/4`, {
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
            <h3 className="py-2 font-weight-bold">No requests have been published or closed</h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default PublishRequestHistory;
