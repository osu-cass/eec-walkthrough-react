import React from 'react'

const Loading = () => {
	return(
		<div class="d-flex justify-content-center">
			<div class="spinner-border mt-5" style={{width: "3rem", height: "3rem"}} role="status">
		    <span class="sr-only">Loading...</span>
		  </div>
		</div>
	);
}

export default Loading
