import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import {useParams, useHistory} from "react-router-dom";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import QuestionEdit from "./QuestionEdit";
import Error from "../../components/General/Error";
import "./QuizEdit.css";

// Page for editing quizzes
function QuizEdit() {

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
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
        const results = await fetch(`${API_URL}/quizzes/${pageId}`, {
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

  // save the quiz settings
  async function saveQuiz() {
    history.push(`/wiki/search-results/${pageId}`);
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

  // deletes a specific answer
  function onDeleteAnswer(questionKey, answerId) {

    if (!window.confirm("Are you sure you want to delete this answer?")) {
      return;
    }

    const newQuestions = JSON.parse(JSON.stringify(questions));
    let index = -1;

    // find the question index
    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].questionKey === questionKey) {
        index = i;
        break;
      }
    }

    if (index >= 0) {

      // find the answer index
      let answerIndex = -1;
      for (let i = 0; i < newQuestions[index].answers.length; i++) {
        if (newQuestions[index].answers[i].answerId === answerId) {
          answerIndex = i;
          break;
        }
      }

      if (answerIndex >= 0) {
        newQuestions[index].answers.splice(answerIndex, 1);
        setQuestions(newQuestions);
      }
    }
  }

  // changes the text for a question field
  function onChangeField(questionKey, text, fieldNumber) {
    const newQuestions = [...questions];
    let index = -1;

    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].questionKey === questionKey) {
        index = i;
        break;
      }
    }

    if (index >= 0) {

      if (fieldNumber === 1) {
        newQuestions[index].text = text;
      } else {
        newQuestions[index].imageUrl = text;
      }

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
      answers: []
    };
    newQuestions.push(questionObject);
    setNextKey(nextKey + 1);
    setQuestions(newQuestions);
  }

  // adds a new answer to a question
  function onAddAnswer(questionKey) {
    const newQuestions = JSON.parse(JSON.stringify(questions));
    let index = -1;

    // find the question index
    for (let i = 0; i < newQuestions.length; i++) {
      if (newQuestions[i].questionKey === questionKey) {
        index = i;
        break;
      }
    }

    // add the new answer
    if (index >= 0) {
      const answerObject = {
        answerId: newQuestions[index].answers.length + 1,
        questionId: questionKey,
        text: "",
        correct: 0
      };
      newQuestions[index].answers.push(answerObject);
      setQuestions(newQuestions);
    }
  }

  return !error ? (
    <div className="container quiz-page-container my-5">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            {title} Quiz
          </h4>
        </div>
      </div>

      {questions.map((question) =>
        <QuestionEdit
          key={question.questionKey}
          questionKey={question.questionKey}
          questionId={question.questionId}
          text={question.text}
          answers={question.answers}
          type={question.type}
          imageUrl={question.imageUrl}
          deleteQuestion={(questionKey) => onDeleteQuestion(questionKey)}
          deleteAnswer={(questionKey, answerId) => onDeleteAnswer(questionKey, answerId)}
          changeField={(questionKey, text, fieldNumber) => onChangeField(questionKey, text, fieldNumber)}
          addAnswer={(questionKey) => onAddAnswer(questionKey)}
        />
      )}

      <Error message={errorMessage} />

      <div className="mt-4 submit-quiz-box">
        <button className="submit-quiz btn btn-lg btn-success pull-right ml-4" onClick={() => saveQuiz()}>
          Save Quiz
        </button>
        <button className="add-question btn btn-lg btn-info pull-right" onClick={() => addQuestion()}>
          Add Question
        </button>
      </div>

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
