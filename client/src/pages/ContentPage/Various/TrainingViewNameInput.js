import React, { useState } from 'react'
import './TrainingViewNameInput.css'

function TrainingViewNameInput() {
	const [inputValue, setInputValue] = useState('')

	const handleFormSubmit = e => {
		e.preventDefault()
		alert('form submitted')
	}

	return (
		<div className="training-name-container">
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="Enter training view name"
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
				/>
				<button type="submit" className="btn btn-primary btn-save">
					Save
				</button>
			</form>
		</div>
	)
}

export default TrainingViewNameInput
