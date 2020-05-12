import React, { Fragment } from 'react';
import AddButton from './AddButton';
import InputField from './InputField';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import Error from './Error';
import './Modal.css'
import './Subject.css'

class Modal extends React.Component {
	state = {
		counter: 1, //count number of inputs added
		title: "",
		tidbits: [],
		tidbitIcons: [],
		subpointDepths: []
		//hold each input
	}

	componentDidMount() {
		let subpointDepths = [];
		subpointDepths.push(0);
		this.setState({ subpointDepths: subpointDepths });

		let tidbits = [];
		tidbits.push("");
		this.setState({ tidbits: tidbits })

		let tidbitIcons = [];
		tidbitIcons.push(null);
		this.setState({ tidbitIcons: tidbitIcons })

		this.setState({ errorMessage: "Error: Fill out empty inputs (title, icons, text)" });

	}

	incrementCounter = () => {
		let count = this.state.counter;
		let key = (count).toString();
		let copy = [...this.state.tidbits];


		copy.push("");	//Initialize empty
		this.setState({ tidbits: copy });
		this.setState({ counter: count + 1 });

		let copy3 = [...this.state.tidbitIcons];
		copy3.push(null);
		this.setState({ tidbitIcons: copy3 });

		//Create subpoint counter instance, starts at 0 for root
		let copy2 = [...this.state.subpointDepths];
		copy2.push(0);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is

	}

	/**
	* Update state relating to subpoint depth (how far tidbit is tabbed)
	* @param {Number} idx Index of tidbit
	* @return {State}    Updated state, no actual return value
	*/
	updateSubpoints(idx) {
		if (idx === null) {
			console.log("error ", idx, this.state.subpointDepths);
			return;
		}

		//Add 1 to current depth after parent
		idx = parseInt(idx);
		var copy2 = [...this.state.subpointDepths];
		copy2.splice(idx + 1, 0, copy2[idx] + 1);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is

		//Increment counter
		var count = this.state.counter;
		var key = (idx + 1).toString();
		var copy = [...this.state.tidbits];
		copy.splice(idx + 1, 0, "");	//Initialize empty
		this.setState({ tidbits: copy });
		this.setState({ counter: count + 1 });
		//[parent, child, child, child of child , parent, child , parent]
		//[  0   ,   1  ,   1  ,       2        ,   0   ,   1   ,    0  ]
		//[ each index corresponds to this.state.tidbits ]
	}

	/**
	* Find parent of tidbit by finding closest index of (subpoint depth - 1) to the left
	* @param {Number} idx Index of tidbit
	* @param {Number} val Value of depth of this tidbit
	* @return {Number}    Index of parent
	*/
	findParent(idx, val, ids) {
		let closestIdx = null;
		let i = 0;
		this.state.subpointDepths.forEach(function (currVal, currIdx) {
			if (currIdx >= idx)
				return closestIdx;
			if (currVal === (val - 1))
				closestIdx = currIdx;
		});
		return closestIdx !== null ? ids[closestIdx] : null;
	}

	handleSubmit = () => {
		//Check for empty inputs
		if (this.checkInputs()) {
			return
		}
		//Setup new category
		let data = {
			title: this.state.title,
			index: this.props.numCategories + 1,
			id: this.props.SubjectID,
			categoryType: this.props.categoryType
		}
		//Store tidbit ids to handle parentid
		let tidbitIDs = [];
		fetch("/cards/newCategory", { //Create new category call to server
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(function (res) {
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
			return res.json();
		}).then(async (data) => {
			for (const key in this.state.tidbits) {	//Loop through each tidbit and create new
				let data2 = {
					index: key,
					data: this.state.tidbits[key],
					id: data.insertId,
					icon: this.state.tidbitIcons[key],
					parent: this.findParent(key, this.state.subpointDepths[key], tidbitIDs)
				}
				//Need to make for loop wait on this fetch before continuing
				//Because tidbits dependent on parentid
				await fetch("/cards/newTidbit", {	//Create tidbit
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data2)
				})
					.then((response) => response.json())
					.then(function (res) {
						tidbitIDs.push(res.insertId);
					}).catch(function (err) {
						console.log(data2);
						console.log(err);
					})

			}
		}
		)
			.catch(function (err) {
				console.log(err);
			})

	}

	checkInputs() {
		let emptyFound = false;
		let errorMessage = this.state.errorMessage;
		let errorCount = 0;
		//Empty title
		if (!this.state.title.length) {
			emptyFound = true;
			errorMessage = "Error: Empty category title";
			errorCount++;
		}
		//Empty tidbit text
		this.state.tidbits.forEach((tidbit, idx) => {
			if (tidbit === "") {
				emptyFound = true;
				errorMessage = "Error: Empty tidbit text";
				errorCount++;
				return;
			}
		});
		//Empty tidbit icon
		this.state.tidbitIcons.forEach((icon, idx) => {
			if (icon === null) {
				emptyFound = true;
				errorMessage = "Error: Empty tidbit icon";
				errorCount++;
				return;
			}
		});
		if (errorCount !== 3)
			this.setState({ errorMessage: errorMessage })
		this.setState({ emptyInputs: emptyFound })
		if (emptyFound)
			return true;
		return false;
	}

	handleInput = (e, index) => {
		let key = index.toString();
		let copy = [...this.state.tidbits];
		copy[key] = e.target.value;
		this.setState({ tidbits: copy });

		/* Example of object being created
		* {
		*   '0': {
		*			'text': "Hello"
		* 		}
  	*/

	}

	/**
	* Updates dropdown icon selected for specific index
	* @param {Number} icon TidbitType ID of Icon
	* @param {Number} index Index of tidbit being changed
	* @return {State}  			Updated state, no actual return value
	*/
	updateIcon(icon, index) {
		let copy = [...this.state.tidbitIcons];
		copy[index] = icon;
		console.log(icon, index);
		this.setState({ tidbitIcons: copy });
	}

	/**
	* Returns JSX for dropdown of all icons
	* @param {Number} i Tidbit index passed from generateInputs()
	* @return {JSX}    Array of JSX of icons
	*/
	generateTidbitTypes(i) {
		let list = [];
		let jsx = [];
		let values = [];
		this.props.tidbitTypes.map((type, index) => {
			jsx.push(<div className="dropdown-item clickIcon" style={{ cursor: "pointer" }}>
				<i className={`fas fa-${type.TypeName}`} /> {type.TypeKeyword}
			</div>);
			let jsxIcon = <i className={`fas fa-${type.TypeName}`} />
			values.push([type.TypeID, jsxIcon]);
		}
		);
		list.push(jsx, values);
		return list;
	}

	getDepth(idx) {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.subpointDepths[idx]; i++)
			jsx.push(<div key={i} className="pl-3"></div>);
		return jsx;
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			let subpointDepth = this.state.subpointDepths[i]
			jsx.push(
				<div className={`row mb-2`} key={i + 1}>
					{this.getDepth(i)} {/*return indentation for subpoints*/}
					<div className="col-1 mr-3">
						<Dropdown key={i} idx={i} list={this.generateTidbitTypes(i)} handleClick={(id, idx) => this.updateIcon(id, idx)} />
					</div>

					<div className="input-group col-9">
						<InputField
							title='Text'
							handleInput={this.handleInput}
							index={i}
							value={this.state.tidbits[i]}
						/>
						{subpointDepth <= 9 &&	//set maximum depth to 10
							<button className='btn btn-success btn-sm ml-2' key={i} data-index={i} onClick={(e) => this.updateSubpoints(e.target.getAttribute("data-index"))}>
								<i className='fas fa-plus' /> Subpoint
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
											handleInput={(e) => this.setState({ title: e.target.value })} />
									</div>
								</div>


								{this.generateInputs()}
								<div className='row'>
									<div className='col-3' />
									<div className='col-6'>
										<Error
											empty={this.state.emptyInputs}
											message={this.state.errorMessage}
										/>
									</div>
								</div>

								<div className='text-left ml-2 mt-3 mb-2'>
									<AddButton onClick={this.incrementCounter} />
								</div>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Create Category</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	title: PropTypes.arrayOf(PropTypes.array)
};
/*
title={"Create New Card"}
tidbitTypes={this.props.tidbitTypes}
numCategories={this.state.categories.length}
numOpportunities={this.state.opportunities.length}
SubjectID={this.state.subjectInfo[0].SubjectID}
categoryType={1}
*/
export default Modal;
