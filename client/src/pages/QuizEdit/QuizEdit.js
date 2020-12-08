import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import {useParams, useHistory} from "react-router-dom";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import QuestionEdit from "./QuestionEdit";
import Error from "../../components/General/Error";
import {logout} from "../../utilities/cookieAuth";
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

      if (fieldNumber === 0) {
        newQuestions[index].type = parseInt(text, 10);
      } else if (fieldNumber === 1) {
        newQuestions[index].text = text;
      } else {
        newQuestions[index].imageUrl = text;
      }

      setQuestions(newQuestions);
    }
  }

  // change an answers text
  function onChangeAnswer(questionKey, answerId, text) {
    const newQuestions = [...questions];
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
        newQuestions[index].answers[answerIndex].text = text;
        setQuestions(newQuestions);
      }
    }
  }

  // change an answers correct status
  function onChangeCorrect(questionKey, answerId) {
    let correct = document.getElementById(`check-${questionKey}-${answerId}`).checked;
    if (correct) {
      correct = 1;
    } else {
      correct = 0;
    }
    const newQuestions = [...questions];
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
        newQuestions[index].answers[answerIndex].correct = correct;
        setQuestions(newQuestions);
      }
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

      // find the next valid id
      let newId = 1;
      for (let i = 0; i < newQuestions[index].answers.length; i++) {
        if (newQuestions[index].answers[i].answerId >= newId) {
          newId = newQuestions[index].answers[i].answerId + 1;
        }
      }

      // create the new answer
      const answerObject = {
        answerId: newId,
        questionId: questionKey,
        text: "",
        correct: 0
      };
      newQuestions[index].answers.push(answerObject);
      setQuestions(newQuestions);
    }
  }

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

  // upload quiz changes
  async function updateQuiz() {
    // Check for invalid inputs
    if (!validInputs()) {
      return;
    }
    setLoading(true);

    const data = {
      questions: questions
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
          changeAnswer={(questionKey, answerId, text) => onChangeAnswer(questionKey, answerId, text)}
          changeCorrect={(questionKey, answerId) => onChangeCorrect(questionKey, answerId)}
        />
      )}

      <Error message={errorMessage} />

      <div className="mt-4 submit-quiz-box">
        <button className="submit-quiz btn btn-lg btn-success pull-right ml-4" onClick={() => updateQuiz()}>
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
