import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Image from "../../components/General/Image";
import HighlightText from "../ContentPage/Various/HighlightText";
import SubmitComment from "../RequestPage/SubmitComment";
import RequestComment from "../RequestPage/RequestComment";
import ReportAnswer from "./ReportAnswer";
import "./ReportQuestion.css";

// Question history for a single question
function ReportQuestion(props) {

  const [parentsName, setParentsName] = useState("");
  const [showComment, setShowComment] = useState(false);

  // Adjust parent history for situations where the parent was deleted
  useEffect(() => {
    if (props.question.categoryName === null || props.question.pageName === null) {
      setParentsName("[Deleted]");
    } else {
      setParentsName(`${props.question.categoryName} \u2192 ${props.question.pageName}`);
    }
  }, [props.question, props.question.categoryName, props.question.pageName]);

  // Get the text title of a question type
  function questionType(type) {
    if (type === 1) {
      return "Multiple Choice";
    } else if (type === 2) {
      return "Single Text Field";
    } else if (type === 3) {
      return "Multiple Text Fields";
    } else if (type === 4) {
      return "Select All Correct";
    } else {
      return "Unknown";
    }
  }

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      {props.question.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
            <h4 className="report-card-special-text pl-3 pt-4">Question</h4>
            <h5 className="report-card-special-text pl-3">{parentsName} &rarr; Question</h5>
            <span className="report-card-special-text pl-3">Updated {formatTime(props.question.oldVersion.created)}</span>
            <div className="m-3">

              <h2 className="font-weight-bold">
                Question Type
              </h2>
              <span
                className={`${props.question.type !== props.question.oldVersion.type ? "highlight-old-content" : ""} text-break`}
                style={{fontSize: "x-large"}}
              >
                {questionType(props.question.oldVersion.type)}
              </span>
              <h2 className="mt-3 font-weight-bold">
                Question Text
              </h2>
              <HighlightText
                newMode={false}
                newText={props.question.text}
                oldText={props.question.oldVersion.text}
                elementType={2}
                newId={props.newId}
              />
              {props.question.oldVersion.imageUrl.length ? (
                <Fragment>
                  <br />
                  {props.question.imageUrl !== props.question.oldVersion.imageUrl ? (
                    <div className="p-4 d-inline-block old-review-image-container">
                      <Image url={props.question.oldVersion.imageUrl}
                        title="question image"
                        thumbnail={false}
                        header={true}
                      />
                    </div>
                  ) : (
                    <div className="p-4 d-inline-block">
                      <Image url={props.question.oldVersion.imageUrl}
                        title="question image"
                        thumbnail={false}
                        header={true}
                      />
                    </div>
                  )}
                </Fragment>
              ) : (
                null
              )}
              <h2 className="mt-3 font-weight-bold">
                Answers
              </h2>
              <ReportAnswer
                newMode={false}
                newAnswers={props.question.answers}
                oldAnswers={props.question.oldVersion.answers}
                questionTypeNew={props.question.type}
                questionTypeOld={props.question.oldVersion.type}
                newId={props.newId}
              />

            </div>
          </div>
        </div>
      ) : (
        <div className="col" />
      )}

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
          {props.reviewMode ? (
            <div className="row">
              <div className="col-10">
                <h4 className="report-card-special-text pl-3 pt-4">Question</h4>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-success btn-report-card pull-right mr-2 mt-2"
                  onClick={() => setShowComment(!showComment)}
                >
                  <i className={`fas fa-fw fa-xs fa-${showComment ? "minus" : "plus"}`} />
                </button>
              </div>
            </div>
          ) : (
            <h4 className="report-card-special-text pl-3 pt-4">Question</h4>
          )}
          <h5 className="report-card-special-text pl-3">{parentsName} &rarr; Question</h5>
          <span className="report-card-special-text pl-3">Updated {formatTime(props.question.created)}</span>

          {/* if the user is in review mode show comments on this object */}
          {props.reviewMode ? (
            <Fragment>
              {props.comments.map((comment) =>
                <Fragment key={comment.commentId + "Q"}>
                  {comment.targetId === `Q${props.question.questionId}` ? (
                    <RequestComment
                      commentId={comment.commentId}
                      created={comment.created}
                      username={comment.username}
                      description={comment.comment}
                      status={comment.review}
                      targetId={comment.targetId}
                      initial={false}
                      embedded={true}
                    />
                  ) : (
                    null
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            null
          )}

          {/* if the user is in review mode they can open a comment field */}
          {showComment ? (
            <SubmitComment
              requestId={props.requestId}
              targetId={`Q${props.question.questionId}`}
              borderDark={true}
              requestStatus={props.requestStatus}
              role={props.role}
            />
          ) : (
            null
          )}

          <div className="m-3">

            {props.question.oldVersion ? (

              <Fragment>
                <h2 className="font-weight-bold">
                  Question Type
                </h2>
                <span
                  className={`${props.question.type !== props.question.oldVersion.type ? "highlight-new-content" : ""} text-break`}
                  style={{fontSize: "x-large"}}
                >
                  {questionType(props.question.type)}
                </span>
                <h2 className="mt-3 font-weight-bold">
                  Question Text
                </h2>
                <HighlightText
                  newMode={true}
                  newText={props.question.text}
                  oldText={props.question.oldVersion.text}
                  elementType={2}
                  newId={props.newId}
                />
                {props.question.imageUrl.length ? (
                  <Fragment>
                    <br />
                    {props.question.imageUrl !== props.question.oldVersion.imageUrl ? (
                      <div className="p-4 d-inline-block new-review-image-container">
                        <Image url={props.question.imageUrl}
                          title="question image"
                          thumbnail={false}
                          header={true}
                        />
                      </div>
                    ) : (
                      <div className="p-4 d-inline-block">
                        <Image url={props.question.imageUrl}
                          title="question image"
                          thumbnail={false}
                          header={true}
                        />
                      </div>
                    )}
                  </Fragment>
                ) : (
                  null
                )}
                <h2 className="mt-3 font-weight-bold">
                  Answers
                </h2>
                <ReportAnswer
                  newMode={true}
                  newAnswers={props.question.answers}
                  oldAnswers={props.question.oldVersion.answers}
                  questionTypeNew={props.question.type}
                  questionTypeOld={props.question.oldVersion.type}
                  newId={props.newId}
                />
              </Fragment>

            ) : (
              <Fragment>
                <h2 className="font-weight-bold">
                  Question Type
                </h2>
                <span className="highlight-new-content text-break" style={{fontSize: "x-large"}}>
                  {questionType(props.question.type)}
                </span>
                <h2 className="mt-3 font-weight-bold">
                  Question Text
                </h2>
                <span className="highlight-new-content text-break" style={{fontSize: "x-large"}}>
                  {props.question.text}
                </span>
                {props.question.imageUrl.length ? (
                  <Fragment>
                    <br />
                    <div className="p-4 d-inline-block new-review-image-container">
                      <Image url={props.question.imageUrl}
                        title="question image"
                        thumbnail={false}
                        header={true}
                      />
                    </div>
                  </Fragment>
                ) : (
                  null
                )}
                <h2 className="mt-3 font-weight-bold">
                  Answers
                </h2>
                <ReportAnswer
                  newMode={true}
                  newAnswers={props.question.answers}
                  oldAnswers={[]}
                  questionTypeNew={props.question.type}
                  questionTypeOld={0}
                  newId={props.newId}
                />
              </Fragment>
            )}

          </div>
        </div>
      </div>

    </div>
  ) : (
    {/* Support for listings without removal not yet implemented */}
  );

}
export default ReportQuestion;

ReportQuestion.propTypes = {
  question: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool,
  reviewMode: PropTypes.bool,
  requestId: PropTypes.number,
  comments: PropTypes.array,
  requestStatus: PropTypes.number,
  role: PropTypes.number
};