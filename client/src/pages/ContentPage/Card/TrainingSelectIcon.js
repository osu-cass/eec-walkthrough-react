import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
function TrainingSelectIcon({ selected, onSelect }) {



	return (
		<span className="training-select-icon" onClick={onSelect}>
			{selected ? (
				<FaCheckCircle style={{ color: '#007bff' }} />
			) : (
				<FiPlusCircle />
			)}
		</span>
	)
}

export default TrainingSelectIcon
