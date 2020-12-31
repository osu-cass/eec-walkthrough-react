import React from "react";
import PropTypes from "prop-types";
import "./OrderQuestionsButton.css";

// A pair of buttons used to rearrange cards and headers
function OrderQuestionsButton(props) {

  return props.role >= 5 || !props.approved ? (
    <div>
      <button className={`btn btn-success btn-order-questions btn-sm mx-2 px-3 mb-2 d-print-none pull-right`}
        onClick={() => props.onMoveQuestion(props.questionId, 0, props.approved)}
      >
        <i className="fas fa-fw fa-arrow-down" />
      </button>
      <button className={`btn btn-success btn-order-questions btn-sm mx-2 px-3 mb-2 d-print-none pull-right`}
        onClick={() => props.onMoveQuestion(props.questionId, 1, props.approved)}
      >
        <i className="fas fa-fw fa-arrow-up" />
      </button>
    </div>
  ) : (
    null
  );

}
export default OrderQuestionsButton;

OrderQuestionsButton.propTypes = {
  questionId: PropTypes.number,
  approved: PropTypes.any,
  role: PropTypes.number,
  onMoveQuestion: PropTypes.func
};