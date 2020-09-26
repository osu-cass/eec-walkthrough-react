import React, {Fragment, useEffect, useState} from "react";
import LinkSearchForm from "./LinkSearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {formatTime} from "../../utilities/formatTime";
import {API_URL} from "../../utilities/constants";
import LinkAccessButtons from "../ContentPage/Card/LinkAccessButtons";
import LoadMoreButton from "../../components/General/LoadMoreButton";
import EditLinks from "./EditLinks";
import "./ManageLinks.css";

// page for viewing links
function ManageLinks() {

  const [filter, setFilter] = useState(0);
  const [links, setLinks] = useState([]);
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

  // get all of the link information when the page loads,
  // when a change is made, or when the user scrolls to the bottom of the screen
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchLinks(cursor) {
      try {
        setLoading(true);

        const sortValue = searchFields.sortValue;
        const orderValue = searchFields.orderValue;

        // construct the request body
        const postObj = {
          onlyDead: filter,
          sort: sortValue,
          order: orderValue,
          cursorPrimary: cursor.primary,
          cursorSecondary: cursor.secondary
        };

        // Fetch all links
        const results = await fetch(`${API_URL}/links/all`, {
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
            setLinks([...obj.links]);
          } else {
            setLinks([...links, ...obj.links]);
          }
          setCursor(obj.nextCursor);

        } else {
          setLinks([]);
          console.error("Error fetching link list");
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

    fetchLinks(cursor);

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [filter, searchFields.orderValue, searchFields.sortValue, changeLoadMore]);

  // update the timestamp if we change it
  function handleTimestamp(timestamp, itemId) {
    const copy = [...links];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].itemId === itemId) {
        copy[i].time = timestamp;
        break;
      }
    }
    setLinks(copy);
  }

  // handle changes to the filter
  function handleFilter(newFilter) {
    setCursor({
      primary: "null",
      secondary: "null"
    });
    setFilter(newFilter);
  }

  // refresh link data when a link is edited
  function handleUpdate() {
    setCursor({
      primary: "null",
      secondary: "null"
    });
    setChangeLoadMore(!changeLoadMore);
  }

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
    <div className="container link-page-container text-center">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar text-left">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Links
          </h4>
        </div>
      </div>

      <LinkSearchForm onFilterChange={(e) => handleFilter(e)}/>

      {links.length ? (
        <Fragment>
          <table className="link-table shadow mb-5 text-left">
            <thead>
              <tr>
              {searchFields.sortValue === 0 ? (
                <th className="pl-4 active-sort" style={{width: "10%"}} onClick={() => changeSort(0, true)}>
                  Confirmed Valid <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th className="pl-4" style={{width: "10%"}} onClick={() => changeSort(0, false)}>
                  Confirmed Valid <small>▼</small>
                </th>
              )}
              {searchFields.sortValue === 1 ? (
                <th className="active-sort" style={{width: "25%"}} onClick={() => changeSort(1, true)}>
                  Title <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th style={{width: "25%"}} onClick={() => changeSort(1, false)}>
                  Title <small>▼</small>
                </th>
              )}
              {searchFields.sortValue === 2 ? (
                <th className="active-sort" style={{width: "35%"}} onClick={() => changeSort(2, true)}>
                  URL <small>{searchFields.orderValue ? "▲" : "▼" }</small>
                </th>
              ) : (
                <th style={{width: "35%"}} onClick={() => changeSort(2, false)}>
                  URL <small>▼</small>
                </th>
              )}
                <th style={{width: "30%"}}>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) =>
                <tr key={link.itemId}>
                  <td className="pl-4 link-data align-top">
                    <span className={`${link.time === null ? "invalid-external-link" : "valid-external-link"}`}>
                      {link.time === null ? "Invalid" : formatTime(link.time)}
                    </span>
                  </td>
                  <td className="link-data align-top">
                    {link.title}
                  </td>
                  <td className="link-data align-top">
                    <a href={link.url}>
                      {link.url}
                    </a>
                  </td>
                  <td className="link-data align-top">
                    <div className = "row">
                      <LinkAccessButtons
                        itemId={link.itemId}
                        handleTimestamp={(m) => handleTimestamp(m, link.itemId)}
                      />
                      <EditLinks link={link} handleUpdate={(timestamp) => handleUpdate(timestamp)} />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {cursor.primary === "null" ? (
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
            <h3 className="py-5 font-weight-bold">No matching links found.</h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageLinks;
