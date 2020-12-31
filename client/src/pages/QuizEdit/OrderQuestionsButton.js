import React from "react";
import PropTypes from "prop-types";
import "./OrderQuestionsButton.css";

// A pair of buttons used to rearrange cards and headers
function OrderQuestionsButton(props) {

  return props.role >= 5 || !props.approved ? (
    <div>
      <button className={`btn ${props.approved ? "btn-success" : "btn-info"} btn-order-questions btn-sm mx-2 px-3 mb-2 d-print-none pull-right`}
        onClick={() => props.handleMove(props.questionId, true, props.approved)}
        title={props.approved ? "Move approved question" : "Move pending question"}
      >
        <i className="fas fa-fw fa-arrow-up" />
      </button>
      <button className={`btn ${props.approved ? "btn-success" : "btn-info"} btn-order-questions btn-sm mx-2 px-3 mb-2 d-print-none pull-right`}
        onClick={() => props.handleMove(props.questionId, false, props.approved)}
        title={props.approved ? "Move approved question" : "Move pending question"}
      >
        <i className="fas fa-fw fa-arrow-down" />
      </button>
    </div>
  ) : (
    null
  );

}
export default OrderQuestionsButton;

OrderQuestionsButton.propTypes = {
  questionId: PropTypes.number,
  handleMove: PropTypes.func,
  approved: PropTypes.bool,
  role: PropTypes.number
};