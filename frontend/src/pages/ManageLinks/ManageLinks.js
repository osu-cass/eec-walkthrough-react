import React, {useEffect, useState} from "react";
import LinkSearchForm from "./LinkSearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {formatTime} from "../../utilities/formatTime";
import EditLinks from "./EditLinks";
import "./ManageLinks.css";

// page for viewing links
function ManageLinks() {

  const [filter, setFilter] = useState(0);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line
  }, [filter]);

  // refresh link data when a link is edited
  function handleUpdate() {
    fetchLinks();
  }

  // refresh link data when the filter is changed
  function handleFilterChange(filterMode) {
    setFilter(filterMode);
  }

  // fetch homepage data
  async function fetchLinks() {
    setLoading(true);

    // Fetch all links
    const results = await fetch(`/api/links/all/${filter}`);

    if (results.ok) {

      const obj = await results.json();

      setLinks(obj.links);

    } else {
      console.error("Error fetching link list");
    }

    setLoading(false);
  }

  return (
    <div className="container link-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Links
          </h4>
        </div>
      </div>

      <LinkSearchForm onFilterChange={(e) => handleFilterChange(e)}/>


      {links.length ? (
        <table className="link-table shadow mb-5">
          <thead>
            <tr>
              <th className="pl-4" style={{width: "10%"}}>
                Confirmed Valid
              </th>
              <th style={{width: "30%"}}>
                Title
              </th>
              <th style={{width: "30%"}}>
                URL
              </th>
              <th style={{width: "25%"}}>
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
                  <EditLinks link={link} handleUpdate={(link) => handleUpdate(link)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
