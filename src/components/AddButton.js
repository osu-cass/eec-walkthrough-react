import React from 'react';

const AddButton = (props) => {
	return(	
		<div className='text-center mt-3 mb-2'>
			<i 
				className='fas fa-plus-circle text-primary' 
				style={{transform: 'scale(2)'}}
				onClick={props.onClick}
			></i>
		</div>
	);
}

export default AddButton;
