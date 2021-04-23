import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import Login from "../../../components/PageHeader/Login";

// A button used to take a quiz about the pages contents
function QuizButton(props) {

  if (props.mode === 0 && props.quiz) {
    return (
      <div className="quiz-button-container">

        {/* Anchor for jumping to the header */}
        <span
          id={`header-quiz`}
          className="header-anchor"
        />

        {/* Quiz header */}
        <div className={`d-flex reference-header-bar justify-content-between sticky-top
          my-3 p-3 text-dark-50 rounded shadow-sm border`} style={{top: "1em", zIndex: "50"}}
        >
          <div className="row w-100 ml-0">
            <h4 className="flex-grow-1 font-weight-bold my-0 mx-0">
              Quiz
            </h4>
          </div>
        </div>

        {/* Card describing quiz */}
        <div className="my-3 p-3 card rounded shadow-sm">

          <span className="font-weight-bold text-center mt-4 mb-2">
            Test your knowledge by taking the {props.pageName} quiz
          </span>

          {/* Quiz button */}
          {props.role ? (
            <div className="text-center my-4">
              <NavLink className="quiz-nav-link" to={`/quiz/${props.pageId}`}>
                <button className="btn btn-lg btn-headerbtn1 d-print-none">
                  Take the Quiz
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="text-center my-4">
              <button className="btn btn-lg btn-secondary disabled d-print-none mb-4">
                Take the Quiz
              </button>
              <h2>You need to register / login to take this quiz</h2>
              <Login onLogin={props.handleLoginStatusChange} onNameChange={props.handleNameChange} />
            </div>
          )}

          {/* Previous attempt score */}
          {props.quizScore >= 0 ? (
            <h4 className="text-center mb-4">
              You previously got {props.quizScore}% of questions correct
            </h4>
          ) : (
            null
          )}

        </div>
      </div>
    );
  } else if (props.mode === 1 && props.role >= 3) {
    return (
      <div className="quiz-button-container">

        {/* Anchor for jumping to the header */}
        <span
          id={`header-quiz`}
          className="header-anchor"
        />

        {/* Quiz header */}
        <div className={`d-flex reference-header-bar justify-content-between sticky-top
          my-3 p-3 text-dark-50 rounded shadow-sm border`} style={{top: "1em", zIndex: "50"}}
        >
          <div className="row w-100 ml-0">
            <h4 className="flex-grow-1 font-weight-bold my-0 mx-0">
              Quiz
            </h4>
          </div>
        </div>

        {/* Card describing quiz */}
        <div className="my-3 p-3 card rounded shadow-sm">
          <span className="font-weight-bold text-center mt-4 mb-2">
            Test your knowledge by taking the {props.pageName} quiz
          </span>

          {/* Quiz button */}
          <div className="text-center my-4">
            <NavLink className="quiz-nav-link" to={`/edit-quiz/${props.pageId}`}>
              <button className="btn btn-lg btn-headerbtn1 d-print-none">
                Edit the Quiz
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else if (props.mode === 2 && props.role >= 3) {
    return (
      <div className="quiz-button-container">

        {/* Anchor for jumping to the header */}
        <span
          id={`header-quiz`}
          className="header-anchor"
        />

        {/* Quiz header */}
        <div className={`d-flex reference-header-bar justify-content-between sticky-top
          my-3 p-3 text-dark-50 rounded shadow-sm border`} style={{top: "1em", zIndex: "50"}}
        >
          <div className="row w-100 ml-0">
            <h4 className="flex-grow-1 font-weight-bold my-0 mx-0">
              Quiz
            </h4>
          </div>
        </div>

        {/* Card describing quiz */}
        <div className="my-3 p-3 card rounded shadow-sm">
          <span className="font-weight-bold text-center mt-4 mb-2">
            Test your knowledge by taking the {props.pageName} quiz
          </span>

          {/* Quiz button */}
          <div className="text-center my-4">
            <NavLink className="quiz-nav-link" to={`/move-quiz/${props.pageId}`}>
              <button className="btn btn-lg btn-headerbtn1 d-print-none">
                Move Quiz Questions
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }

}
export default QuizButton;

QuizButton.propTypes = {
  quiz: PropTypes.bool,
  quizScore: PropTypes.number,
  pageId: PropTypes.string,
  mode: PropTypes.number,
  pageName: PropTypes.string,
  role: PropTypes.number
};