import React, { Fragment } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import AddButton from './AddButton';
import InputField from './InputField';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import Error from './Error';
import './Modal.css'
import './Subject.css'

class CreateItem extends React.Component {
	state = {
		counter: 1, //count number of inputs added
		title: "",
		items: [],
		itemIcons: [],
		subpointDepths: [],
		show: false,
		emptyInputs: true
		//hold each input
	}

	componentDidMount() {
		let subpointDepths = [], items = [], itemIcons = [];
		subpointDepths.push(0);
		this.setState({ subpointDepths: subpointDepths });

		items.push("");
		this.setState({ items: items })

		itemIcons.push(null);
		this.setState({ itemIcons: itemIcons })
	}

	handleClose = () => this.setState({ show: false });
	handleShow = () => this.setState({ show: true });

	incrementCounter = () => {
		let count = this.state.counter;
		let key = (count).toString();
		let copy = [...this.state.items];


		copy.push("");	//Initialize empty
		this.setState({ items: copy });
		this.setState({ counter: count + 1 });

		let copy3 = [...this.state.itemIcons];
		copy3.push(null);
		this.setState({ itemIcons: copy3 });

		//Create subpoint counter instance, starts at 0 for root
		let copy2 = [...this.state.subpointDepths];
		copy2.push(0);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is

	}

	/**
	* Update state relating to subpoint depth (how far item is tabbed)
	* @param {Number} idx Index of item
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
		var copy = [...this.state.items];
		copy.splice(idx + 1, 0, "");	//Initialize empty
		this.setState({ items: copy });
		this.setState({ counter: count + 1 });
		//[parent, child, child, child of child , parent, child , parent]
		//[  0   ,   1  ,   1  ,       2        ,   0   ,   1   ,    0  ]
		//[ each index corresponds to this.state.items ]
	}

	/**
	* Update state by removing selected item
	* @param {Number} idx Index of item
	* @return {State}    Updated state, no actual return value
	*/
	deleteSubpoints(idx) {
		if (idx === null) {
			console.log("error ", idx, this.state.subpointDepths);
			return;
		}
		console.log("Removing ", idx)

		//take all depths greater than idx and decrement
		// EXAMPLE
		// Item has 3 childs of +1 depth
		// -> Need to take all those depths and decrement them

		// ex)
		// Start: 0, 1, 2, 3, 3, 3, 0, 0
		// End: 0, 1, 2, 2, 2, 0, 0
		idx = parseInt(idx);
		var copy2 = [...this.state.subpointDepths];
		let i, remove = 1, parent = copy2[idx];
		console.log("Parent:", parent)
		// Delete children (if greater than parent subpoint depth, it is a child)
		if (idx !== this.state.subpointDepths.length - 1) {
			console.log("Start:", idx + 1, copy2[idx + 1], copy2);
			for (i = idx + 1; parent < copy2[i]; i++) {
				remove++;
			}
		}
		console.log(remove)
		copy2.splice(idx, remove);
		this.setState({ subpointDepths: copy2 }) //keep track of how deep this subpoint is

		//Decrement counter
		var count = this.state.counter;
		var copy = [...this.state.items];
		copy.splice(idx, idx);	//Initialize empty
		this.setState({ items: copy });
		this.setState({ counter: count - remove });
		//[parent, child, child, child of child , parent, child , parent]
		//[  0   ,   1  ,   1  ,       2        ,   0   ,   1   ,    0  ]
		//[ each index corresponds to this.state.items ]
	}

	/**
	* Find parent of item by finding closest index of (subpoint depth - 1) to the left
	* @param {Number} idx Index of item
	* @param {Number} val Value of depth of this item
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
		//Store item ids to handle parentid
		let itemIDs = [];
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
			for (const key in this.state.items) {	//Loop through each item and create new
				let data2 = {
					index: key,
					data: this.state.items[key],
					id: data.insertId,
					icon: this.state.itemIcons[key],
					parent: this.findParent(key, this.state.subpointDepths[key], itemIDs)
				}
				//Need to make for loop wait on this fetch before continuing
				//Because items dependent on parentid
				await fetch("/cards/newitem", {	//Create item
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data2)
				})
					.then((response) => response.json())
					.then(function (res) {
						itemIDs.push(res.insertId);
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
		//Empty item text
		this.state.items.forEach((item, idx) => {
			if (item === "") {
				emptyFound = true;
				errorMessage = "Error: Empty item text";
				errorCount++;
				return;
			}
		});
		//Empty item icon
		this.state.itemIcons.forEach((icon, idx) => {
			if (icon === null) {
				emptyFound = true;
				errorMessage = "Error: Empty item icon";
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
		let copy = [...this.state.items];
		copy[key] = e.target.value;
		this.setState({ items: copy });
		/* Example of object being created
		* {
		*   '0': {
		*			'text': "Hello"
		* 		}
  		*/
	}

	/**
	* Updates dropdown icon selected for specific index
	* @param {Number} icon itemType ID of Icon
	* @param {Number} index Index of item being changed
	* @return {State}  			Updated state, no actual return value
	*/
	updateIcon(icon, index) {
		let copy = [...this.state.itemIcons];
		copy[index] = icon;
		console.log(icon, index);
		this.setState({ itemIcons: copy });
	}

	/**
	* Returns JSX for dropdown of all icons
	* @param {Number} i item index passed from generateInputs()
	* @return {JSX}    Array of JSX of icons
	*/
	generateIcons(i) {
		let list = [];
		let jsx = [];
		let values = [];
		this.props.icons.map((type, index) => {
			jsx.push(<div className="dropdown-item clickIcon" style={{ cursor: "pointer" }}>
				<i className={`fas fa-${type.typeName}`} /> {type.typeKeyword}
			</div>);
			let jsxIcon = <i className={`fas fa-${type.typeName}`} />
			values.push([type.typeId, jsxIcon]);
		}
		);
		list.push(jsx, values);
		return list;
	}

	getDepth(idx) {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.subpointDepths[idx]; i++)
			jsx.push(<div key={i} className="pl-2 ml-1"><i className="fas fa-long-arrow-alt-right mt-2 text-secondary"></i></div>);
		return jsx;
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			let subpointDepth = this.state.subpointDepths[i]
			jsx.push(
				<Row className="mb-2" key={i + 1}>
					{this.getDepth(i)} {/*return indentation for subpoints*/}
					<div className="col-1">
						<Dropdown key={i} idx={i} list={this.generateIcons(i)} handleClick={(id, idx) => this.updateIcon(id, idx)} />
					</div>

					<div className="input-group col-9">
						<InputField
							title='Text'
							handleInput={this.handleInput}
							index={i}
							value={this.state.items[i]}
						/>
						{subpointDepth < 6 &&	//set maximum depth to 6
							<span>
								<button className='btn btn-success btn-sm ml-2' key={i} data-index={i} onClick={(e) => this.updateSubpoints(e.target.getAttribute("data-index"))}>
									<i className='fas fa-plus' /> Sub
								</button>
								<button className='btn btn-danger btn-sm ml-2' key={i + 100} data-index={i} onClick={(e) => this.deleteSubpoints(e.target.getAttribute("data-index"))}>
									<i className='fas fa-times' /> Remove
								</button>
							</span>
						}
					</div>
				</Row>
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
					onClick={this.handleShow}
				></i>

				<Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
					<Modal.Header>
						<h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>

					</Modal.Header>

					<Modal.Body >
						<Row>
							<Col>
								<Form.Group controlId="formTitle">
									<Form.Label className="font-weight-bold">Card Title</Form.Label>
									<Form.Control type="text" placeholder="Enter title" onChange={(e) => this.setState({ title: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>

						<div className="font-weight-bold">Items</div>
						{this.generateInputs()}

						<Row>
							<Col className="mt-2">
								<AddButton onClick={this.incrementCounter} />
							</Col>
						</Row>

						<Row>
							<div className='col-3' />
							<div className='col-6'>
								<Error
									empty={this.state.emptyInputs}
									message={"Error: Fill out empty inputs (title, icons, text)"}
								/>
							</div>
						</Row>
					</Modal.Body>

					<Modal.Footer className="modal-footer">
						<Button variant="secondary" onClick={this.handleClose}>Close</Button>
						<Button varian="info" onClick={() => console.log(this.state.subpointDepths)}>Test</Button>
						<Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Create Category</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

Modal.propTypes = {
	title: PropTypes.arrayOf(PropTypes.array)
};
/*
title={"Create New Card"}
Items={this.props.Items}
numCategories={this.state.categories.length}
numOpportunities={this.state.opportunities.length}
SubjectID={this.state.subjectInfo[0].SubjectID}
categoryType={1}
*/
export default CreateItem;
