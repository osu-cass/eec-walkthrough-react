import React, {useEffect, useState, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {formatTime} from "../../utilities/formatTime";
import ReportPage from "../ViewHistory/ReportPage";
import ReportHeader from "../ViewHistory/ReportHeader";
import ReportCard from "../ViewHistory/ReportCard";
import {useParams} from "react-router-dom";
import "./RequestPage.css";

// page for viewing a single publish request
function RequestPage() {

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    requestId: 0,
    title: "",
    description: "",
    status: 1,
    created: null,
    username: "",
    userId: 0,
    objects: []
  });
  const {requestId} = useParams();

  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line
  }, []);

  // fetch request data
  async function fetchRequest() {
    setLoading(true);

    // Fetch all requests
    const results = await fetch(`/api/requests/${requestId}`);

    if (results.ok) {

      const obj = await results.json();
      console.log(obj)
      setRequest(obj);

    } else {
      console.error("Error fetching request");
    }

    setLoading(false);
  }

  return (
    <div className="container request-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Publish Requests - {request.title}
          </h4>
        </div>
      </div>

      <div className="table-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5 font-weight-bold">A Review</h3>
          <span>{request.requestId}</span>
          <span>{request.title}</span>
          <span>{request.description}</span>
          <span>{request.status}</span>
          <span>{request.username}</span>
          <span>{request.created}</span>
          {request.objects.map((object, i) =>
            <Fragment key={i}>
              {object.objectType === 1 ? (
                <ReportPage
                  key={object.pageId + "p"}
                  page={object}
                  newId={i}
                  removeMode={true}
                />
              ) : (
                null
              )}
              {object.objectType === 2 ? (
                <ReportHeader
                  key={object.headerId + "h"}
                  header={object}
                  newId={i}
                  removeMode={true}
                />
              ) : (
                null
              )}
              {object.objectType === 3 ? (
                <ReportCard
                  key={object.cardId + "c"}
                  card={object}
                  newId={i}
                  removeMode={true}
                />
              ) : (
                null
              )}
            </Fragment>
          )}
        </div>
      </div>

    </div>
  );
}
export default RequestPage;
