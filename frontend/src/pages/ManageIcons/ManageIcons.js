import React, {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./ManageIcons.css";

// page for viewing, editing, and creating icons to be used with items
function ManageIcons() {

  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIcons();
  }, []);

  function handleIconEdit() {
    fetchIcons();
  }

  // fetch homepage data
  async function fetchIcons() {
    setLoading(true);

    // Fetch all icons
    let results = await fetch(`/icons/all`);

    if (results.ok) {

      const obj = await results.json();

      setIcons(obj);

    } else {
      console.error("Error fetching icon list");
    }

    setLoading(false);
  }

  return (
    <div className="container icon-page-container">

      <LoadingOverlay loading={loading} />
      <Card className="my-2 mb-5">
        <Card.Header>
          <div className="row">
            <div className="col">
              <h2>Manage Icons</h2>
            </div>
          </div>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">TEST</div>
        </div>
      </Card>

    </div>
  );
}
export default ManageIcons;
