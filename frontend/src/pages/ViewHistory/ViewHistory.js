import React, {useState, Fragment} from "react";
import HistorySearchForm from "./HistorySearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import ReportPage from "./ReportPage";
import ReportHeader from "./ReportHeader";
import "./ViewHistory.css";

// page for viewing page, header, and card history
function ViewHistory() {

  const [publishedContent, setPublishedContent] = useState({
    pages: [],
    headers: [],
    cards: []
  })
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Select a date range for the report.");

  // fetch published data within a range
  async function handleGenerateReport(start, end) {
    setLoading(true);

    // Fetch report data
    const results = await fetch(`/api/pages/report/${start}/${end}`);
    console.log(`/api/pages/report/${start}/${end}`)
    if (results.ok) {

      const obj = await results.json();
      console.log("Report", obj);
      setPublishedContent(obj);
      if (!obj.pages.length && !obj.headers.length && !obj.cards.length) {
        setErrorMessage("No changes were made in this date range.");
      }

    } else {
      setErrorMessage("Internal server error while attempting to generate report. Please try again later.");
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

      <HistorySearchForm 
        onGenerateReport={(start, end) => handleGenerateReport(start, end)}
        onErrorMessage={(message) => setErrorMessage(message)}
      />

      <div className="table-container">
      {publishedContent.pages.length || publishedContent.headers.length || publishedContent.cards.length ? (
        <div className="prompt-container my-3 py-2 bg-white card rounded shadow-sm">
          <Fragment>
            {publishedContent.pages.map((object) =>
              <ReportPage
                page={object}
              />
            )}
          </Fragment>
          <Fragment>
            {publishedContent.headers.map((object) =>
              <ReportHeader
                header={object}
              />
            )}
          </Fragment>
        </div>
      ) : (
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5 font-weight-bold">{errorMessage}</h3>
        </div>
      )}
      </div>
    </div>
  );
}
export default ViewHistory;
