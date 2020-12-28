import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Image from "../../components/General/Image";
import "./QuestionResults.css";

// A single question with the results show
function QuestionResults(props) {

  return (
    <Fragment>

      <div
        className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm"
        key={props.questionId}
      >
        <span className="font-weight-bold mb-2">
          {props.text}
        </span>

        {props.imageUrl.length ? (
          <div className="mb-3">
            <Image
              url={props.imageUrl}
              title={"Question Image"}
              thumbnail={true}
              header={false}
            />
          </div>
        ) : (
          null
        )}


        <div>
          {props.scores.map((score) =>
            <div className="m-2 d-inline-block" key={score.scoreId}>
              <span className={`quiz-result-color-${score.correct} p-2`}>
                {score.invalid ? "NOT " : ""}
                {score.text}
                {score.correct ? (
                  <i className="fas fa-fw fa-check fa-sm ml-1" />
                ) : (
                  <i className="fas fa-fw fa-times fa-sm ml-1" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>

    </Fragment>
  );

}
export default QuestionResults;

QuestionResults.propTypes = {
  questionId: PropTypes.number,
  text: PropTypes.string,
  scores: PropTypes.array,
  type: PropTypes.number,
  imageUrl: PropTypes.string
};