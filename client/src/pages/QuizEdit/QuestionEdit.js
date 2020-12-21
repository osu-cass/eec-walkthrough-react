import React, {useState, Fragment} from "react";
import Image from "../../components/General/Image";
import ImageInput from "../../components/General/ImageInput";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {Modal, Row, Button} from "react-bootstrap";
import {API_URL, UPLOAD_TERMS} from "../../utilities/constants";
import {getAgreement} from "../../utilities/agreementMode";
import Agreement from "../../components/General/Agreement";
import Error from "../../components/General/Error";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";

// A single editable question modal
function QuestionEdit(props) {

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState(props.type);
  const [text, setText] = useState(props.text);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [imageUpload, setImageUpload] = useState("");
  const [answers, setAnswers] = useState(props.answers);
  const [groups, setGroups] = useState(props.groups);
  const [imageAgreement, setImageAgreement] = useState(getAgreement("image"));
  const [showAgreement, setShowAgreement] = useState(false);

  // close the modal
  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  // open the modal
  function handleShowModal() {
    setShowModal(true);
  }

  // change an answers text
  function changeAnswer(answerId, text) {
    const answerList = [...answers];
    const groupList = [...groups];

    // find the answer index
    let answerIndex = -1;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].answerId === answerId) {
        answerIndex = i;
        break;
      }
    }

    if (answerIndex >= 0) {
      answerList[answerIndex].text = text;
      setAnswers(answerList);
    }

    // update the group value as well
    let xIndex = -1;
    let yIndex = -1;
    for (let i = 0; i < groupList.length; i++) {
      for (let j = 0; j < groupList[i].length; j++) {
        if (groupList[i][j].answerId === answerId) {
          xIndex = i;
          yIndex = j;
          break;
        }
      }
    }

    if (xIndex >= 0 && yIndex >= 0) {
      groupList[xIndex][yIndex].text = text;
      setGroups(groupList);
    }
  }

  // deletes a specific answer
  function deleteAnswer(answerId) {
    const answerList = [...answers];
    const groupList = [...groups];

    if (!window.confirm("Are you sure you want to delete this answer?")) {
      return;
    }

    // find the answer index
    let answerIndex = -1;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].answerId === answerId) {
        answerIndex = i;
        break;
      }
    }

    if (answerIndex >= 0) {
      answerList.splice(answerIndex, 1);
      setAnswers(answerList);
    }

    // see if answer needs to be deleted from group
    let xIndex = -1;
    let yIndex = -1;
    for (let i = 0; i < groupList.length; i++) {
      for (let j = 0; j < groupList[i].length; j++) {
        if (groupList[i][j].answerId === answerId) {
          xIndex = i;
          yIndex = j;
          break;
        }
      }
    }

    if (xIndex >= 0 && yIndex >= 0) {
      groupList[xIndex].splice(yIndex, 1);

      // if the group is now empty, then remove it
      if (!groupList[xIndex].length) {
        groupList.splice(xIndex, 1);
      }

      setGroups(groupList);
    }
  }

  // change an answers correct status
  function changeCorrect(answerId) {
    const answerList = [...answers];

    let correct = document.getElementById(`check-${props.questionKey}-${answerId}`).checked;
    if (correct) {
      correct = 1;
    } else {
      correct = 0;
    }

    // find the answer index
    let answerIndex = -1;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].answerId === answerId) {
        answerIndex = i;
        break;
      }
    }

    if (answerIndex >= 0) {
      answerList[answerIndex].correct = correct;
      setAnswers(answerList);
    }
  }

  // adds a new answer to a question
  function addAnswer(groupId) {
    const answerList = [...answers];
    const groupList = [...groups];

    // find the next valid id
    let newId = 1;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].answerId >= newId) {
        newId = answerList[i].answerId + 1;
      }
    }

    //

    // create the new answer
    const answerObject = {
      answerId: newId,
      questionId: props.questionKey,
      text: "",
      correct: 0,
      subAnswers: [],
      groupId: groupId
    };
    answerList.push(answerObject);
    setAnswers(answerList);

    // update the group information
    for (let i = 0; i < groupList.length; i++) {
      if (groupList[i].length) {
        if (groupList[i][0].groupId === groupId) {
          groupList[i].push(answerObject);
          break;
        }
      }
    }

    setGroups(groupList);
  }

  // adds a new answer group to a question
  function addAnswerGroup() {
    const answerList = [...answers];
    const groupList = [...groups];

    // find the next valid id
    let newId = 1;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].answerId >= newId) {
        newId = answerList[i].answerId + 1;
      }
    }

    // find the next group ID
    let groupId = 0;
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i].groupId >= groupId) {
        groupId = answerList[i].groupId + 1;
      }
    }

    // create the new answer
    const answerObject = {
      answerId: newId,
      questionId: props.questionKey,
      text: "",
      correct: 0,
      subAnswers: [],
      groupId: groupId
    };
    answerList.push(answerObject);
    setAnswers(answerList);

    // add the new group
    groupList.push([answerObject]);

    setGroups(groupList);
  }

  // handle submiting the question changes
  function handleSubmit () {
    //
  }

  // handle storing file information for uploaded images
  function onNewImage(newImage) {
    setImageUpload(newImage);

    if (!imageAgreement) {
      setShowAgreement(true);
    }
  }

  // when the user cancels an image upload agreement
  function cancelAgreement() {
    setImageUpload("");
    setShowAgreement(false);
  }

  // when the user accepts an image upload agreement
  function acceptAgreement() {
    setShowAgreement(false);
    setImageAgreement(true);
  }

  return (
    <Fragment>
      <Agreement
        agreementTitle={"Image Agreement"}
        agreementName={"image"}
        terms={UPLOAD_TERMS}
        acceptFunction={() => acceptAgreement()}
        show={showAgreement}
        closeModal={() => cancelAgreement()}
      />

      <LoadingOverlay loading={loading} />

      <button
        className="btn btn-sm btn-info btn pull-right"
        onClick={() => handleShowModal()}
      >
        <i className="fas fa-fw fa-edit mr-2 my-1" style={{transform: "scale(1.5)"}}/>
        <span className="text-white">Edit Question</span>
      </button>

      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold">Edit Question</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <div className="mx-2">
            {/* Question type */}
            <label>
              Question Type
            </label>
            <br/>
            <select
              id={`question-type-${props.questionKey}`}
              className="custom-select mb-2 w-25"
              defaultValue={type}
              onChange={(e) => setType(parseInt(e.target.value, 10))}
            >
              <option value="1">{"Multiple Choice"}</option>
              <option value="2">{"Single Text Field"}</option>
              <option value="3">{"Multiple Text Fields"}</option>
            </select>
            <br/>

            {/* Question text */}
            <label className="mt-3">
              Question Text
            </label>
            <textarea
              className="form-control mb-3"
              id={`question-text-${props.questionKey}`}
              maxLength="5000"
              placeholder="Enter Question"
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Question image */}
            <label className="mt-3">
              Image URL
            </label>
            <input
              className="form-control mb-3"
              id={`question-text-${props.questionKey}`}
              maxLength="5000"
              placeholder="Enter Image URL"
              defaultValue={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <ImageInput
              id={props.index}
              onNewImage={(newImage) => onNewImage(newImage)}
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
            <br/>

            {/* Answers */}
            <label className="mt-3">
              Answers
            </label>

            {type === 3 ? (
              <Fragment>
                {groups.map((group, i) =>
                  <Fragment key={i}>
                    <h4 className="mt-2">Answer Group #{i + 1}</h4>
                    {group.map((answer) =>
                      <div className="row mb-2 pl-3" key={answer.answerId}>
                        <button className="btn btn-danger btn mr-3 col-auto"
                          onClick={() => deleteAnswer(answer.answerId)}
                        >
                          <i className="fas fa-fw fa-times" />
                        </button>
                        <input
                          type="text"
                          className="form-control col-8"
                          id={`question-${props.questionId}-${answer.answerId}`}
                          value={answer.text}
                          placeholder="Enter answer"
                          onChange={(e) => changeAnswer(answer.answerId, e.target.value)}
                        />
                      </div>
                    )}

                    <div className="row mt-3">
                      {/* Add answer button */}
                      <button className="btn btn-info btn ml-auto mr-3"
                        onClick={() => addAnswer(group[0].groupId)}
                      >
                        Add Answer
                      </button>
                    </div>

                  </Fragment>
                )}

                {/* Add answer group button */}
                <div className="row mt-3">
                  <button className="btn btn-info btn ml-auto mr-3"
                    onClick={() => addAnswerGroup()}
                  >
                    Add Answer Group
                  </button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {answers.map((answer) =>
                  <div className="row mb-2 pl-3" key={answer.answerId}>
                    {/* Delete answer button */}
                    <button className="btn btn-danger btn mr-3 col-auto"
                      onClick={() => deleteAnswer(answer.answerId)}
                    >
                      <i className="fas fa-fw fa-times" />
                    </button>
                    <input
                      type="text"
                      className="form-control col-8"
                      id={`question-${props.questionId}-${answer.answerId}`}
                      value={answer.text}
                      placeholder="Enter answer"
                      onChange={(e) => changeAnswer(answer.answerId, e.target.value)}
                    />

                    {/* Multiple choice has correct and incorrect answers */}
                    {type === 1 ? (
                      <Fragment>
                        <input
                          id={`check-${props.questionKey}-${answer.answerId}`}
                          className="big-quiz-checkbox ml-3 my-auto"
                          type="checkbox"
                          name="correct"
                          checked={answer.correct}
                          onClick={() => changeCorrect(answer.answerId)}
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
                    onClick={() => addAnswer(0)}
                  >
                    Add Answer
                  </button>
                </div>
              </Fragment>
            )}

            <Row>
              <div className='col-3' />
              <div className='col-6 mt-2'>
                <Error
                  message={errorMessage}
                />
              </div>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            className="mr-auto"
            variant="danger"
            onClick={() => {}}
          >
            {props.role >= 5 ? (
              <span>Delete Question</span>
            ) : (
              <span>Delete Unpublished Question</span>
            )}
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>Submit Question Edit</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
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
  role: PropTypes.number
};