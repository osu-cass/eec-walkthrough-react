import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import "./HistorySearchForm.css";

// search form for finding change history
function HistorySearchForm(props) {

  // generate a new report
  function newReport(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    const start = document.getElementById("date-report-start").value;
    const end = document.getElementById("date-report-end").value;

    if (Date.parse(end) < Date.parse(start)) {
      props.onErrorMessage("The end date cannot be earlier than the start date.");
      return;
    }

    if (start === "" || end === "") {
      props.onErrorMessage("Please select a date range before attempting to generate a report.");
      return;
    }

    props.onGenerateReport(start, end);
  }

  return (
    <div id="report-generate-container" className="justify-content-between p-3 mt-3 mb-5 text-dark-50 bg-white rounded shadow">

      <form id="search-form" >
        <div className="form-group my-2">

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
              <Button variant="info" onClick={(e) => newReport(e)}>
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
  onGenerateReport: PropTypes.func,
  onErrorMessage: PropTypes.func
};