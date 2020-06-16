import React from "react";
import PropTypes from "prop-types";
import "./PageDescription.css";

// Card that describes the page and includes an image
function PageDescription(props) {
  return (
    <div className={`${props.approved ? "card-approved" : "card-review"} my-3 p-3 card rounded shadow-sm`}>
      <div className="row">
        <div className="col-8">
          <h5 className='font-weight-bold'>{props.header}</h5>
          <p>{props.description}</p>
        </div>
        <div className="col-4 text-center">
          <img src={props.img} alt={props.header} className="header rounded img-fluid" style={{maxHeight: "23em"}} />
        </div>
      </div>
    </div>
  );
}
export default PageDescription;

PageDescription.propTypes = {
  approved: PropTypes.number,
  header: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string
};