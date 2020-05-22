import React from 'react';
// import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';

const Error = (props) => {
	return props.empty ? (
		<div class="alert alert-danger active" role="alert">
			{props.message}
		</div>
		/*
		<Alert class="active" variant="danger">
			{props.message}
		</Alert>
		 */
	) : <div class="hide" />;
}

Error.propTypes = {
	empty: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

export default Error
