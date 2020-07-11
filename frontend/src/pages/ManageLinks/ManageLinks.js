import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./ManageLinks.css";

// page for viewing links
function ManageLinks() {

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  // refresh link data when a link is edited or deleted
  function handleUpdate() {
    fetchLinks();
  }

  // fetch homepage data
  async function fetchLinks() {
    setLoading(true);

    // Fetch all links
    let results = await fetch(`/links/all`);

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

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Links
          </h4>
        </div>
      </div>

      <LoadingOverlay loading={loading} />

      <table className="link-table shadow">
        <thead>
          <tr>
            <th style={{width: "25%"}}>
              Location
            </th>
            <th style={{width: "25%"}}>
              Title
            </th>
            <th style={{width: "25%"}}>
              URL
            </th>
            <th style={{width: "25%"}}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) =>
            <tr key={link.itemId}>
              <td className="link-data">
                {link.location}
              </td>
              <td className="link-data">
                {link.title}
              </td>
              <td className="link-data">
                {link.url}
              </td>
              <td className="link-data">
                {link.status}
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
export default ManageLinks;
