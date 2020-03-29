import React, {Fragment} from 'react';
import AddButton from './AddButton';
import InputField from './InputField';
import Dropdown from './Dropdown';
import './Modal.css'
import './Subject.css'

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
		this.setState({ counter: count + 1 });
	}

	handleSubmit = () => {
		let data = {
			title: this.state.title,
			index: this.props.numCategories+1,
			id: this.props.SubjectID,
			opportunity: 0
		}
		fetch("/cards/newCategory", { //Create new category
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(data)
			}).then(function(res) {
				if(res.status >= 400){
					throw new Error("Bad response from server");
				}
				return res.json();
				}).then((data) => {
					for(const key in this.state.tidbits){	//Loop through each tidbit and create new
						let data2 = {
							index: key,
							data: this.state.tidbits[key],
							id: data.insertId,
							icon: 1,
							parent: null
						}
						fetch("/cards/newTidbit", {	//Create tidbit
							method: 'POST',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify(data2)
						}).then(function(res) {
							if(res.status >= 400){
								throw new Error("Bad response from server");
							}
							return res.json();
						}).catch(function(err){
							console.log(err);
						})
					}}
				)
				.catch(function(err){
				console.log(err);
			})

	
	}

	handleInput = (e, index) => {
		let key = index.toString();
		let copy = {...this.state.tidbits};
		copy[key] = e.target.value;
		this.setState({tidbits: copy});
		/* Example of object being created
		* {
		*   '0': {			
		*			'text': "Hello"
		* 		}
  	*/

	}

	generateTidbitTypes(){
		let list = [];
		let jsx = [];
		let values = [];
		this.props.tidbitTypes.map(function(type, index) {
			jsx.push(<div className="dropdown-item" style={{cursor: "pointer"}}>
					<i className={`fas fa-${type.TypeName}`} /> {type.TypeName}
				</div>);
			let jsxIcon = <i className={`fas fa-${type.TypeName}`} />
			values.push([type.TypeID, jsxIcon]);
			}
		);
		list.push(jsx, values);
		return list;
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			jsx.push(
				<div className='row mb-2' key={i+1}>
					<div className="col-1 mr-3">
						<Dropdown list={this.generateTidbitTypes()} /> 
					</div>

					<div className="input-group col-10">
						<InputField 
							title='Text' 
							placeholder='Tidbit Text' 
							handleInput={this.handleInput}
							index={i+1}
						/>
					
						<button className='btn btn-success ml-3'>Add Subpoint</button>
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

				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								
								<div className='row'>
									<div className='input-group mb-3 col-12'>
										<InputField 
											title='Category Title' 
											placeholder='Title of Category'
											handleInput={(e) => this.setState({title: e.target.value})}/>
									</div>
								</div>
							

								{this.generateInputs()}
								
								<div className='text-left ml-2 mt-3 mb-2'>
									<AddButton onClick={() => this.incrementCounter(this.state.counter)} />
								</div>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Create Category</button>
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
