import React from "react";
import PropTypes from "prop-types";
import {formatRole} from "../utilities/formatRole";
import "./UserSearchForm.css";

// search form for finding users
function UsersSearchForm(props) {

  // perform a new user search when form is submitted
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // perform a new search for users
    const newCursor = {
      primary: "null",
      secondary: "null"
    };
    props.onSearch(newCursor);

  }

  return (
    <div id="user-search-container" className="justify-content-between p-3 my-3 text-dark-50 bg-white rounded shadow">

      <form id="search-form" onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">

          <label form="formGroup" className="flex-grow-1 font-weight-bold h4">Search Users</label>

          <div className="input-group">
            <input type="text" className="form-control" id="input-search-user" placeholder="Search by name, email, or id" />
            <div className="input-group-append">
              <button type="submit" id="search-user-button" className="btn btn-info mb-2">Search</button>
            </div>
          </div>

          <select id="select-role" className="user-filter custom-select my-1 mr-sm-2" defaultValue={"0"}>
            <option value="0">Any Role</option>
            <option value="1">{formatRole(1)}</option>
            <option value="2">{formatRole(2)}</option>
            <option value="3">{formatRole(3)}</option>
            <option value="4">{formatRole(4)}</option>
          </select>

        </div>
      </form>

    </div>
  );
}
export default UsersSearchForm;

UsersSearchForm.propTypes = {
  onSearch: PropTypes.func
};