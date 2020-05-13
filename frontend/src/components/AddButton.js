import React from 'react';
import Modal from './Modal';

const AddButton = (props) => {
	return (
		<i
			className='fas fa-plus-circle text-primary'
			style={{ transform: 'scale(2)' }}
			onClick={props.onClick}
		></i>
	);
}

export default AddButton;
