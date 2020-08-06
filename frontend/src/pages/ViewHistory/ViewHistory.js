import React, {useEffect, useState} from "react";
import HistorySearchForm from "./HistorySearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {formatTime} from "../../utilities/formatTime";
import "./ViewHistory.css";

// page for viewing page, header, and card history
function ViewHistory() {

  const [publishedContent, setPublishedContent] = useState({})
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate !== 0) {
      fetchPublished(startDate, endDate);
    }
    // eslint-disable-next-line
  }, [startDate, endDate]);

  // fetch published data within a range
  async function fetchPublished(start, end) {
    setLoading(true);

    // Fetch all links
    const results = await fetch(`/api/links/all/1`);

    if (results.ok) {

      const obj = await results.json();

      setPublishedContent(obj);

    } else {
      console.error("Error fetching link list");
    }

    setLoading(false);
  }

  return (
    <div className="container history-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Change History Report
          </h4>
        </div>
      </div>

      <HistorySearchForm onDatesChange={() => {}}/>

      <div className="table-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5 font-weight-bold">No changes found.</h3>
        </div>
      </div>
    </div>
  );
}
export default ViewHistory;
