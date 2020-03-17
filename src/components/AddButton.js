import React from 'react';
import Modal from './Modal';

const AddButton = (props) => {
	return (
		<div className='text-center mt-3 mb-2' onClick={props.onClick}>
			<i
				className='fas fa-plus-circle text-primary'
				style={{ transform: 'scale(2)' }}
			></i>
		</div>
	);
}

export default AddButton;
