import React, {useState, Fragment} from "react";
import Image from "../../components/General/Image";
import {formatTime} from "../../utilities/formatTime";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {Modal, Row, Button} from "react-bootstrap";
import {API_URL} from "../../utilities/constants";
import Error from "../../components/General/Error";
import {logout} from "../../utilities/cookieAuth";
import AddReviewObject from "../ContentPage/Various/AddReviewObject";
import PropTypes from "prop-types";

// A button and modal for reviewing questions
function QuestionReview(props) {

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // close the modal
  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  // open the modal
  function handleShowModal() {
    setShowModal(true);
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

  // delete changes
  async function handleClear() {
    // Check that the user really wants to delete the changes this version
    if (!window.confirm("Are you sure you want to delete the proposed changes?")) {
      return;
    }

    if (!window.confirm("Confirm one last time that you want to delete the the proposed changes.")) {
      return;
    }

    setLoading(true);

    // delete proposed changes
    const results = await fetch(`${API_URL}/quizzes/${props.question.questionId}/changes`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      let newQuestion;

      if (props.question.approved) {
        newQuestion = {
          approved: props.question.approved,
          questionKey: props.question.questionId,
          questionId: props.question.questionId,
          text: props.question.text,
          type: props.question.type,
          priority: props.question.priority,
          imageUrl: props.question.imageUrl,
          answers: props.question.answers,
          groups: props.question.groups,
          tempQuestionId: null,
          tempText: null,
          tempType: null,
          tempPriority: null,
          tempImageUrl: null,
          tempAnswers: [],
          tempGroups: []
        };
      } else {
        newQuestion = {
          questionId: props.question.questionId
        };
      }

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      if (props.question.approved) {
        props.handleUpdate(newQuestion, "clear");
      } else {
        props.handleUpdate(newQuestion, "delete");
      }

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }

    setLoading(false);
  }

  // unpublish
  async function handleRemove() {
    // Check that the user really wants to unpublish this version
    if (!window.confirm("Are you sure you want to unpublish this question?\nThis will overwrite any unpublished version if one exists.")) {
      return;
    }

    setLoading(true);

    // Unpublish the question
    const results = await fetch(`${API_URL}/quizzes/${props.question.questionId}/unpublish`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newQuestion = {
        approved: 0,
        questionKey: props.question.questionId,
        questionId: props.question.questionId,
        text: props.question.text,
        type: props.question.type,
        priority: props.question.priority,
        imageUrl: props.question.imageUrl,
        answers: [],
        groups: [],
        tempQuestionId: null,
        tempText: null,
        tempType: null,
        tempPriority: null,
        tempImageUrl: null,
        tempAnswers: props.question.answers,
        tempGroups: props.question.groups
      };

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newQuestion, "unpublish");

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }

    setLoading(false);
  }

  // publish
  async function handleSubmit() {
    // Check that the user really wants to approve this version
    if (!window.confirm("Are you sure you want to approve this new version?\nThis will overwrite the published version if one exists.")) {
      return;
    }

    setLoading(true);

    // Approve the question
    const results = await fetch(`${API_URL}/quizzes/${props.question.questionId}/publish`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      let newQuestion = {};

      if (props.question.approved) {
        newQuestion = {
          approved: 1,
          questionKey: props.question.questionId,
          questionId: props.question.questionId,
          text: props.question.tempText,
          type: props.question.tempType,
          priority: props.question.tempPriority,
          imageUrl: props.question.tempImageUrl,
          answers: props.question.tempAnswers,
          groups: props.question.tempGroups,
          tempQuestionId: null,
          tempText: null,
          tempType: null,
          tempPriority: null,
          tempImageUrl: null,
          tempAnswers: [],
          tempGroups: []
        };
      } else {
        newQuestion = {
          approved: 1,
          questionKey: props.question.questionId,
          questionId: props.question.questionId,
          text: props.question.text,
          type: props.question.type,
          priority: props.question.priority,
          imageUrl: props.question.imageUrl,
          answers: props.question.tempAnswers,
          groups: props.question.tempGroups,
          tempQuestionId: null,
          tempText: null,
          tempType: null,
          tempPriority: null,
          tempImageUrl: null,
          tempAnswers: [],
          tempGroups: []
        };
      }

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newQuestion, "publish");

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }

    setLoading(false);
  }

  return (
    <Fragment>

      <LoadingOverlay loading={loading} />

      <button
        className="btn btn-sm btn-success btn pull-right mx-2 mb-2"
        onClick={() => handleShowModal()}
      >
        <i className="fas fa-fw fa-stamp mr-2 my-1" style={{transform: "scale(1.5)"}}/>
        <span className="text-white">Review Question</span>
      </button>

      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Review Question</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {props.question.approved ? (
            <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
              <h4 className="font-weight-bold">Published Version</h4>
              <span className="created-text">Last updated {formatTime(props.question.created)}</span>
              <div className="m-3">

                <div className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm">
                  {/* Question type */}
                  <label className="font-weight-bold">
                    Question Type
                  </label>
                  <span>
                    {questionType(props.question.type)}
                  </span>

                  {/* Question text */}
                  <label className="mt-3 font-weight-bold">
                    Question Text
                  </label>
                  <span>
                    {props.question.text}
                  </span>

                  {/* Preview Image */}
                  {props.question.imageUrl.length ? (
                    <div className="my-3">
                      <label className="mt-3 font-weight-bold">
                        Image Preview
                      </label>
                      <Image
                        url={props.question.imageUrl}
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
                  <Fragment>
                    {props.question.type === 3 ? (
                      <Fragment>
                        {props.question.groups.map((group, i) =>
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
                        {props.question.answers.map((answer) =>
                          <span className="mb-4" key={answer.answerId}>
                            {answer.text}

                            {/* Display icons that show the status of the answer */}
                            {props.question.type === 1 || props.question.type === 4 ? (
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
                </div>

              </div>
            </div>
          ) : (
            null
          )}

          {props.question.approved && !props.question.tempQuestionId ? (
            null
          ) : (
            <Fragment>
              {props.question.tempQuestionId ? (
                <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
                  <h4 className="font-weight-bold">New Version</h4>
                  <span className="created-text">Last updated {formatTime(props.question.tempCreated)}</span>
                  <div className="m-3">

                    <div className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm">
                      {/* Question type */}
                      <label className="font-weight-bold">
                        Question Type
                      </label>
                      <span>
                        {questionType(props.question.tempType)}
                      </span>

                      {/* Question text */}
                      <label className="mt-3 font-weight-bold">
                        Question Text
                      </label>
                      <span>
                        {props.question.tempText}
                      </span>

                      {/* Preview Image */}
                      {props.question.tempImageUrl.length ? (
                        <div className="my-3">
                          <label className="mt-3 font-weight-bold">
                            Image Preview
                          </label>
                          <Image
                            url={props.question.tempImageUrl}
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
                      <Fragment>
                        {props.question.tempType === 3 ? (
                          <Fragment>
                            {props.question.tempGroups.map((group, i) =>
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
                            {props.question.tempAnswers.map((answer) =>
                              <span className="mb-4" key={answer.answerId}>
                                {answer.text}

                                {/* Display icons that show the status of the answer */}
                                {props.question.tempType === 1 || props.question.tempType === 4 ? (
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
                    </div>

                  </div>
                </div>
              ) : (
                <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
                  <h4 className="font-weight-bold">New Version</h4>
                  <span className="created-text">Last updated {formatTime(props.question.created)}</span>
                  <div className="m-3">

                    <div className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm">
                      {/* Question type */}
                      <label className="font-weight-bold">
                        Question Type
                      </label>
                      <span>
                        {questionType(props.question.type)}
                      </span>

                      {/* Question text */}
                      <label className="mt-3 font-weight-bold">
                        Question Text
                      </label>
                      <span>
                        {props.question.text}
                      </span>

                      {/* Preview Image */}
                      {props.question.imageUrl.length ? (
                        <div className="my-3">
                          <label className="mt-3 font-weight-bold">
                            Image Preview
                          </label>
                          <Image
                            url={props.question.imageUrl}
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
                      <Fragment>
                        {props.question.type === 3 ? (
                          <Fragment>
                            {props.question.tempGroups.map((group, i) =>
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
                            {props.question.tempAnswers.map((answer) =>
                              <span className="mb-4" key={answer.answerId}>
                                {answer.text}

                                {/* Display icons that show the status of the answer */}
                                {props.question.type === 1 || props.question.type === 4 ? (
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
                    </div>

                  </div>
                </div>
              )}
            </Fragment>
          )}

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-4'>
              <Error
                message={errorMessage}
              />
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          {props.role >= 5 ? (
            <Fragment>
              <Fragment>
                {!props.question.approved || props.question.tempQuestionId ? (
                  <Fragment>
                    <Button
                      className="mr-auto"
                      variant="danger"
                      onClick={() => handleClear()}
                    >
                      Delete Changes
                    </Button>
                    <AddReviewObject
                      objectType={4}
                      objectId={props.question.questionId}
                    />
                  </Fragment>
                ) : (
                  null
                )}
              </Fragment>
              <Fragment>
                {props.question.approved && props.question.tempQuestionId ? (
                  <Fragment>
                    <Button
                      className="ml-1"
                      variant="danger"
                      onClick={() => handleRemove()}
                    >
                      Unpublish Question
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {props.question.approved ? (
                      <Button variant="danger" onClick={() => handleRemove()}>Unpublish Question</Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                    )}
                  </Fragment>
                )}
              </Fragment>
            </Fragment>
          ) : (
            <Fragment>
              {!props.question.approved || props.question.tempQuestionId ? (
                <Fragment>
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => handleClear()}
                  >
                    Delete Changes
                  </Button>
                  <AddReviewObject
                    objectType={4}
                    objectId={props.question.questionId}
                  />
                </Fragment>
              ) : (
                null
              )}
            </Fragment>
          )}
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>

    </Fragment>
  );

}
export default QuestionReview;

QuestionReview.propTypes = {
  question: PropTypes.object,
  role: PropTypes.number,
  handleUpdate: PropTypes.func
};