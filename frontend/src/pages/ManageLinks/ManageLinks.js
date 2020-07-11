import React, {useEffect, useState} from "react";
import LinkSearchForm from "./LinkSearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./ManageLinks.css";

// page for viewing links
function ManageLinks() {

  const [filter, setFilter] = useState(0);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, [filter]);

  // refresh link data when a link is edited or deleted
  function handleUpdate(filterMode) {
    setFilter(filterMode);
  }

  // fetch homepage data
  async function fetchLinks() {
    setLoading(true);

    // Fetch all links
    let results = await fetch(`/links/all/${filter}`);

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

      <LinkSearchForm onFilterChange={(e) => handleUpdate(e)}/>

      <table className="link-table shadow mb-5">
        <thead>
          <tr>
            <th style={{width: "35%"}}>
              Title
            </th>
            <th style={{width: "35%"}}>
              URL
            </th>
            <th style={{width: "5%"}}>
              Status
            </th>
            <th style={{width: "25%"}}>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) =>
            <tr key={link.itemId}>
              <td className="link-data align-top">
                {link.title}
              </td>
              <td className="link-data align-top">
                <a href={link.url}>
                  {link.url}
                </a>
              </td>
              <td className="link-data align-top">
                <span className={`${link.time === null ? "invalid-external-link" : "valid-external-link"}`}>
                  {link.time === null ? "Invalid" : "Valid"}
                </span>
              </td>
              <td className="link-data align-top">
                Edit
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
export default ManageLinks;
