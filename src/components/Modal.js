import React from 'react';
import AddButton from './AddButton';
import InputField from './InputField'

class Modal extends React.Component {
	state = { 
		counter: 0, //count number of inputs added
		title: "",
		tidbits: {}
		 //hold each input
	} 

	incrementCounter(count) {
		let key = (count+1).toString();
		let copy = {...this.state.tidbits};
		copy[key] = "";
		this.setState({tidbits: copy});
		console.log(this.state.tidbits);		
		this.setState({ counter: count + 1 });
	}

	handleSubmit = () => {
		console.log(this.state.tidbits);
	}

	handleInput = (e, index) => {
		let key = index.toString();
		let copy = {...this.state.tidbits};
		console.log(copy);
		copy[key] = e.target.value;
		this.setState({tidbits: copy});
		/* Example of filled out Tidbits
		* {
		*   '0': {			
		*			'text': "Hello"
		* 		}
		*		'1': { 
		* 		'text': "Bye"
		* 		}
		*	} 				
		*/
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			jsx.push(
				<div className='row mb-2' key={i+1}>
					<div className="col-2" >
						<select className="form-control" id="exampleFormControlSelect1">
							<option>Plus</option>
							<option>Minus</option>
							<option>Thumbs Up</option>
							<option>Skull</option>
							<option>Trophy</option>
						</select>
					</div>

					<div className="input-group col-10">
						<InputField 
							title='Text' 
							placeholder='Insert Text' 
							handleInput={this.handleInput}
							index={this.state.counter}
						/>
					
						<button className='btn btn-success ml-2'>Add Subpoint</button>
					</div>

				</div>
			)
		}
		return jsx;
	}

	render() {
		return (
			<div className='text-center mt-3 mb-2'>
				<i
					className='fas fa-plus-circle text-primary'
					style={{ transform: 'scale(2)' }}
					data-toggle="modal" data-target="#exampleModal"
				></i>

				<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create New Category</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								
								<div className='row'>
									<div className='input-group mb-3 col-12'>
										<InputField 
											title='Category Title' 
											placeholder='Insert Text'
											handleInput={(e) => this.setState({title: e.target.value})}/>
									</div>
								</div>
							

								{this.generateInputs()}


								<AddButton onClick={() => this.incrementCounter(this.state.counter)} />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Create Category</button>
								<button type="button" className="btn btn-info" onClick={() => console.log(this.state.tidbits)}>Debug</button>
							</div>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default Modal;
