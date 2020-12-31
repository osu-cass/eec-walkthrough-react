import React from "react";
import "./Disclaimer.css";
import {DISCLAIMER} from "../../utilities/constants";

// Generic disclaimer page
function Disclaimer() {

  return (
    <div className="container disclaimer-page-container my-5">

      <div className="d-flex header-bar justify-content-between mt-3 mb-4 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Disclaimer
          </h4>
        </div>
      </div>

      <div className="prompt-container mb-3 py-4 bg-white card rounded shadow-sm">
        <span className="disclaimer-text text-left px-4">{DISCLAIMER}</span>
      </div>

    </div>
  );
}
export default Disclaimer;
