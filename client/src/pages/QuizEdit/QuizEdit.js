import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {getProfile} from "../../utilities/cookieAuth";
import {useParams} from "react-router-dom";
import {API_URL} from "../../utilities/constants";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import Error from "../../components/General/Error";
import QuestionDisplay from "./QuestionDisplay";
import QuestionEdit from "./QuestionEdit";
import {NavLink} from "react-router-dom";
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
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [questionErrorMessage, setQuestionErrorMessage] = useState("");
  const [nextKey, setNextKey] = useState(0);
  const {pageId} = useParams();

  // Gets quiz info when the page first loads
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        // Fetch quiz info
        let results = await fetch(`${API_URL}/quizzes/${pageId}/pending`, {
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
            for (let j = 0; j < obj.questions[i].tempAnswers.length; j++) {
              obj.questions[i].tempAnswers[j].answerId = j + 1;
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

          // sort temp answers into their groups
          for (let i = 0; i < obj.questions.length; i++) {
            const groups = [];
            let currentGroupId = 0;
            let currentGroup = [];
            for (let j = 0; j < obj.questions[i].tempAnswers.length; j++) {
              const currentAnswers = obj.questions[i].tempAnswers;
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
            obj.questions[i].tempGroups = groups;
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

  // update a question after getting a response from the server
  async function handleUpdate(newQuestion, type) {
    const newQuestions = [...questions];
    console.log("type =", type);
    if (type === "create") {

      // add the new question
      newQuestions.push(newQuestion);
      setNextKey(nextKey + 1);
      setQuestions(newQuestions);

    } else if (type === "update") {

      // update the question
      for (let i = 0; i < newQuestions.length; i++) {
        if (newQuestions[i].questionId === newQuestion.questionId) {
          newQuestions[i].approved = newQuestion.approved;
          newQuestions[i].questionKey = newQuestion.questionKey;
          newQuestions[i].questionId = newQuestion.questionId;
          newQuestions[i].text = newQuestion.text;
          newQuestions[i].type = newQuestion.type;
          newQuestions[i].priority = newQuestion.priority;
          newQuestions[i].imageUrl = newQuestion.imageUrl;
          newQuestions[i].answers = newQuestion.answers;
          newQuestions[i].groups = newQuestion.groups;
          newQuestions[i].tempQuestionId = newQuestion.tempQuestionId;
          newQuestions[i].tempText = newQuestion.tempText;
          newQuestions[i].tempType = newQuestion.tempType;
          newQuestions[i].tempPriority = newQuestion.tempPriority;
          newQuestions[i].tempImageUrl = newQuestion.tempImageUrl;
          newQuestions[i].tempAnswers = newQuestion.tempAnswers;
          newQuestions[i].tempGroups = newQuestion.tempGroups;
        }
      }
      console.log(newQuestions);
      setQuestions(newQuestions);
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
          tempQuestionId={question.tempQuestionId}
          text={question.text}
          tempText={question.tempText}
          answers={question.answers}
          tempAnswers={question.tempAnswers}
          type={question.type}
          tempType={question.tempType}
          imageUrl={question.imageUrl}
          tempImageUrl={question.tempImageUrl}
          groups={question.groups}
          tempGroups={question.tempGroups}
          index={i}
          approved={question.approved}
          deleteQuestion={(questionKey) => onDeleteQuestion(questionKey)}
          role={role}
          pageId={pageId}
          handleUpdate={(newQuestion, type) => handleUpdate(newQuestion, type)}
        />
      )}

      {/* Add questions and return to page buttons */}
      <div className="mt-4 submit-quiz-box">
        <NavLink className="home-footer-nav-link" to={`/wiki/search-results/${pageId}`}>
          <button className="submit-quiz btn btn-lg btn-success pull-right ml-4">
            Return to {title}
          </button>
        </NavLink>
        <QuestionEdit
          questionKey={0}
          questionId={0}
          new={true}
          text={""}
          answers={[]}
          tempAnswers={[]}
          type={1}
          imageUrl={""}
          groups={[]}
          tempGroups={[]}
          index={0}
          role={role}
          pageId={pageId}
          handleUpdate={(newQuestion, type) => handleUpdate(newQuestion, type)}
          approved={0}
        />
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
