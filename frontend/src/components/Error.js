import React from 'react';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';

const Error = (props) => {
	return props.empty ? (
		<Alert className="active mt-2" variant="danger">
			{props.message}
		</Alert>
	) : <div className="hide" />;
}

Error.propTypes = {
	empty: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

export default Error
