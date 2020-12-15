import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import {useParams, useHistory} from "react-router-dom";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import Question from "./Question";
import Error from "../../components/General/Error";
import "./Quiz.css";

// Page where a user answers quiz questions
function Quiz() {

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
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

          // get the group size for each question
          for (let i = 0; i < obj.questions.length; i++) {
            let groupSize = 0;
            const answers = obj.questions[i].answers;
            const idArray = [];

            // check each answer and count the unique group IDs
            for (let j = 0; j < obj.questions[i].answers.length; j++) {
              const currentAnswer = obj.questions[i].answers[j];
              let found = false;
              for (let k = 0; k < idArray.length; k++) {
                if (currentAnswer.groupId === idArray[k]) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                groupSize++;
                idArray.push(currentAnswer.groupId);
              }
            }
            obj.questions[i].groupLength = groupSize;
          }

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


  // does a sanitized comparison between two answers to see if they are correct
  function compareAnswers(realAnswer, userAnswer) {
    if (typeof realAnswer !== "string" || typeof userAnswer !== "string") {
      return 0;
    }

    if (realAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  // submit the quiz answers and get the quiz results
  async function submitQuiz() {

    const answers = [];
    setErrorMessage("");

    // get all of the user's answers
    for (let i = 0; i < questions.length; i++) {

      // multiple choice
      if (questions[i].type === 1) {
        const selector = document.querySelector(`input[name="question-${questions[i].questionId}"]:checked`);
        if (selector) {
          answers.push(selector.value);
        } else {
          answers.push("");
        }
      }

      // text box
      if (questions[i].type === 2) {
        const value = document.getElementById(`question-${questions[i].questionId}`).value;
        answers.push(value);
      }

      // multiple text box
      if (questions[i].type === 3 && questions[i].answers.length) {
        const currentAnswers = questions[i].answers;
        for (let j = 0; j < questions[i].groupLength; j++) {
          const value = document.getElementById(`question-${questions[i].questionId}-M${j}`).value;
          answers.push(value);
        }
      }

    }

    // check to make sure all questions have a valid answer
    let answerCount = 0;
    for (let i = 0; i < questions.length; i++) {

      // multiple choice and text box are counted different than multi-text box
      if (questions[i].type !== 3) {
        if (answers[answerCount] === "") {
          setErrorMessage(`Question #${i + 1} is missing an answer`);
          return;
        }
        answerCount++;
      } else {
        const currentAnswers = questions[i].answers;
        for (let j = 0; j < currentAnswers[currentAnswers.length - 1].groupId; j++) {
          if (answers[answerCount] === "") {
            setErrorMessage(`Question #${i + 1} is missing an answer`);
            return;
          }
          answerCount++;
        }
      }
    }

    // record the results of the quiz
    const scores = [];
    answerCount = 0;
    for (let i = 0; i < questions.length; i++) {

      const newScore = {
        questionId: 0,
        text: "",
        correct: 0
      };

      // multiple choice
      if (questions[i].type === 1) {
        // find the correct answer
        let correctAnswer = "";
        for (let j = 0; j < questions[i].answers.length; j++) {
          if (questions[i].answers[j].correct) {
            correctAnswer = questions[i].answers[j].text;
          }
        }
        // save the score
        newScore.questionId = questions[i].questionId;
        newScore.text = answers[answerCount];
        newScore.correct = compareAnswers(correctAnswer, answers[answerCount]);
        scores.push(newScore);
        answerCount++;
      }

      // text box
      if (questions[i].type === 2) {
        newScore.questionId = questions[i].questionId;
        newScore.text = answers[answerCount];

        // check the user answer against each valid answer
        for (let j = 0; j < questions[i].answers.length; j++) {
          newScore.correct = compareAnswers(questions[i].answers[j].text, answers[answerCount]);
          if (newScore.correct) {
            break;
          }
        }

        scores.push(newScore);
        answerCount++;
      }

      // multiple text box
      if (questions[i].type === 3) {
        newScore.questionId = questions[i].questionId;
        const currentCount = answerCount;
        const usedAnswers = [];

        // check each user answer
        const currentAnswers = questions[i].answers;
        for (let j = currentCount; j < questions[i].groupLength + currentCount; j++) {
          const copyScore = Object.assign({}, newScore);
          copyScore.text = answers[j];

          // confirm that the answer has not been used yet
          let notUsed = true;
          for (let k = 0; k < usedAnswers.length; k++) {
            if (compareAnswers(usedAnswers[k], answers[j])) {
              notUsed = false;
              break;
            }
          }

          // check each user answer against each valid answer
          if (notUsed) {
            for (let k = 0; k < questions[i].answers.length; k++) {
              copyScore.correct = compareAnswers(questions[i].answers[k].text, answers[j]);
              if (copyScore.correct) {
                // list all answers in the current group as used (don't allow reusing variations of the same thing)
                for (let l = 0; l < questions[i].answers.length; l++) {
                  if (questions[i].answers[l].groupId === questions[i].answers[k].groupId) {
                    usedAnswers.push(questions[i].answers[l].text);
                  }
                }
                break;
              }
            }
          }

          scores.push(copyScore);
          answerCount++;
        }

      }
    }

    const postObj = {
      scores: scores
    };

    // submit the scores
    const results = await fetch(`${API_URL}/quizzes/${pageId}/scores`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj),
    });

    if (results.ok) {
      // go to the results page
      history.push(`/quiz-results/${pageId}`);
    } else {
      setErrorMessage("An internal server error occurred. Please try again later.");
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
        <Question
          key={question.questionId}
          questionId={question.questionId}
          text={question.text}
          answers={question.answers}
          type={question.type}
          imageUrl={question.imageUrl}
          groupLength={question.groupLength}
        />
      )}

      <Error message={errorMessage} />

      <div className="mt-4 submit-quiz-box">
        <button className="submit-quiz btn btn-lg btn-success pull-right" onClick={() => submitQuiz()}>
          Submit Answers
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
export default Quiz;
