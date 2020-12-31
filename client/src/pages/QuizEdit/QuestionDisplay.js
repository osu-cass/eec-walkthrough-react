import React, {Fragment} from "react";
import Image from "../../components/General/Image";
import QuestionEdit from "./QuestionEdit";
import QuestionReview from "./QuestionReview";
import OrderQuestionsButton from "./OrderQuestionsButton";
import PropTypes from "prop-types";

// A single question that can be edited
function QuestionDisplay(props) {

  // shows if the question has a temp version (only if not in published mode)
  function tempQuestion() {
    if (props.mode === 2 && props.publishedMode) {
      return false;
    } else {
      return props.tempQuestionId !== null;
    }
  }

  // get the string for the correct question type
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

  return (props.mode === 2 && props.publishedMode && !props.approved) ? (
    null
  ) : (
    <div
      className={`display-question ${(props.approved && !props.tempQuestionId) || (props.publishedMode) ? "" : "pending-question"} prompt-container mb-3 p-4 card rounded shadow-sm`}
    >

      <div className="row">

        {/* Question type */}
        <div className="col-4" >
          <label className="font-weight-bold">
            Question Type
          </label>
          <br/>
          <span>
            {tempQuestion() ? questionType(props.tempType) : questionType(props.type)}
          </span>
        </div>

        {/* Buttons for special functions */}
        <div className="col-8" >

          {props.mode === 1 ? (
            <Fragment>
              {/* Button for reviewing question */}
              <QuestionReview
                question={props.question}
                role={props.role}
                handleUpdate={(newQuestion, type) => props.handleUpdate(newQuestion, type)}
              />

              {/* Button for editing question */}
              <QuestionEdit
                questionKey={props.questionKey}
                questionId={props.questionId}
                tempQuestionId={props.tempQuestionId}
                new={false}
                approved={props.approved}
                text={props.text}
                tempText={props.tempText}
                answers={props.answers}
                tempAnswers={props.tempAnswers}
                type={props.type}
                tempType={props.tempType}
                imageUrl={props.imageUrl}
                tempImageUrl={props.tempImageUrl}
                groups={props.groups}
                tempGroups={props.tempGroups}
                index={props.index}
                role={props.role}
                pageId={props.pageId}
                handleUpdate={(newQuestion, type) => props.handleUpdate(newQuestion, type)}
              />
            </Fragment>
          ) : (
            null
          )}

          {props.mode === 2 ? (

            <Fragment>
              {/* Buttons for moving approved questions */}
              {props.approved && props.publishedMode ? (
                <Fragment>
                  <OrderQuestionsButton
                    questionId={props.questionId}
                    handleMove={() => {}}
                    approved={1}
                    role={props.role}
                    onMoveQuestion={(questionId, up, mode) => props.onMoveQuestion(questionId, up, mode)}
                  />
                </Fragment>
              ) : (
                null
              )}

              {/* Buttons for moving pending questions */}
              {(!props.approved || props.tempQuestionId) && !props.publishedMode ? (
                <Fragment>
                  <OrderQuestionsButton
                    questionId={props.questionId}
                    handleMove={() => {}}
                    approved={0}
                    role={props.role}
                    onMoveQuestion={(questionId, up, mode) => props.onMoveQuestion(questionId, up, mode)}
                  />
                </Fragment>
              ) : (
                null
              )}
            </Fragment>

          ) : (
            null
          )}

        </div>

      </div>

      {/* Question text */}
      <label className="mt-3 font-weight-bold">
        Question Text
      </label>
      <span>
        {tempQuestion() ? props.tempText : props.text}
      </span>

      {/* Preview Image */}
      {(tempQuestion() && props.tempImageUrl.length) || (!tempQuestion() && props.imageUrl.length) ? (
        <div className="my-3">
          <label className="mt-3 font-weight-bold">
            Image Preview
          </label>
          <Image
            url={tempQuestion() ? props.tempImageUrl : props.imageUrl}
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

      {/* Check if this is a temp question or a published one */}
      {tempQuestion() || !props.approved ? (

        <Fragment>
          {(!tempQuestion() && props.type === 3) || (tempQuestion() && props.tempType === 3) ? (
            <Fragment>
              {props.tempGroups.map((group, i) =>
                <Fragment key={i}>
                  <h4 className="mt-2">Answer Group #{i + 1}</h4>
                  <div className="answers-block-edit">
                    {group.map((answer) =>
                      <div className="row mb-2 pl-3" key={answer.answerId}>
                        <span className="mb-4">
                          {answer.text}
                        </span>
                      </div>
                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <div className="answers-block-edit">
              {props.tempAnswers.map((answer) =>
                <span className="mb-4" key={answer.answerId}>
                  {answer.text}

                  {/* Display icons that show the status of the answer */}
                  {(!tempQuestion() && (props.type === 1 || props.type === 4))
                  || (tempQuestion() && (props.tempType === 1 || props.tempType === 4)) ? (
                      <Fragment>
                        {answer.correct ? (
                          <i className={`fas fa-fw fa-check ml-2`} />
                        ) : (
                          <i className={`fas fa-fw fa-times ml-2`} />
                        )}
                      </Fragment>
                    ) : (
                      null
                    )}

                </span>
              )}
            </div>
          )}
        </Fragment>

      ) : (

        <Fragment>
          {props.type === 3 ? (
            <Fragment>
              {props.groups.map((group, i) =>
                <Fragment key={i}>
                  <h4 className="mt-2">Answer Group #{i + 1}</h4>
                  <div className="answers-block-edit">
                    {group.map((answer) =>
                      <div className="row mb-2 pl-3" key={answer.answerId}>
                        <span className="mb-4">
                          {answer.text}
                        </span>
                      </div>
                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <div className="answers-block-edit">
              {props.answers.map((answer) =>
                <span className="mb-4" key={answer.answerId}>
                  {answer.text}

                  {/* Display icons that show the status of the answer */}
                  {props.type === 1 || props.type === 4 ? (
                    <Fragment>
                      {answer.correct ? (
                        <i className={`fas fa-fw fa-check ml-2`} />
                      ) : (
                        <i className={`fas fa-fw fa-times ml-2`} />
                      )}
                    </Fragment>
                  ) : (
                    null
                  )}

                </span>
              )}
            </div>
          )}
        </Fragment>

      )}
    </div>
  );

}
export default QuestionDisplay;

QuestionDisplay.propTypes = {
  question: PropTypes.object,
  questionId: PropTypes.number,
  tempQuestionId: PropTypes.number,
  questionKey: PropTypes.number,
  text: PropTypes.string,
  tempText: PropTypes.string,
  answers: PropTypes.array,
  tempAnswers: PropTypes.array,
  type: PropTypes.number,
  tempType: PropTypes.number,
  imageUrl: PropTypes.string,
  tempImageUrl: PropTypes.string,
  groups: PropTypes.array,
  tempGroups: PropTypes.array,
  index: PropTypes.number,
  deleteQuestion: PropTypes.func,
  approved: PropTypes.number,
  role: PropTypes.number,
  pageId: PropTypes.string,
  handleUpdate: PropTypes.func,
  onMoveQuestion: PropTypes.func,
  mode: PropTypes.number,
  publishedMode: PropTypes.number
};