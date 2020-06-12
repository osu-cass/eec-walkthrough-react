import React from "react";
import PropTypes from "prop-types";

class ResourceTidbit extends React.Component {
  render() {
    return (
      <div className="mt-2">
        <div className={`mb-2`}>
          <i className={`fas fa-info  mr-2`}></i>
          <span>
            {this.props.resourceType}
          </span>
          <div className='pl-5 mt-2'>

            <i className="fas fa-copy mr-2" /><a href={this.props.URL} className="text-primary"> {this.props.URLText} </a> <br></br>
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}
export default ResourceTidbit;

ResourceTidbit.propTypes = {
  resourceType: PropTypes.any,
  URL: PropTypes.any,
  URLText: PropTypes.any,
  description: PropTypes.any
};
