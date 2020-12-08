import React from "react";
import Image from "../../components/General/Image";
import PropTypes from "prop-types";

// A single editable question button and modal
function QuestionEdit(props) {

  return (
    <div
      className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm"
    >

      <div className="row">

        {/* Question type */}
        <div className="col-8" >
          <label>
            Question Type
          </label>
          <br/>
          <select id={`question-type-${props.questionKey}`} className="custom-select mb-2 w-25" defaultValue={props.type}>
            <option value="1">{"Multiple Choice"}</option>
            <option value="2">{"Single Text Field"}</option>
            <option value="3">{"Multiple Text Fields"}</option>
          </select>
        </div>

        {/* Delete question button */}
        <div className="col-4" >
          <button className="btn btn-danger btn pull-right"
            onClick={() => props.deleteQuestion(props.questionKey)}
          >
            <i className="fas fa-fw fa-times mr-2 my-1" />
            Delete Question
          </button>
        </div>
      </div>


      {/* Question text */}
      <label className="mt-3">
        Question Text
      </label>
      <textarea
        className="form-control mb-3"
        id={`question-text-${props.questionKey}`}
        maxLength="5000"
        placeholder="Enter Question"
        defaultValue={props.text}
        onChange={(e) => props.changeField(props.questionKey, e.target.value, 1)}
      />

      <label className="mt-3">
        Image URL
      </label>
      <input
        className="form-control mb-3"
        id={`question-text-${props.questionKey}`}
        maxLength="5000"
        placeholder="Enter Image URL"
        defaultValue={props.imageUrl}
        onChange={(e) => props.changeField(props.questionKey, e.target.value, 2)}
      />

      {/* Preview Image */}
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

      {/* Answers */}
      <label className="mt-3">
        Answers
      </label>
      {props.answers.map((answer) =>
        <div className="row mb-2 pl-3" key={answer.answerId}>
          <button className="btn btn-danger btn mr-3 col-auto"
            onClick={() => props.deleteAnswer(props.questionKey, answer.answerId)}
          >
            <i className="fas fa-fw fa-times" />
          </button>
          <input
            type="text"
            className="form-control col-8"
            id={`question-${props.questionId}-${answer.answerId}`}
            value={answer.text}
            placeholder="Enter answer"
          />
        </div>
      )}

      {/* Add answer button */}
      <div className="row mt-3">
        <button className="btn btn-info btn ml-auto mr-3"
          onClick={() => props.addAnswer(props.questionKey)}
        >
          Add Answer
        </button>
      </div>

    </div>
  );

}
export default QuestionEdit;

QuestionEdit.propTypes = {
  questionId: PropTypes.number,
  questionKey: PropTypes.number,
  text: PropTypes.string,
  answers: PropTypes.array,
  type: PropTypes.number,
  imageUrl: PropTypes.string,
  deleteQuestion: PropTypes.func,
  deleteAnswer: PropTypes.func,
  addAnswer: PropTypes.func,
  changeField: PropTypes.func
};