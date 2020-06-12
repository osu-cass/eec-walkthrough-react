import React from "react";
import PropTypes from "prop-types";

const SubjectIntro = props => {
  return (
    <div className="my-3 p-3 bg-white card rounded shadow-sm">
      <div className="row">
        <div className="col-8">
          <h5 className='font-weight-bold'>{props.header}</h5>
          <p>{props.description}</p>
        </div>
        <div className="col-4 text-center">
          <img src={props.img} alt={props.header} className="subjectIntro rounded img-fluid" style={{maxHeight: "23em"}} />
        </div>
      </div>
    </div>
  );
};
export default SubjectIntro;

SubjectIntro.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string
};