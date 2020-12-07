import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

// A button used to take a quiz about the pages contents
function QuizButton(props) {

  return (props.mode === 0 && props.quiz) ? (
    <div className="quiz-button-container">

      {/* Quiz header */}
      <div className={`d-flex reference-header-bar justify-content-between sticky-top
        my-3 p-3 text-dark-50 rounded shadow-sm border`} style={{top: "1em", zIndex: "998"}}
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
              <button className="btn btn-lg btn-success d-print-none">
                Take the Quiz
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="text-center my-4">
            <button className="btn btn-lg btn-secondary disabled d-print-none mb-4">
              Take the Quiz
            </button>
            <h2>You need to login to take this quiz</h2>
          </div>
        )}

      </div>
    </div>
  ) : (
    null
  );

}
export default QuizButton;

QuizButton.propTypes = {
  quiz: PropTypes.bool,
  pageId: PropTypes.string,
  mode: PropTypes.number,
  pageName: PropTypes.string,
  role: PropTypes.number
};