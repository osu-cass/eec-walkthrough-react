import React, {useState, Fragment} from "react";
import Image from "../../components/General/Image";
import {formatTime} from "../../utilities/formatTime";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {Modal, Row, Button} from "react-bootstrap";
import {API_URL} from "../../utilities/constants";
import Error from "../../components/General/Error";
import {logout} from "../../utilities/cookieAuth";
import Question from "../Quiz/Question";
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
    } else {
      return "Unknown";
    }
  }

  return (
    <Fragment>

      <LoadingOverlay loading={loading} />

      <button
        className="btn btn-sm btn-success btn pull-right ml-3"
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
                            <div className="answers-block">
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
                      <div className="answers-block">
                        {props.question.answers.map((answer) =>
                          <span className="mb-4" key={answer.answerId}>
                            {answer.text}
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
                                <div className="answers-block">
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
                          <div className="answers-block">
                            {props.question.tempAnswers.map((answer) =>
                              <span className="mb-4" key={answer.answerId}>
                                {answer.text}
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
                                <div className="answers-block">
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
                          <div className="answers-block">
                            {props.question.tempAnswers.map((answer) =>
                              <span className="mb-4" key={answer.answerId}>
                                {answer.text}
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
                      onClick={() => /* handleClear() */{}}
                    >
                      Delete Changes
                    </Button>
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
                      onClick={() => /* handleRemove() */{}}
                    >
                      Unpublish Question
                    </Button>
                    <Button variant="primary" onClick={() => /* handleSubmit() */{}}>Publish Changes</Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {props.question.approved ? (
                      <Button variant="danger" onClick={() => /* handleRemove()} */{}}>Unpublish Question</Button>
                    ) : (
                      <Button variant="primary" onClick={() => /* handleSubmit() */{}}>Publish Changes</Button>
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
                    onClick={() => /* handleClear() */{}}
                  >
                    Delete Changes
                  </Button>
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
  role: PropTypes.number
};