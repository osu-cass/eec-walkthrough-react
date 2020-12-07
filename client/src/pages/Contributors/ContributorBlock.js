import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./ContributorBlock.css";

// A container that describes a contributor
function ContributorBlock(props) {

  return (
    <div className="contributor-container">
      <div className="d-block mt-2 mb-4 h-100">
        <img
          src={props.imageUrl}
          alt={props.name}
          onError={(e) => e.target.src = "/missing.png"}
          className="img-thumbnail-contributor px-3 py-3"
        />

        {/* Show the URL if this is a pending request */}
        {props.pending ? (
          <Fragment>
            <div className="mx-2 mb-2">
              <span>
                <strong>Image URL:</strong> {props.imageUrl}
              </span>
            </div>
          </Fragment>
        ) : (
          null
        )}

        <h2>{props.name}</h2>
        <h5>{props.title}</h5>

        <div className="contributor-main-text mt-4 px-4">
          <span>{props.description}</span>
        </div>

        {/* Show options to accept or reject pending requests */}
        {props.pending ? (
          <div className="row my-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => props.onRequest(props.contributorId, 0)}
              >
                Reject Request
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => props.onRequest(props.contributorId, 1)}
              >
                Accept Request
              </button>
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
}
export default ContributorBlock;

ContributorBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  contributorId: PropTypes.number,
  pending: PropTypes.bool,
  onRequest: PropTypes.func
};
