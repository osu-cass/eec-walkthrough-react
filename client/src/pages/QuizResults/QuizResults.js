import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {API_URL} from "../../utilities/constants";
import {useParams} from "react-router-dom";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import QuestionResults from "./QuestionResults";
import {NavLink} from "react-router-dom";
import "./QuizResults.css";

// Results page for a submitted quiz
function QuizResults() {

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const {pageId} = useParams();

  // Gets quiz results when the page first loads
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        // Fetch quiz info
        const results = await fetch(`${API_URL}/quizzes/${pageId}/scores`, {
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

          let correct = 0;
          let incorrect = 0;

          // add the answers given by the user to each question
          for (let i = 0; i < obj.questions.length; i++) {
            const scores = [];
            const questionId = obj.questions[i].questionId;
            for (let j = 0; j < obj.scores.length; j++) {
              if (obj.scores[j].questionId === questionId) {
                if (obj.scores[j].correct) {
                  correct++;
                } else {
                  incorrect++;
                }
                scores.push(obj.scores[j]);
              }
            }
            obj.questions[i].scores = scores;
          }

          setCorrect(correct);
          setIncorrect(incorrect);
          setQuestions(obj.questions);
        } else {
          const obj = await results.json();

          if (results.status === 404) {
            console.error("Couldn't find quiz");
            setError(1);
          } else if (results.status === 500 || typeof obj.error === "undefined") {
            console.error("An internal server error occurred while trying to move the card.");
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

  return !error ? (
    <div className="container quiz-page-container my-5">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            {title} Quiz Results
          </h4>
        </div>
      </div>

      {questions.map((question) =>
        <QuestionResults
          key={question.questionId}
          questionId={question.questionId}
          text={question.text}
          scores={question.scores}
          type={question.type}
          imageUrl={question.imageUrl}
        />
      )}

      {/* Overall results */}
      <div
        className="prompt-container mb-3 px-4 py-5 bg-white card rounded shadow-sm"
      >
        <h5 className="text-center">
          Out of {correct + incorrect} questions, you got {correct} questions correct
        </h5>
        <h2 className="font-weight-bold text-center">
          Overall you got {((correct / (correct + incorrect)).toFixed(2)) * 100}% of questions correct
        </h2>
      </div>

      {/* Buttons for returning to other pages */}
      <div className="mt-4 submit-quiz-box">
        <NavLink className="home-footer-nav-link" to={`/wiki/search-results/${pageId}`}>
          <button className="submit-quiz btn btn-lg btn-success pull-right ml-4">
            Return to {title}
          </button>
        </NavLink>

        <NavLink className="home-footer-nav-link" to={`/quiz/${pageId}`}>
          <button className="submit-quiz btn btn-lg btn-info pull-right">
            Try Again
          </button>
        </NavLink>
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
export default QuizResults;
