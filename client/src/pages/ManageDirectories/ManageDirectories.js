import React, {Fragment, useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import "./ManageDirectories.css";

// page for viewing user owned file upload directories
function ManageDirectories() {

  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState("null");
  const [changeLoadMore, setChangeLoadMore] = useState(false);
  const [searchFields, setSearchFields] = useState({
    sortValue: 0,
    orderValue: 1
  });

  // get all of the directory information when the page loads,
  // when a change is made, or when the user scrolls to the bottom of the screen
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchFiles(cursor) {
      try {

        setLoading(true);
        const sortValue = searchFields.sortValue;
        const orderValue = searchFields.orderValue;

        // construct the request body
        const postObj = {
          sort: sortValue,
          order: orderValue,
          cursor: cursor,
        };

        const results = await fetch(`${API_URL}/files/directories`, {
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

          if (cursor === "null") {
            setDirectories([...obj.directories]);
          } else {
            setDirectories([...directories, ...obj.directories]);
          }
          setCursor(obj.nextCursor);

        } else {
          setDirectories([]);
          console.error("Error fetching files");
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

    fetchFiles(cursor);

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
      setCursor("null");
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1 - searchFields.orderValue
      });
    } else {
      setCursor("null");
      setSearchFields({
        sortValue: sortValue,
        orderValue: 1
      });
    }
  }

  return (
    <div className="container file-page-container text-center mb-5">

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Images
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      {directories.length ? (
        <Fragment>
          <table className="file-table shadow text-left">
            <thead>
              <tr>
                {searchFields.sortValue === 0 ? (
                  <th className="pl-5 active-sort" style={{width: "30%"}} onClick={() => changeSort(0, true)}>
                    Username <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th className="pl-5" style={{width: "30%"}} onClick={() => changeSort(0, false)}>
                    Username <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 1 ? (
                  <th className="active-sort" style={{width: "20%"}} onClick={() => changeSort(1, true)}>
                    User ID <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th style={{width: "20%"}} onClick={() => changeSort(1, false)}>
                    User ID <small>▼</small>
                  </th>
                )}
                {searchFields.sortValue === 2 ? (
                  <th className="active-sort" style={{width: "25%"}} onClick={() => changeSort(2, true)}>
                    Number of files <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                  </th>
                ) : (
                  <th style={{width: "25%"}} onClick={() => changeSort(2, false)}>
                    Number of files <small>▼</small>
                  </th>
                )}
                <th style={{width: "15%"}}>
                  View Files
                </th>
              </tr>
            </thead>
            <tbody>
              {directories.map((directory) =>
                <tr key={directory.userId}>
                  <td className="file-data pl-5 align-top">
                    {directory.name}
                  </td>
                  <td className="file-data align-top">
                    {directory.userId}
                  </td>
                  <td className="file-data-source align-top">
                    {directory.fileCount}
                  </td>
                  <td className="file-data text-left align-top">
                    <NavLink to={`/manage-images/${directory.userId}`}>
                      <Button className="pull-right mx-2 px-5" variant="success" onClick={() => {}}>
                        View Files
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {cursor === "null" ? (
            null
          ) : (
            <LoadMoreButton
              onUpdate={() => setChangeLoadMore(!changeLoadMore)}
              loading={loading}
            />
          )}
        </Fragment>
      ) : (
        <div className="table-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-5 font-weight-bold">No files have been uploaded</h3>
          </div>
        </div>
      )}

    </div>
  );
}
export default ManageDirectories;
