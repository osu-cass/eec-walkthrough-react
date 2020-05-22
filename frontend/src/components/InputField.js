import React, { Fragment } from 'react';

class InputField extends React.Component {
	state = {
		input: ""
	}

	render() {
		return (
			<Fragment>
				<input
					type="text"
					className="form-control"
					placeholder={this.props.placeholder}
					value={this.props.value}
					aria-label="Insert Username"
					aria-describedby="basic-addon1"
					onChange={(e) => this.props.handleInput(e, this.props.index)}
					required
				/>
				{/*
				<FormControl
					placeholder={this.props.placeholder}
					value={this.props.value}
					aria-label="Insert Username"
					aria-describedby="basic-addon1"
					onChange={(e) => this.props.handleInput(e, this.props.index)}
					required
				 */}
			</Fragment>
		);
	}
}

export default InputField;
