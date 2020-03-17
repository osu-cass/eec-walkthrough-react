import React, {Fragment}  from 'react';

class InputField extends React.Component {
	state = {
		input: ""
	}

	render(){
		return(
				<Fragment>
					<div class="input-group-prepend">
						<span class="input-group-text" id="basic-addon1">{this.props.title}</span>
					</div>
					<input type="text" class="form-control" placeholder={this.props.placeholder} aria-label="Insert Username" aria-describedby="basic-addon1" onChange={(e) => this.props.handleInput(e, this.props.index)}/>
				</Fragment>
		);
	}
}

export default InputField;
