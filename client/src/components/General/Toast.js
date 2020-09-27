import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Toast.css";

// toast that is centered on screen, overlaying the rest of the page content
function Toast (props) {

  const [timeoutId, setTimeoutId] = useState(null);

  // close the toast automatically after a specified amount of time
  useEffect(() => {
    if (props.show) {
      if (timeoutId === null) {
        setTimeoutId(setTimeout(() => { props.handleClose(); }, 3000));
      }
    } else {
      setTimeoutId(null);
    }
  }, [props, timeoutId]);

  return (
    <div className={`toast ${props.show ? "show" : "hide"} toast-overlay`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="mr-auto h4 mt-2"> {props.text} </strong>
        <button type="button" className="ml-3 my-1 close" onClick={() => props.handleClose()}>
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
    </div>
  );
}
export default Toast;

Toast.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
  handleClose: PropTypes.func
};