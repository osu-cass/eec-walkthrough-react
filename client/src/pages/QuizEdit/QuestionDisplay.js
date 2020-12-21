import React, {Fragment} from "react";
import Image from "../../components/General/Image";
import QuestionEdit from "./QuestionEdit";
import PropTypes from "prop-types";

// A single question that can be edited
function QuestionDisplay(props) {

  // get the string for the correct question type
  function questionType(type) {
    if (type === 1) {
      return "Multiple Choice";
    } else if (type === 2) {
      return "Single Text Field";
    } else if (type === 3) {
      return "Multiple Text Fields";
    } else {
      return "Unknown";
    }
  }

  return (
    <div
      className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm"
    >

      <div className="row">

        {/* Question type */}
        <div className="col-8" >
          <label className="font-weight-bold">
            Question Type
          </label>
          <br/>
          <span>
            {questionType(props.type)}
          </span>
        </div>

        {/* Review and Edit question button */}
        <div className="col-4" >
          <button
            className="btn btn-sm btn-success btn pull-right ml-3"
            onClick={() => {}}
          >
            <i className="fas fa-fw fa-stamp mr-2 my-1" style={{transform: "scale(1.5)"}}/>
            Review Question
          </button>
          <QuestionEdit
            questionKey={props.questionKey}
            questionId={props.questionId}
            new={false}
            text={props.text}
            answers={props.answers}
            type={props.type}
            imageUrl={props.imageUrl}
            groups={props.groups}
            index={props.index}
            role={props.role}
          />
        </div>

      </div>

      {/* Question text */}
      <label className="mt-3 font-weight-bold">
        Question Text
      </label>
      <span>
        {props.text}
      </span>

      {/* Preview Image */}
      {props.imageUrl.length ? (
        <div className="my-3">
          <label className="mt-3 font-weight-bold">
            Image Preview
          </label>
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

      {/* Answers */}
      <label className="mt-3 font-weight-bold">
        Answers
      </label>

      {props.type === 3 ? (
        <Fragment>
          {props.groups.map((group, i) =>
            <Fragment key={i}>
              <h4 className="mt-2">Answer Group #{i + 1}</h4>
              {group.map((answer) =>
                <div className="row mb-2 pl-3" key={answer.answerId}>
                  <span className="mb-4">
                    {answer.text}
                  </span>
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {props.answers.map((answer) =>
            <span className="mb-4" key={answer.answerId}>
              {answer.text}
            </span>
          )}
        </Fragment>
      )}
    </div>
  );

}
export default QuestionDisplay;

QuestionDisplay.propTypes = {
  questionId: PropTypes.number,
  questionKey: PropTypes.number,
  text: PropTypes.string,
  answers: PropTypes.array,
  type: PropTypes.number,
  imageUrl: PropTypes.string,
  groups: PropTypes.array,
  index: PropTypes.number,
  deleteQuestion: PropTypes.func,
  role: PropTypes.number
};