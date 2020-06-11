import React from "react";
import {withRouter} from "react-router-dom";
import "./PageSearch.css";

// search field used to find subject and industry pages
function PageSearch(props) {

  // redirect to a new page when the user searches
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // redirect to a search page for the requested value
    let textValue = document.getElementById("input-search-pages").value;
    if (textValue !== "") {
      document.getElementById("input-search-pages").value = "";
      textValue = textValue.replace(/\s/g, "%20");
      props.history.push(`/search/${textValue}`);
    }

  }

  return (
    <div className="search mr-3 nav-item">
      <form className="form-inline" onSubmit={(e) => submitHandler(e)}>
        <input
          type="search"
          className="form-control mr-sm-3"
          id="input-search-pages"
          placeholder="Search for pages"
        />
        <button className="border-0 bg-dark" id="magnify-search-button"
          onClick={(e) => submitHandler(e)}
        >
          <i className="input-search-pages fas fa-search text-white"></i>
        </button>
      </form>
    </div>
  );
}
export default withRouter(PageSearch);
