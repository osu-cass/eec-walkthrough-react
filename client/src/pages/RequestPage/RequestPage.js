import React, {useEffect, useState, Fragment} from "react";
import {Card} from "react-bootstrap";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import RequestComment from "./RequestComment";
import SubmitComment from "./SubmitComment";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import ReportPage from "../ViewHistory/ReportPage";
import ReportHeader from "../ViewHistory/ReportHeader";
import ReportCard from "../ViewHistory/ReportCard";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import {useParams} from "react-router-dom";
import CloseRequest from "./CloseRequest";
import AcceptRequest from "./AcceptRequest";
import Error from "../../components/General/Error";
import {getProfile} from "../../utilities/cookieAuth";
import "./RequestPage.css";

// Page for viewing a single publish request
function RequestPage() {

  const [loading, setLoading] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
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
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);


  // get the current users ID
  useEffect(() => {
    const user = getProfile();
    setUserId(user.userId);
    setRole(user.role);
  }, [requestId]);

  // when the page first loads, get data about the request
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    // fetch request data
    async function fetchRequest() {
      try {

        setLoading(true);

        // Fetch all requests
        const results = await fetch(`${API_URL}/requests/${requestId}`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();
          setRequest(obj);
          console.log(obj);

          if (obj.status < 4) {
            setOpen(true);
          } else {
            setOpen(false);
          }

        } else {

          if (results.status === 404) {
            // if we can't find the page, then serve a 404 page
            setErrorPage(404);
          } else if (results.status === 401) {
            // if the user is performing an unauthorized action
            // log them out and return them to the homepage
            logout();
            window.location.href = "/";
          } else {
            // server a 500 error page
            setErrorPage(500);
          }

        }

        setLoading(false);

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    fetchRequest();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [requestId]);



  return !errorPage ? (
    <div className="container request-page-container my-5">

      <LoadingOverlay loading={loading} />

      {/* Page header */}
      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <div className="col">
            <h2 className="font-weight-bold">
              Publish Request {open ? "" : "History"} - {request.title}
            </h2>
          </div>
        </div>

        {/* Buttons for approving or closing the publish request */}
        {open ? (
          <div className="row mx-2">
            <CloseRequest
              creatorId={parseInt(request.userId, 10)}
              requestId={parseInt(requestId, 10)}
              onError={(message) => setErrorMessage(message)}
            />
            <div className="mx-2" />
            <AcceptRequest
              requestId={parseInt(requestId, 10)}
              onError={(message) => setErrorMessage(message)}
              requestStatus={request.status}
            />
          </div>
        ) : (
          null
        )}

      </div>

      <Error
        message={errorMessage}
      />

      {/* The initial comment made by the creator of the request */}
      <RequestComment
        commentId={request.commentId}
        created={request.created}
        username={request.username}
        description={request.description}
        status={request.status}
        initial={true}
        commenterId={request.userId}
        userId={userId}
      />

      {/* All additional comments */}
      {request.comments.map((comment) =>
        <RequestComment
          key={comment.commentId}
          commentId={comment.commentId}
          created={comment.created}
          myId={comment.user}
          username={comment.username}
          description={comment.comment}
          status={comment.review}
          targetId={comment.targetId}
          initial={false}
          linkToComment={true}
          commenterId={comment.userId}
          userId={userId}
          open={open}
        />
      )}

      {/* Form for submitting new comments */}
      {open ? (
        <SubmitComment
          requestId={parseInt(requestId, 10)}
          targetId={"0"}
          requestStatus={request.status}
          role={role}
        />
      ) : (
        null
      )}

      {/* Side by side comparison of the current and requested versions of content */}
      {open ? (
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
                    reviewMode={true}
                    requestId={parseInt(requestId, 10)}
                    comments={request.comments}
                    requestStatus={request.status}
                    role={role}
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
                    reviewMode={true}
                    requestId={parseInt(requestId, 10)}
                    comments={request.comments}
                    requestStatus={request.status}
                    role={role}
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
                    reviewMode={true}
                    requestId={parseInt(requestId, 10)}
                    comments={request.comments}
                    requestStatus={request.status}
                    role={role}
                  />
                ) : (
                  null
                )}
              </Fragment>
            )}
          </Card.Body>
        </Card>
      ) : (
        null
      )}

    </div>
  ) : (
    <Fragment>
      {errorPage === 404 ? (
        <Error404 />
      ) : (
        <Error500 />
      )}
    </Fragment>
  );
}
export default RequestPage;
