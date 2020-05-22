import React from 'react'
// import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
	return (
		<div className="d-flex justify-content-center">
			<div className="spinner-border mt-5" style={{ width: "3rem", height: "3rem" }} role="status">
				<span className="sr-only">Loading...</span>
			</div>
			{/*
			<Spinner animation="border" role="status" className="mt-5" style={{ width: "3rem", height: "3rem" }}>
				<span className="sr-only">Loading...</span>
			</Spinner>
			 */}
		</div>
	);
}

export default Loading
