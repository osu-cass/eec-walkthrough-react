import React, {useEffect, useState} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./ManageCardTitles.css";

// page for managing default card titles
function ManageCardTitles() {

  const [cardTitles, setCardTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  // when the page first loads, get all default card titles
  useEffect(() => {
    fetchTitles();
    // eslint-disable-next-line
  }, []);

  // fetch card titles
  async function fetchTitles() {
    setLoading(true);

    const results = await fetch(`/api/cards/titles`);

    if (results.ok) {
      const obj = await results.json();
      cardTitles(obj.titles);
    } else {
      console.error("Error fetching card titles");
    }

    setLoading(false);
  }

  // refresh link data when a title is edited or created
  function handleUpdate() {
    fetchTitles();
  }

  return (
    <div className="container card-title-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Card Titles
          </h4>
        </div>
      </div>

      {cardTitles.length ? (
        <table className="card-title-table shadow mb-5">
          <thead>
            <tr>
              <th style={{width: "75%"}}>
                Title
              </th>
              <th style={{width: "25%"}}>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {cardTitles.map((title) =>
              <tr key={title.titleId}>
                <td className="pl-4 link-data align-top">
                  <span>
                    {title.title}
                  </span>
                </td>
                <td className="link-data align-top">
                  Edit Title Button Goes Here
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="table-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-5 font-weight-bold">No card titles were found.</h3>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageCardTitles;
