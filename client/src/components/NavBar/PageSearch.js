import React from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import "./PageSearch.css";

// search field used to find subject and industry pages
function PageSearch(props) {

  function keyPress(e) {
    if (e.charCode === 13) {
      submitHandler(e);
    }
  }

  // redirect to a new page when the user searches
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // redirect to a search page for the requested value
    let textValue = document.getElementById("input-search-pages").value;
    let textValueS = document.getElementById("input-search-pages-s").value;
    if (textValue !== "") {
      document.getElementById("input-search-pages").value = "";
      textValue = textValue.replace(/\s/g, "%20");
      props.history.push(`/search/${textValue}`);
    } else if (textValueS !== "") {
      document.getElementById("input-search-pages-s").value = "";
      textValueS = textValueS.replace(/\s/g, "%20");
      props.history.push(`/search/${textValueS}`);
    }

  }

  return (
    <div className="input-group flex-grow-1 ml-3">
      <label className="sr-only" htmlFor="input-search-pages">Search</label>
      <input
        type="search"
        className="form-control flex-grow-1 rounded mr-sm-3 searchbar"
        id="input-search-pages"
        placeholder="Search for pages"
        onKeyPress={(e) => keyPress(e)}
      />
      <input
        type="search"
        className="form-control flex-grow-1 rounded mr-sm-3 searchbar-s"
        id="input-search-pages-s"
        placeholder="Search..."
        onKeyPress={(e) => keyPress(e)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" id="magnify-search-button"
          onClick={(e) => submitHandler(e)}
        >
          <i className="fas fa-search text-white"></i>
        </button>
      </div>
    </div>
  );
}
export default withRouter(PageSearch);

PageSearch.propTypes = {
  history: PropTypes.any
};
