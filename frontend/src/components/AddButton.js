import React from 'react';
import Modal from './Modal';
import Button from 'react-bootstrap/Button';

const AddButton = (props) => {
	return (
		<Button
			variant="primary"
			onClick={props.onClick}
		>
			<i
				className='fas fa-plus-circle text-white mr-2'
				style={{ transform: 'scale(1.5)' }}></i>
			Add Item
		</Button>
	);
}

export default AddButton;
