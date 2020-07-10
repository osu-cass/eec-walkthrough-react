import React from "react";
import {Card} from "react-bootstrap";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import "./NonPublicPage.css";
import {setPublic} from "../../utilities/publicMode";

// page that is displayed when a privileged user attempts to view a private page
function NonPublicPage(props) {

  // update the public value
  function toggleMode(publicValue) {
    setPublic(publicValue);
    props.onPublicMode(publicValue);
  }

  return (
    <div className="container">
      <Card className="my-5 py-5 mb-5" id="500-error-container">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-md-12 text-center py-5 my-5">
              <span className="display-3 d-block mb-2">This Page is Not Public</span>
              <div className="mb-4 lead">While hiding internal content you are not able to view this page.</div>
              <div className="mb-4 lead">Would you like to show internal content?</div>
              <div>
                <Button
                  size="lg"
                  variant="info"
                  onClick={() => toggleMode(0)}
                >
                  <span className="text-white">Show Internal Content</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default NonPublicPage;

NonPublicPage.propTypes = {
  onPublicMode: PropTypes.func
};