import React from "react";
import PropTypes from "prop-types";
import "./LinkSearchForm.css";

// search form for finding links
function LinkSearchForm(props) {

  // perform a new link search when form is submitted
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    const select = document.getElementById("select-link-types").value;

    props.onFilterChange(select);

  }

  return (
    <div id="link-search-container" className="justify-content-between p-3 mt-3 mb-5 text-dark-50 bg-white rounded shadow">

      <form id="search-form" >
        <div className="form-group">

          <label form="formGroup" className="flex-grow-1 font-weight-bold h5">Filter Links</label>

          <select id="select-link-types" className="link-filter custom-select my-1 mr-sm-2" defaultValue={"0"}
            onChange={(e) => submitHandler(e)}
          >
            <option value="0">All Links</option>
            <option value="1">Invalid Links</option>
          </select>

        </div>
      </form>

    </div>
  );
}
export default LinkSearchForm;

LinkSearchForm.propTypes = {
  onFilterChange: PropTypes.func
};