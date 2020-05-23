import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
	return props.empty ? (
		<div className="alert alert-danger active" role="alert">
			{props.message}
		</div>
	) : <div className="hide" />;
}

Error.propTypes = {
	empty: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

export default Error
