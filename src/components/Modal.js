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
		tidbits: {},
		subpointDepths: []
		 //hold each input
	} 

	incrementCounter = () => {
		let count = this.state.counter;
		let key = (count).toString();
		let copy = {...this.state.tidbits};
		copy[key] = "";	//Initialize empty
		this.setState({ tidbits: copy });
		this.setState({ counter: count + 1 });

		//Create subpoint counter instance, starts at 0 for root
		let copy2 = [...this.state.subpointDepths];
		copy2.push(0);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is
		console.log(copy2);

	}
	
	updateSubpoints(idx){
		idx = parseInt(idx);
		var copy2 = [...this.state.subpointDepths];
		copy2.splice(idx+1, 0, copy2[idx]+1);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is

		//Increment counter
		var count = this.state.counter;
		var key = (idx+1).toString();
		var copy = {...this.state.tidbits};
		copy[key] = "";	//Initialize empty
		this.setState({ tidbits: copy });
		this.setState({ counter: count + 1 });
		//[parent, child, child, child of child , parent, child , parent]
		//[  0   ,   1  ,   1  ,       2        ,   0   ,   1   ,    0  ]
		//[ each index corresponds to this.state.tidbits ] 
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

	getDepth(idx){
		let jsx = [];
		let i = 0;
		for(i = 0; i < this.state.subpointDepths[idx]; i++)
			jsx.push(<div key={i} className="pl-3"></div>);
		return jsx;
//		return (this.state.subpointDepths[idx] !== 0) ? "pl-5" : "";
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			let subpointDepth = this.state.subpointDepths[i]
			jsx.push(
				<div className={`row mb-2`} key={i+1}>
					{this.getDepth(i)}
					<div className="col-1 mr-3">
						<Dropdown key={i} list={this.generateTidbitTypes()} /> 
					</div>

					<div className="input-group col-9">
						<InputField
							title='Text' 
							handleInput={this.handleInput}
							index={i}
						/>
						{subpointDepth <= 9 && 
						<button className='btn btn-success btn-sm ml-2' key={i} data-index={i} onClick={(e) => this.updateSubpoints(e.target.getAttribute("data-index"))}>
							<i className='fas fa-plus'/> Subpoint
						</button>
						}
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
					<div className="modal-dialog modal-xl" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
									<AddButton onClick={this.incrementCounter} />
								</div>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Create Category</button>
							</div>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default Modal;
