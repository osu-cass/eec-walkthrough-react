import React from 'react';
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';

const Error = (props) => {
	return props.empty ? (
<<<<<<< HEAD
=======
		<Alert class="active" variant="danger">
			{props.message}
		</Alert>
		/*
>>>>>>> 319f16c25fc2c8a4236e370517bba76d67c59ddf
		<Alert class="active" variant="danger">
			{props.message}
		</Alert>
	) : <div class="hide" />;
}

Error.propTypes = {
	empty: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired
};

export default Error
