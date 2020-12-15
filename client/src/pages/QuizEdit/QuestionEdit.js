import React, {Fragment} from "react";
import Image from "../../components/General/Image";
import ImageInput from "../../components/General/ImageInput";
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
          <select
            id={`question-type-${props.questionKey}`}
            className="custom-select mb-2 w-25"
            defaultValue={props.type}
            onChange={(e) => props.changeField(props.questionKey, e.target.value, 0)}
          >
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

      <ImageInput
        id={props.index}
        onNewImage={(newImage) => props.newImage(newImage, props.index)}
      />

      {/* Preview Image */}
      {props.imageUrl.length ? (
        <div className="my-3">
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

      {props.type === 3 ? (
        <Fragment>
          {props.groups.map((group, i) =>
            <Fragment key={i}>
              <h4 className="mt-2">Answer Group #{i + 1}</h4>
              {group.map((answer) =>
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
                    onChange={(e) => props.changeAnswer(props.questionKey, answer.answerId, e.target.value)}
                  />
                </div>
              )}

              {/* Add answer button */}
              <div className="row mt-3">
                <button className="btn btn-info btn ml-auto mr-3"
                  onClick={() => props.addAnswer(props.questionKey, group[0].groupId)}
                >
                  Add Answer
                </button>
              </div>

            </Fragment>
          )}

          {/* Add answer group button */}
          <div className="row mt-3">
            <button className="btn btn-info btn ml-auto mr-3"
              onClick={() => props.addAnswerGroup(props.questionKey)}
            >
              Add Answer Group
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
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
                onChange={(e) => props.changeAnswer(props.questionKey, answer.answerId, e.target.value)}
              />

              {/* Multiple choice has correct and incorrect answers */}
              {props.type === 1 ? (
                <Fragment>
                  <input
                    id={`check-${props.questionKey}-${answer.answerId}`}
                    className="big-quiz-checkbox ml-3 my-auto"
                    type="checkbox"
                    name="correct"
                    checked={answer.correct}
                    onClick={() => props.changeCorrect(props.questionKey, answer.answerId)}
                  />
                  <label className="ml-3 my-auto">
                    Correct Answer
                  </label>
                </Fragment>
              ) : (
                null
              )}
            </div>
          )}

          {/* Add answer button */}
          <div className="row mt-3">
            <button className="btn btn-info btn ml-auto mr-3"
              onClick={() => props.addAnswer(props.questionKey, 0)}
            >
              Add Answer
            </button>
          </div>
        </Fragment>
      )}

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
  groups: PropTypes.array,
  index: PropTypes.number,
  deleteQuestion: PropTypes.func,
  deleteAnswer: PropTypes.func,
  addAnswer: PropTypes.func,
  addAnswerGroup: PropTypes.func,
  changeField: PropTypes.func,
  changeAnswer: PropTypes.func,
  changeCorrect: PropTypes.func,
  newImage: PropTypes.func
};