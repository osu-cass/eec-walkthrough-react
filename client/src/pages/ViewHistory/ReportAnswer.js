import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import HighlightText from "../ContentPage/Various/HighlightText";


// Answer history for a single answer
function ReportAnswer(props) {

  const [newGroups, setNewGroups] = useState([]);
  const [oldGroups, setOldGroups] = useState([]);

  // sort answers into groups
  useEffect(() => {
    // sort if the new question is of a type that uses groups
    if (props.questionTypeNew === 3) {
      for (let i = 0; i < props.newAnswers.length; i++) {
        const groups = [];
        let currentGroupId = 0;
        let currentGroup = [];
        for (let j = 0; j < props.newAnswers.length; j++) {
          const currentAnswers = props.newAnswers;
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
        setNewGroups(groups);
      }
    }

    // sort if the old question is of a type that uses groups
    if (props.questionTypeOld === 3) {
      for (let i = 0; i < props.oldAnswers.length; i++) {
        const groups = [];
        let currentGroupId = 0;
        let currentGroup = [];
        for (let j = 0; j < props.oldAnswers.length; j++) {
          const currentAnswers = props.oldAnswers;
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
        setOldGroups(groups);
      }
    }
  }, [props.newAnswers, props.oldAnswers, props.questionTypeNew, props.questionTypeOld]);

  // find the normal answer index for a group answer
  function findNormalIndex(newAnswer, answerId) {
    if (newAnswer) {
      for (let i = 0; i < props.newAnswers.length; i++) {
        if (props.newAnswers[i].answerId === answerId) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < props.oldAnswers.length; i++) {
        if (props.oldAnswers[i].answerId === answerId) {
          return i;
        }
      }
    }
    return -1;
  }

  return (
    <Fragment>
      {/* For multiple choice or select all correct */}
      {((props.questionTypeNew === 1 || props.questionTypeNew === 4) && props.newMode) || ((props.questionTypeOld === 1 || props.questionTypeOld === 4) && !props.newMode) ? (
        <Fragment>
          <div className="answers-block-edit">
            {props.newMode ? (

              <Fragment>
                {props.newAnswers.map((answer, i) =>
                  <Fragment key={i}>
                    {props.oldAnswers.length > i ? (
                      <div>
                        <HighlightText
                          newMode={true}
                          newText={answer.text}
                          oldText={props.oldAnswers[i].text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                        <Fragment>
                          {answer.correct ? (
                            <i className={`fas fa-fw fa-check ml-2`} />
                          ) : (
                            <i className={`fas fa-fw fa-times ml-2`} />
                          )}
                        </Fragment>
                      </div>
                    ) : (
                      <div>
                        <HighlightText
                          newMode={true}
                          newText={answer.text}
                          oldText={""}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                        <Fragment>
                          {answer.correct ? (
                            <i className={`fas fa-fw fa-check ml-2`} />
                          ) : (
                            <i className={`fas fa-fw fa-times ml-2`} />
                          )}
                        </Fragment>
                      </div>
                    )}
                  </Fragment>
                )}
              </Fragment>

            ) : (

              <Fragment>
                {props.oldAnswers.map((answer, i) =>
                  <Fragment key={i}>
                    {props.newAnswers.length > i ? (
                      <div>
                        <HighlightText
                          newMode={false}
                          newText={props.newAnswers[i].text}
                          oldText={answer.text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                        <Fragment>
                          {answer.correct ? (
                            <i className={`fas fa-fw fa-check ml-2`} />
                          ) : (
                            <i className={`fas fa-fw fa-times ml-2`} />
                          )}
                        </Fragment>
                      </div>
                    ) : (
                      <div>
                        <HighlightText
                          newMode={false}
                          newText={""}
                          oldText={answer.text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                        <Fragment>
                          {answer.correct ? (
                            <i className={`fas fa-fw fa-check ml-2`} />
                          ) : (
                            <i className={`fas fa-fw fa-times ml-2`} />
                          )}
                        </Fragment>
                      </div>
                    )}
                  </Fragment>
                )}
              </Fragment>

            )}
          </div>
        </Fragment>
      ) : (
        null
      )}

      {/* For single text entry */}
      {(props.questionTypeNew === 2 && props.newMode) || (props.questionTypeOld === 2 && !props.newMode) ? (
        <Fragment>
          <div className="answers-block-edit">
            {props.newMode ? (

              <Fragment>
                {props.newAnswers.map((answer, i) =>
                  <Fragment key={i}>
                    {props.oldAnswers.length > i ? (
                      <div>
                        <HighlightText
                          newMode={true}
                          newText={answer.text}
                          oldText={props.oldAnswers[i].text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                      </div>
                    ) : (
                      <div>
                        <HighlightText
                          newMode={true}
                          newText={answer.text}
                          oldText={""}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                      </div>
                    )}
                  </Fragment>
                )}
              </Fragment>

            ) : (

              <Fragment>
                {props.oldAnswers.map((answer, i) =>
                  <Fragment key={i}>
                    {props.newAnswers.length > i ? (
                      <div>
                        <HighlightText
                          newMode={false}
                          newText={props.newAnswers[i].text}
                          oldText={answer.text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                      </div>
                    ) : (
                      <div>
                        <HighlightText
                          newMode={false}
                          newText={""}
                          oldText={answer.text}
                          elementType={props.smallText ? (0) : (2)}
                          newId={props.newId + "answer" + i}
                        />
                      </div>
                    )}
                  </Fragment>
                )}
              </Fragment>

            )}
          </div>
        </Fragment>
      ) : (
        null
      )}

      {/* For multiple text fields */}
      {(props.questionTypeNew === 3 && props.newMode) || (props.questionTypeOld === 3 && !props.newMode) ? (
        <Fragment>
          {props.newMode ? (

            <Fragment>
              {newGroups.map((group, i) =>
                <Fragment key={i}>
                  <h4 className="mt-2">Answer Group #{i + 1}</h4>
                  <div className="answers-block-edit">
                    {group.map((answer, j) =>

                      <div className="row mb-2 pl-3" key={answer.answerId}>
                        <span className="mb-4">

                          <HighlightText
                            newMode={true}
                            newText={answer.text}
                            oldText={
                              findNormalIndex(true, answer.answerId) >= 0 &&
                              props.oldAnswers.length > findNormalIndex(true, answer.answerId) ?
                                (props.oldAnswers[findNormalIndex(true, answer.answerId)].text) : ("")
                            }
                            elementType={props.smallText ? (0) : (2)}
                            newId={i + "group" + j + "answer"}
                          />

                        </span>
                      </div>

                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>

          ) : (

            <Fragment>
              {oldGroups.map((group, i) =>
                <Fragment key={i}>
                  <h4 className="mt-2">Answer Group #{i + 1}</h4>
                  <div className="answers-block-edit">
                    {group.map((answer, j) =>

                      <div className="row mb-2 pl-3" key={answer.answerId}>
                        <span className="mb-4">

                          <HighlightText
                            newMode={false}
                            newText={
                              findNormalIndex(false, answer.answerId) >= 0 &&
                              props.newAnswers.length > findNormalIndex(false, answer.answerId) ?
                                (props.newAnswers[findNormalIndex(false, answer.answerId)].text) : ("")
                            }
                            oldText={answer.text}
                            elementType={props.smallText ? (0) : (2)}
                            newId={i + "group" + j + "answer"}
                          />

                        </span>
                      </div>

                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>

          )}
        </Fragment>
      ) : (
        null
      )}
    </Fragment>
  );

}
export default ReportAnswer;

ReportAnswer.propTypes = {
  newId: PropTypes.number,
  newMode: PropTypes.bool,
  newAnswers: PropTypes.array,
  oldAnswers: PropTypes.array,
  questionTypeNew: PropTypes.number,
  questionTypeOld: PropTypes.number,
  smallText: PropTypes.bool
};