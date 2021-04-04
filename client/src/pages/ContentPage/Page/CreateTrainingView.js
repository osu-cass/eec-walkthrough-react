import React from 'react'

function CreateTrainingView({ role, mode }) {
	if (mode == 3) {
		return (
			<div>
				<p>This is create training mode</p>
			</div>
		)
	} else {
		return null
	}
}

export default CreateTrainingView
