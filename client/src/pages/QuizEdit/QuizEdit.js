import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {getProfile} from "../../utilities/cookieAuth";
import {useParams, useHistory} from "react-router-dom";
import {API_URL} from "../../utilities/constants";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import Error from "../../components/General/Error";
import QuestionDisplay from "./QuestionDisplay";
import {logout} from "../../utilities/cookieAuth";
import "./QuizEdit.css";

// Page for editing quizzes
function QuizEdit() {

  const [role] = useState(getProfile().role);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [generalFeedback, setGeneralFeedback] = useState([]);
  const [questionFeedback, setQuestionFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [questionErrorMessage, setQuestionErrorMessage] = useState("");
  const [nextKey, setNextKey] = useState(0);
  const {pageId} = useParams();
  const history = useHistory();

  // Gets quiz info when the page first loads
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        // Fetch quiz info
        let results = await fetch(`${API_URL}/quizzes/${pageId}`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          const obj = await results.json();
          setTitle(obj.title);

          // get keys for each question
          for (let i = 0; i < obj.questions.length; i++) {
            obj.questions[i].questionKey = i + 1;
          }

          // reset the answer IDs
          for (let i = 0; i < obj.questions.length; i++) {
            for (let j = 0; j < obj.questions[i].answers.length; j++) {
              obj.questions[i].answers[j].answerId = j + 1;
            }
          }

          // sort answers into their groups
          for (let i = 0; i < obj.questions.length; i++) {
            const groups = [];
            let currentGroupId = 0;
            let currentGroup = [];
            for (let j = 0; j < obj.questions[i].answers.length; j++) {
              const currentAnswers = obj.questions[i].answers;
              if (currentGroupId === currentAnswers[j].groupId) {
                currentGroup.push(currentAnswers[j]);
              } else {
                currentGroupId = currentAnswers[j].groupId;
                if (currentGroup.length) {
                  groups.push(currentGroup);
                }
                currentGroup = [];
                currentGroup.push(currentAnswers[j]);
              }
            }
            if (currentGroup.length) {
              groups.push(currentGroup);
            }
            obj.questions[i].groups = groups;
          }

          setNextKey(obj.questions.length + 1);
          setQuestions(obj.questions);

        } else {
          const obj = await results.json();

          if (results.status === 404) {
            console.error("Couldn't find quiz");
            setError(1);
          } else if (results.status === 500 || typeof obj.error === "undefined") {
            console.error("An internal server error occurred.");
            setError(2);
          } else {
            console.error(obj.error);
            setError(3);
          }
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch user feedback
        results = await fetch(`${API_URL}/quizzes/${pageId}/observations`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          const obj = await results.json();

          // divide the observations into two groups
          const general = [];
          const question = [];

          for (let i = 0; i < obj.observations.length; i++) {
            if (obj.observations[i].type === 1) {
              general.push(obj.observations[i]);
            } else {
              question.push(obj.observations[i]);
            }
          }

          setGeneralFeedback(general);
          setQuestionFeedback(question);
        }

        setLoading(false);

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    fetchData();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [pageId]);

  // check to make sure all questions are valid
  function validInputs() {
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.length) {
        setErrorMessage(`Question ${i + 1} is missing question text.`);
        return false;
      }
      if (!questions[i].answers.length) {
        setErrorMessage(`Question ${i + 1} does not have any valid answers.`);
        return false;
      }
      if (questions[i].type === 1) {
        let correctCount = 0;
        for (let j = 0; j < questions[i].answers.length; j++) {
          if (questions[i].answers[j].correct) {
            correctCount++;
          }
        }
        if (correctCount !== 1) {
          setErrorMessage(`Question ${i + 1} must have exactly one correct answer.`);
          return false;
        }
      }
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].text.length) {
          setErrorMessage(`Question ${i + 1} is missing answer text.`);
          return false;
        }
      }
    }
    return true;
  }

  // deletes a specific question
  function onDeleteQuestion(questionKey) {

    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    const newQuestions = [...questions];
    let index = -1;

    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].questionKey === questionKey) {
        index = i;
        break;
      }
    }

    if (index >= 0) {
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    }
  }

  // add a new question to the quiz
  function addQuestion() {
    const newQuestions = [...questions];
    const questionObject = {
      questionId: 0,
      questionKey: nextKey,
      pageId: pageId,
      text: "",
      type: 1,
      imageUrl: "",
      answers: [],
      groups: []
    };
    newQuestions.push(questionObject);
    setNextKey(nextKey + 1);
    setQuestions(newQuestions);
  }

  // upload quiz changes
  async function updateQuiz() {
    // Check for invalid inputs
    if (!validInputs()) {
      return;
    }
    setLoading(true);

    // Get all of the selected files to upload
    const copy = [...questions];
    const uploadImages = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].imageToUpload) {
        uploadImages.push(copy[i].imageToUpload);
      }
    }

    // see if we need to upload any images
    if (uploadImages.length) {
      const formData = new FormData();
      for (let i = 0; i < uploadImages.length; i++) {
        formData.append("images", uploadImages[i]);
      }
      const results = await fetch(`${API_URL}/files/bulk`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        const urls = obj.urls;

        // update the urls for all of the questions
        for (let i = 0; i < urls.length; i++) {
          for (let j = 0; j < copy.length; j++) {
            if (copy[j].imageToUpload) {
              copy[j].imageToUpload = null;
              copy[j].imageUrl = urls[i];
              break;
            }
          }
        }
        setQuestions(copy);
      } else {
        console.error("Failed to upload images.");
      }
    }

    const data = {
      questions: copy
    };

    const results = await fetch(`${API_URL}/quizzes/${pageId}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      history.push(`/wiki/search-results/${pageId}`);

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

  // delete user feedback
  async function deleteFeedback(observationId, type) {
    if (!window.confirm("Are you sure you want to delete this user feedback?")) {
      return;
    }

    const results = await fetch(`${API_URL}/quizzes/observations/${observationId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      setGeneralErrorMessage("");
      setQuestionErrorMessage("");

      if (type === 1) {
        const newFeedback = [...generalFeedback];
        let index = -1;
        for (let i = 0; i < newFeedback.length; i++) {
          if (newFeedback[i].observationId === observationId) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          newFeedback.splice(index, 1);
          setGeneralFeedback(newFeedback);
        }
      } else {
        const newFeedback = [...questionFeedback];
        let index = -1;
        for (let i = 0; i < newFeedback.length; i++) {
          if (newFeedback[i].observationId === observationId) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          newFeedback.splice(index, 1);
          setQuestionFeedback(newFeedback);
        }
      }

    } else {
      if (type === 1) {
        setGeneralErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setQuestionErrorMessage("An internal server error occurred. Please try again later.");
      }
    }
  }

  return !error ? (
    <div className="container quiz-page-container my-5">

      <LoadingOverlay loading={loading} />

      {/* Title header */}
      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            {title} Quiz
          </h4>
        </div>
      </div>

      {/* Quiz questions */}
      {questions.map((question, i) =>
        <QuestionDisplay
          key={question.questionKey}
          questionKey={question.questionKey}
          questionId={question.questionId}
          text={question.text}
          answers={question.answers}
          type={question.type}
          imageUrl={question.imageUrl}
          groups={question.groups}
          index={i}
          deleteQuestion={(questionKey) => onDeleteQuestion(questionKey)}
          role={role}
        />
      )}

      <Error message={errorMessage} />

      {/* Add questions and save buttons */}
      <div className="mt-4 submit-quiz-box">
        <button className="submit-quiz btn btn-lg btn-success pull-right ml-4" onClick={() => updateQuiz()}>
          Save Quiz
        </button>
        <button className="add-question btn btn-lg btn-info pull-right" onClick={() => addQuestion()}>
          Add Question
        </button>
      </div>

      {/* General user feedback */}
      {generalFeedback.length ? (
        <Fragment>
          <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
            <div className="row mx-2">
              <h4 className="flex-grow-1 font-weight-bold">
                General User Feedback
              </h4>
            </div>
          </div>

          {generalFeedback.map((feedback) =>
            <div
              key={feedback.observationId}
              className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm"
            >
              <div className="row">
                <div className="col-8" >
                  <h5>{feedback.username}</h5>
                </div>

                <div className="col-4" >
                  <button className="btn btn-danger btn-sm btn pull-right"
                    onClick={() => deleteFeedback(feedback.observationId, feedback.type)}
                  >
                    <i className="fas fa-fw fa-times" />
                  </button>
                </div>
              </div>
              <span>{feedback.text}</span>
            </div>
          )}

          <Error message={generalErrorMessage} />
        </Fragment>
      ) : (
        null
      )}

      {/* Suggested Questions */}
      {questionFeedback.length ? (
        <Fragment>
          <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
            <div className="row mx-2">
              <h4 className="flex-grow-1 font-weight-bold">
                User Suggested Questions
              </h4>
            </div>
          </div>

          {questionFeedback.map((feedback) =>
            <div
              key={feedback.observationId}
              className="prompt-container mb-3 p-4 bg-white card rounded shadow-sm"
            >
              <div className="row">
                <div className="col-8" >
                  <h5>{feedback.username}</h5>
                </div>

                <div className="col-4" >
                  <button className="btn btn-danger btn-sm btn pull-right"
                    onClick={() => deleteFeedback(feedback.observationId, feedback.type)}
                  >
                    <i className="fas fa-fw fa-times" />
                  </button>
                </div>
              </div>
              <span>{feedback.text}</span>
            </div>
          )}

          <Error message={questionErrorMessage} />
        </Fragment>
      ) : (
        null
      )}


    </div>

  ) : (

    <Fragment>
      {/* There was an error while attempting to load the page */}
      {error === 1 ? (
        <Error404 />
      ) : (
        <Error500 />
      )}
    </Fragment>
  );
}
export default QuizEdit;
