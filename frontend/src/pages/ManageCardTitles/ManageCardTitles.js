import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./ManageCardTitles.css";

// page for managing default card titles
function ManageCardTitles() {

  const [cardTitles, setCardTitles]

  // when the page first loads, get all default card titles
  useEffect(() => {

    // fetch card titles
    async function fetchTitles() {
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

    fetchTitles();
    // eslint-disable-next-line
  }, []);

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

  // refresh link data when a link is edited
  function handleUpdate() {
    fetchLinks();
  }

  // refresh link data when the filter is changed
  function handleFilterChange(filterMode) {
    setFilter(filterMode);
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
        <table className="card-title-table shadow mb-5">
          <thead>
            <tr>
              <th className="pl-4" style={{width: "10%"}}>
                Confirmed Valid
              </th>
              <th style={{width: "25%"}}>
                Title
              </th>
              <th style={{width: "35%"}}>
                URL
              </th>
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
export default ManageCardTitles;
