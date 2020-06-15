import React from "react";
import {Card} from "react-bootstrap";
import "./Error404.css";

function Error404() {
  return (
    <div className="container">
      <Card className="my-5 py-5 mb-5" id="404-error-container">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-md-12 text-center py-5 my-5">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
              <a href="/" class="btn btn-link">Back to Home</a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default Error404;
