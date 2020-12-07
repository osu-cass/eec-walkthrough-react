import React, {Fragment} from "react";
import Image from "../../components/General/Image";
import PropTypes from "prop-types";

// A single question on a quiz page
function Question(props) {

  return (
    <Fragment>

      {/* A multiple choice question */}
      {props.type === 1 ? (
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

          <div className="answers-block">
            {props.answers.map((answer) =>
              <div className="my-2" key={answer.answerId}>
                <input
                  type="radio"
                  name={`question-${props.questionId}`}
                  value={answer.text}
                />
                <span className="ml-4">{answer.text}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        null
      )}

      {/* Text box question */}
      {props.type === 2 ? (
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

          <div className="answers-block">
            <input
              type="text"
              className="form-control"
              id={`question-${props.questionId}`}
              placeholder=""
            />
          </div>

        </div>
      ) : (
        null
      )}

      {/* Multi-text box question */}
      {props.type === 3 ? (
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

          <div className="answers-block">
            {props.answers.map((answer) =>
              <input
                key={answer.answerId}
                type="text"
                className="form-control"
                id={`question-${props.questionId}-${answer.answerId}`}
                placeholder=""
              />
            )}
          </div>

        </div>
      ) : (
        null
      )}

    </Fragment>
  );

}
export default Question;

Question.propTypes = {
  questionId: PropTypes.number,
  text: PropTypes.string,
  answers: PropTypes.array,
  type: PropTypes.number,
  imageUrl: PropTypes.string
};