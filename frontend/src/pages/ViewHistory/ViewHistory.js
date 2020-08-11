import React, {useState, Fragment} from "react";
import HistorySearchForm from "./HistorySearchForm";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import ReportPage from "./ReportPage";
import ReportHeader from "./ReportHeader";
import ReportCard from "./ReportCard";
import "./ViewHistory.css";

// page for viewing page, header, and card history
function ViewHistory() {

  const [publishedContent, setPublishedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Select a date range for the report.");
  const [removeMode, setRemoveMode] = useState(false);

  // fetch published data within a range
  async function handleGenerateReport(start, end, duplicate, remove) {
    setLoading(true);

    let mode = 0;
    if (duplicate) {
      mode = 1;
    }

    if (remove) {
      setRemoveMode(true);
    } else {
      setRemoveMode(false);
    }

    // Fetch report data
    const results = await fetch(`/api/pages/report/${start}/${end}/${mode}`);
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
      setPublishedContent(all);

      if (!all.length) {
        setErrorMessage("No changes were made in this date range.");
      }

    } else {
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else {
        setErrorMessage("Internal server error while attempting to generate report. Please try again later.");
      }
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
        onGenerateReport={(start, end, duplicate, remove) => handleGenerateReport(start, end, duplicate, remove)}
        onClear={() => setPublishedContent([])}
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
                      newId={i}
                      removeMode={removeMode}
                    />
                  ) : (
                    null
                  )}
                  {object.sortType === 1 ? (
                    <ReportHeader
                      key={object.headerId + "h"}
                      header={object}
                      newId={i}
                      removeMode={removeMode}
                    />
                  ) : (
                    null
                  )}
                  {object.sortType === 2 ? (
                    <ReportCard
                      key={object.cardId + "c"}
                      card={object}
                      newId={i}
                      removeMode={removeMode}
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
