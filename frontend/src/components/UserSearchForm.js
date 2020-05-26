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
    <div id="user-search-container">

      <h2>Search Users</h2>

      <form id="search-form" onSubmit={(e) => submitHandler(e)}>
        <input type="text" id="input-search" />
        <button id="search-user-button">
          Search
        </button>
      </form>

      <div id="filter-container">

        <select id="select-role" className="user-filter" defaultValue={"0"}>
        <option value="0">Any Role</option>
        <option value="1">{formatRole(1)}</option>
        <option value="2">{formatRole(2)}</option>
        <option value="3">{formatRole(3)}</option>
        <option value="4">{formatRole(4)}</option>
        </select>

      </div>

    </div>
  );
}
export default UsersSearchForm;

UsersSearchForm.propTypes = {
  onSearch: PropTypes.func
};