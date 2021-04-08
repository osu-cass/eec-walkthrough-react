import React from 'react'
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from 'react-icons/ai'
function TrainingSelectIcon({ selected, onSelect }) {
	return (
		<span className="training-select-icon" onClick={onSelect}>
			{selected ? (
				<AiOutlineCheckCircle style={{ color: '#007bff' }} />
			) : (
				<AiOutlinePlusCircle />
			)}
		</span>
	)
}

export default TrainingSelectIcon
