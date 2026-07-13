import React, {useState, useEffect, Fragment} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {getProfile, logout} from "../../utilities/cookieAuth";
import {useParams, useNavigate} from "react-router-dom";
import {API_URL} from "../../utilities/constants";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import QuestionDisplay from "../QuizEdit/QuestionDisplay";
import ChangeMode from "../ContentPage/Page/ChangeMode";
import ChangePublished from "../ContentPage/Page/ChangePublished";
import {getPublished} from "../../utilities/publishedMode";
import {NavLink} from "react-router-dom";
import "./QuizMove.css";

// Page for moving quizzes questions
function QuizMove() {

  const [role] = useState(getProfile().role);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [publishedMode, setPublishedMode] = useState(getPublished());
  const {pageId} = useParams();
  const navigate = useNavigate();

  // Gets quiz info when the page first loads
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        // Fetch quiz info
        const results = await fetch(`${API_URL}/quizzes/${pageId}/pending`, {
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

          const sortedQuestions = questionSortOrder(obj.questions);

          setQuestions(sortedQuestions);

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
  }, [pageId, publishedMode]);

  // Sort questions based on their edited status and their priority
  function questionSortOrder(newQuestions) {
    const copy = [...newQuestions];
    for (let i = 0; i < copy.length; i++) {
      if (publishedMode === 0 && copy[i].tempQuestionId) {
        copy[i].realOrder = copy[i].tempPriority;
      } else {
        copy[i].realOrder = copy[i].priority;
      }
      copy.sort((a, b) => a.realOrder - b.realOrder);
    }
    return copy;
  }

  // Moves the specified question up or down one in relation to other questions
  async function onMoveQuestion(questionId, up, mode) {
    const copy = [...questions];
    let moveIndex = -1;
    let swapIndex = -1;

    // change how the questions are moved based on the current mode
    if (mode === 1) {

      // find the current published question
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].questionId === questionId) {
          moveIndex = i;

          // find the question to swap with
          if (up) {
            for (let j = (i - 1); j >= 0; j--) {
              if (copy[j].approved) {
                swapIndex = j;
                break;
              }
            }
          } else {
            for (let j = (i + 1); j < copy.length; j++) {
              if (copy[j].approved) {
                swapIndex = j;
                break;
              }
            }
          }

          // if we didn't find the question to swap with, then we stop now
          if (swapIndex === -1) {
            console.error("Unable to move question");
            return;
          }

          // swap the questions
          const swapQuestion = JSON.parse(JSON.stringify(copy[swapIndex]));
          copy[swapIndex] = JSON.parse(JSON.stringify(copy[i]));
          copy[moveIndex] = swapQuestion;
          setQuestions(copy);
          break;
        }
      }

    } else {

      // find the current unpublished question
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].questionId === questionId) {
          moveIndex = i;

          // find the question to swap with
          if (up) {
            for (let j = (i - 1); j >= 0; j--) {
              swapIndex = j;
              break;
            }
          } else {
            for (let j = (i + 1); j < copy.length; j++) {
              swapIndex = j;
              break;
            }
          }

          // if we didn't find the question to swap with, then we stop now
          if (swapIndex === -1) {
            console.error("Unable to move question");
            return;
          }

          // swap the questions
          const swapQuestion = JSON.parse(JSON.stringify(copy[swapIndex]));
          copy[swapIndex] = JSON.parse(JSON.stringify(copy[i]));
          copy[moveIndex] = swapQuestion;
          setQuestions(copy);
          break;
        }
      }

    }

    setQuestions(copy);

    // get the direction value
    const direction = up ? 1 : 0;

    // send our move to the API
    const results = await fetch(`${API_URL}/quizzes/${questionId}/move/${direction}/${mode}`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (!results.ok) {
      const obj = await results.json();

      if (results.status === 404) {
        console.error("Couldn't find question to move");
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        console.error("An internal server error occurred while trying to move the question.");
      } else {
        console.error(obj.error);
      }

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      }
    }
  }

  // handle switching the quiz mode
  function onPageMode() {
    navigate(`/quiz/${pageId}`);
  }

  return !error ? (
    <div className="container quiz-page-container my-5">

      <LoadingOverlay loading={loading} />

      {/* Title header */}
      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row w-100 ml-0">
          <div className="col align-self-center pl-0">
            <h4 className="flex-grow-1 font-weight-bold">
              {title} Quiz
            </h4>
          </div>
          <div className="col pr-0">
            <div className="btn-group align-self-center float-right">
              <ChangePublished
                role={role}
                mode={2}
                publishedMode={publishedMode}
                onPublishedMode={published => setPublishedMode(published)}
              />
              <ChangeMode
                role={role}
                mode={2}
                onPageMode={() => onPageMode()}
                moved={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz questions */}
      {questions.map((question, i) =>
        <QuestionDisplay
          question={question}
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
          deleteQuestion={() => {}}
          role={role}
          pageId={pageId}
          handleUpdate={() => {}}
          onMoveQuestion={(questionId, up, mode) => onMoveQuestion(questionId, up, mode)}
          mode={2}
          publishedMode={publishedMode}
        />
      )}

      {/* Return to page buttons */}
      <div className="mt-4 submit-quiz-box">
        <NavLink className="home-footer-nav-link" to={`/wiki/search-results/${pageId}`}>
          <button className="submit-quiz btn btn-lg btn-success pull-right ml-4">
            Return to {title}
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
export default QuizMove;
