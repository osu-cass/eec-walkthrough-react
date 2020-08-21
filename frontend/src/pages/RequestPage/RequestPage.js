import React, {useEffect, useState, Fragment} from "react";
import {Card} from "react-bootstrap";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import RequestComment from "./RequestComment";
import RequestSubmitComment from "./RequestSubmitComment";
import {logout} from "../../utilities/cookieAuth";
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
    objects: [],
    comments: []
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
      setRequest(obj);
      console.log(obj);

    } else {

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else {
        console.error("Error fetching request");
      }

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

      <RequestComment
        created={request.created}
        username={request.username}
        description={request.description}
        status={request.status}
        initial={true}
      />

      {request.comments.map((comment) =>
        <RequestComment
          key={comment.commentId}
          created={comment.created}
          username={comment.username}
          description={comment.comment}
          status={comment.review}
          initial={false}
        />
      )}

      <RequestSubmitComment
        creatorId={parseInt(request.userId, 10)}
        requestId={parseInt(requestId, 10)}
      />

      <Card className="request-card-main my-4 shadow-sm">
        <Card.Header
          as="h5"
          className="card-header-bar d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold"
        >
          <div className="col text-center">
            Currently Published Content
          </div>
          <div className="col text-center">
            New Content to Publish
          </div>
        </Card.Header>
        <Card.Body className="request-card-body">
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
        </Card.Body>
      </Card>

    </div>
  );
}
export default RequestPage;
