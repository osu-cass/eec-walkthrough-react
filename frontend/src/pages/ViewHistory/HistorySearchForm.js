import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import "./HistorySearchForm.css";

// search form for finding change history
function HistorySearchForm(props) {

  // perform a new link search when form is submitted
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    const select = document.getElementById("select-link-types").value;

    props.onDatesChange(select);

  }

  return (
    <div id="link-search-container" className="justify-content-between p-3 mt-3 mb-5 text-dark-50 bg-white rounded shadow">

      <form id="search-form" >
        <div className="form-group">

          <div className="row justify-content-center">

            <div className="col-sm-4">
              <label form="formGroup" className="flex-grow-1 font-weight-bold h5">Start Date</label>
              <div className="form-group row">
                <div className="col-10">
                  <input className="form-control" type="date" id="date-report-start" />
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <label form="formGroup" className="flex-grow-1 font-weight-bold h5">End Date</label>
              <div className="form-group row">
                <div className="col-10">
                  <input className="form-control" type="date" id="date-report-end" />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-sm-2">
              <Button variant="info" onClick={() => {}}>
                <span className="text-white">Generate Report</span>
              </Button>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
}
export default HistorySearchForm;

HistorySearchForm.propTypes = {
  onDatesChange: PropTypes.func
};