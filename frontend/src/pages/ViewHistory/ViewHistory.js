import React, {useState, Fragment} from "react";
import HistorySearchForm from "./HistorySearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import ReportPage from "./ReportPage";
import ReportHeader from "./ReportHeader";
import ReportCard from "./ReportCard";
import "./ViewHistory.css";

// page for viewing page, header, and card history
function ViewHistory() {

  const [publishedContent, setPublishedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Select a date range for the report.");

  // fetch published data within a range
  async function handleGenerateReport(start, end) {
    setLoading(true);

    // Fetch report data
    const results = await fetch(`/api/pages/report/${start}/${end}`);
    if (results.ok) {

      const obj = await results.json();

      // combine all of the content into one array
      const all = [];
      for (let i = 0; i < obj.pages.length; i++) {
        const page = obj.pages[i];
        page.sortType = 0;
        all.push(page);
      }
      for (let i = 0; i < obj.headers.length; i++) {
        const header = obj.headers[i];
        header.sortType = 1;
        all.push(header);
      }
      for (let i = 0; i < obj.cards.length; i++) {
        const card = obj.cards[i];
        card.sortType = 2;
        all.push(card);
      }

      // sort all of the content by date
      all.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
      console.log("all", all)
      setPublishedContent(all);
      if (!all.length) {
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
            History Report
          </h4>
        </div>
      </div>

      <HistorySearchForm
        onGenerateReport={(start, end) => handleGenerateReport(start, end)}
        onErrorMessage={(message) => setErrorMessage(message)}
      />

      <div className="table-container">
        {publishedContent.length ? (
          <div className="prompt-container my-3 py-2 bg-white card rounded shadow-sm">
            <Fragment>
              {publishedContent.map((object, i) =>
                <Fragment key={i}>
                  {object.sortType === 0 ? (
                    <ReportPage
                      key={object.pageId + "p"}
                      page={object}
                    />
                  ) : (
                    null
                  )}
                  {object.sortType === 1 ? (
                    <ReportHeader
                      key={object.headerId + "h"}
                      header={object}
                    />
                  ) : (
                    null
                  )}
                  {object.sortType === 2 ? (
                    <ReportCard
                      key={object.cardId + "c"}
                      card={object}
                    />
                  ) : (
                    null
                  )}
                </Fragment>
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
