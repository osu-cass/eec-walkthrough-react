import React, { useState } from 'react'
import './TrainingViewNameInput.css'
import { useSelector } from 'react-redux'
import { getTrainingPageItems } from '../../../redux/selectors'
import styled from '@emotion/styled'

const ErrorContainer = styled.div`
	margin-top: 0.3rem;
	color: #dc3545;
	font-size: 0.9rem;
`

function TrainingViewNameInput() {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState('')
	const trainingPageItems = useSelector(getTrainingPageItems)

	const handleFormSubmit = e => {
		setError('')
		e.preventDefault()
		if (!inputValue) {
			setError('Please enter a training path name')
			return
		}
		if (!trainingPageItems.length) {
			setError('Please select at least one training item')
			return
		}
		console.log(trainingPageItems)
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
						setError('')
					}}
				/>
				<button type="submit" className="btn btn-primary btn-save">
					Save
				</button>
			</form>
			{error && <ErrorContainer>{error}</ErrorContainer>}
		</div>
	)
}

export default TrainingViewNameInput
