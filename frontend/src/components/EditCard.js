import React, { Fragment } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import AddButton from './AddButton';
import ItemInput from './ItemInput';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import Error from './Error';
import './CreateCard.css'
import './Subject.css'

class EditCard extends React.Component {
	state = {
		counter: 0, //count number of inputs added
		title: "",
		items: [], //current items have current 1, new items have current 0
		toDelete: [], //hold the ids to be deleted on "Remove"
		show: false,
		loaded: false,
		emptyInputs: false
	}

	async componentDidMount() {
		let items = [];
		let itemData = {};
		let counter = 0;
		//Push items from props to state
		this.props.items.forEach((item, i) => {
			itemData = {}
			itemData.itemId = item.itemId;
			itemData.content = {
				text: item.contentText,
				label: item.contentLabel,
				url: item.contentUrl
			}
			itemData.parentId = item.parentId;
			itemData.depth = this.findDepth(itemData, items, i); //if null parent ? return 0 : if parentID[i-1] === null => depth = 1; else if parentId[i-1] === parentId[i] => depth = parentDepth[i-1] 
			itemData.icon = item.iconType;
			itemData.contentType = this.getContentType(item.contentText, item.contentLabel, item.contentUrl);
			itemData.current = 1;
			itemData.orderIndex = item.orderIndex;
			items.push(itemData);
			counter++;
		});
		await this.setState({ items: items });
		console.log(this.props.items);
		this.setState({ counter: counter });
		await this.setState({ title: this.props.cardName })
		this.setState({ loaded: true });
		this.setState({ errorMessage: "Error: Fill out empty inputs (title, icons, text)" })
	}

	findDepth(item, itemArr, i) {
		//No parent is depth 0
		if (!itemArr.length || item.parentId === null)
			return 0;
		//Check if previous item parent null, item depth is 1
		if (itemArr[i - 1].parentId === null)
			return 1;
		//Shares same parent, then same depth
		else if (item.parentId === itemArr[i - 1].parentId)
			return itemArr[i - 1].depth
		//Increment depth, no parents shared
		else
			return itemArr[i - 1].depth + 1;
	}

	handleClose = () => this.setState({ show: false });
	handleShow = () => this.setState({ show: true });

	getContentType(text, label, url) {
		if (text !== "" && label === "" && url === "")
			return 1;
		if (text === "" && label !== "" && url !== "")
			return 2;
		if (text !== "" && label !== "" && url !== "")
			return 3;
	}

	incrementCounter = (contentType) => {
		let count = this.state.counter;
		let key = (count).toString();
		let copy = [...this.state.items];
		let content = { text: "", label: "", url: "" };

		//Init new empty item
		copy[key] = {}
		copy[key].content = content;
		copy[key].depth = 0;
		copy[key].icon = null;
		copy[key].contentType = contentType;

		this.setState({ items: copy });
		this.setState({ counter: count + 1 });
	}

	/**
	* Update state relating to subpoint depth (how far item is tabbed)
	* @param {Number} idx Index of item
	* @return {State}    Updated state, no actual return value
	*/
	updateSubpoints(idx) {
		//Handle random bug, will work if you keep clicking + Sub. Unknown reason.
		if (idx === null) {
			console.log("error ", idx, this.state.items);
			return;
		}

		idx = parseInt(idx);
		let copy = [...this.state.items];
		let content = { text: "", label: "", url: "" };
		let item = {};
		let count = this.state.counter;
		let key = (idx + 1).toString();

		//Init empty item
		item.content = content;
		item.depth = copy[idx].depth + 1;
		item.icon = null;
		item.contentType = 1;
		item.current = 0;

		//Increment counter and insert child
		copy.splice(idx + 1, 0, item);	//Initialize empty
		this.setState({ items: copy });
		this.setState({ counter: count + 1 });
	}

	/**
	* Update state by removing selected item
	* @param {Number} idx Index of item
	* @return {State}    Updated state, no actual return value
	*/
	deleteSubpoints(idx) {
		if (idx === null) {
			console.log("error ", idx, this.state.items);
			return;
		}
		idx = parseInt(idx);

		let toDelete = [...this.state.toDelete];
		let copy = [...this.state.items];
		let i, remove = 1, parent = copy[idx].depth, start = idx + 1;

		// Delete children if any (if greater than parent subpoint depth, it is a child)
		if (idx !== this.state.items.length - 1) {
			for (i = start; i < this.state.items.length && parent < copy[i].depth; i++) {
				toDelete.push(this.state.items[i].itemId)
				remove++;
			}
		}

		//Delete from state.items
		var count = this.state.counter;
		copy = [...this.state.items];
		copy.splice(idx, remove);	//Initialize empty
		this.setState({ items: copy });
		this.setState({ counter: count - remove });

		//Set up Ids to be deleted
		toDelete.push(this.state.items[idx].itemId);
		this.setState({ toDelete: toDelete });
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
		this.state.items.forEach(function (item, i) {
			if (i >= idx)
				return closestIdx;
			if (item.depth === (val - 1))
				closestIdx = i;
		});
		return closestIdx !== null ? ids[closestIdx] : null;
	}

	findOrderIndex(i) {
		let items = this.state.items;
		console.log(items[i].content.text, i)
		//base case
		if (i === 0 || items[i].depth === 0)
			return 1 && console.log("return 1");
		//if left depth is smaller, this is a new "group". order index restarts at 1
		if (items[i - 1].depth < items[i].depth)
			return 1 && console.log("return 1");
		//if left sibling of item has same depth, order index inc
		if (items[i - 1].depth === items[i].depth)
			return items[i - 1].depth + 1 && console.log("return ", items[i-1].depth + 1);
	}

	handleSubmit = async () => {
		console.log(this.state.items);
		//Check for empty inputs
		if (this.checkInputs()) {
			return
		}

		//Close modal
		this.handleClose();

		//Prepare data for new card
		let cardData = {
			headerId: this.props.headerId,
			orderIndex: this.props.orderIndex,
			title: this.state.title,
			userId: 1 //temporary placeholder
		}

		//Store item ids to handle parentId 
		let itemIds = [];

		//Create new card
		await fetch(`/cards/${this.props.cardId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cardData)
		}).then(function (res) {
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
			return res.json();
		}).then(async (cardData) => {
			//Loop through state items and create 
			for (const key in this.state.items) {
				let current = this.state.items[key].current;
				let itemData = {
					cardId: this.props.cardId,
					contentText: this.state.items[key].content.text,
					contentLabel: this.state.items[key].content.label,
					contentUrl: this.state.items[key].content.url,
					iconType: this.state.items[key].icon,
					approved: 1 //temporary placeholder
				}
				console.log(itemData, current)
				if (current) {
					itemData.itemId = this.state.items[key].itemId;
					itemData.orderIndex = this.findOrderIndex(key);
					itemData.parentId = this.state.items[key].parentId;
					fetch(`/items/${itemData.itemId}`, {
						method: 'PATCH',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(itemData)
					})
						.then((response) => response.json())
						.then(itemIds.push(itemData.itemId))
				} else {
					//Items can be dependent on previous item to be created (parentId), use await
					itemData.parentId = this.findParent(key, this.state.items[key].depth, itemIds);
					itemData.userId = 1;
					itemData.orderIndex = parseInt(key) + 1;
					console.log("updating...", itemData)
					await fetch("/items/", {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(itemData)
					})
						.then((response) => response.json())
						.then(function (res) {
							itemIds.push(res.insertId);
						}).catch(function (err) {
							console.log(err);
						})
				}
			}
		}).catch(function (err) {
			console.log(err);
		})

		//Reload page after adding
		this.props.refresh();
	}

	checkInputs() {
		let emptyFound = false;
		let errorMessage = this.state.errorMessage;
		let i, errorCount = 0;

		//Empty title
		if (!this.state.title.length) {
			emptyFound = true;
			errorMessage = "Error: Empty category title";
			if (emptyFound) {
				this.setState({ errorMessage: errorMessage })
				this.setState({ emptyInputs: emptyFound })
				return true;
			}
		}
		//Empty item text
		for (i = 0; i < this.state.items.length; i++) {
			let item = this.state.items[i];
			if (item.contentType === 1) { //text
				if (item.content.text === "") {
					emptyFound = true;
					errorMessage = "Error: Item is not filled out completely on line " + (i + 1);
					break;
				}
			} else if (item.contentType === 2) { //label + url
				if (item.content.label === "" || item.content.url === "") {
					emptyFound = true;
					errorMessage = "Error: Graphic is not filled out completely on line " + (i + 1);
					break;
				}
			} else if (item.contentType === 3) { //text + label + url
				if (item.content.text === "" || item.content.label === "" || item.content.url === "") {
					emptyFound = true;
					errorMessage = "Error: Resource is not filled out completely on line " + (i + 1);
					break;
				}
			}
			// Check icons
			if (item.icon === null) {
				emptyFound = true;
				errorMessage = "Error: Empty item icon on line " + (i + 1);
				break;
			}
		}
		this.setState({ errorMessage: errorMessage })
		this.setState({ emptyInputs: emptyFound })
		if (emptyFound)
			return true;
		return false;
	}

	handleInput = (e, index, contentType) => {
		let key = index.toString();
		let copy = [...this.state.items];

		if (contentType === 1)
			copy[key].content.text = e.target.value;
		else if (contentType === 2)
			copy[key].content.label = e.target.value;
		else if (contentType === 3)
			copy[key].content.url = e.target.value;

		this.setState({ items: copy });
		/* Example of items
		* {
		*   '0': {
		*			'text': "Hello",
		*			'label': "",
		*			'url': ""
		* 		}
		*		'1': {
		*			'text': "",
		*			'label': "picture of a dog",
		*			'url': "imgur.com/a23Xva"	
		*			}
		*	}
		*/
	}

	/**
	* Updates dropdown icon selected for specific index
	* @param {Number} icon itemType ID of Icon
	* @param {Number} index Index of item being changed
	* @return {State}  			Updated state, no actual return value
	*/
	updateIcon(icon, index) {
		let copy = [...this.state.items];
		copy[index].icon = icon;
		this.setState({ items: copy });
	}

	getIconName(id) {
		let i;
		for (i = 0; i < this.props.icons.length; i++) {
			if (this.props.icons[i].iconType === id)
				return i;
		}
		return null;
	}

	/**
	* Returns JSX for dropdown of all icons
	* @param {Number} i item index passed from generateInputs()
	* @return {JSX}    Array of JSX of icons
	*/
	generateIcons(i) {
		let list = [], jsx = [], values = [];
		this.props.icons.map((type, index) => {
			jsx.push(<div className="dropdown-item clickIcon" style={{ cursor: "pointer" }}>
				<i className={`fas fa-${type.typeName}`} /> {type.typeKeyword}
			</div>);
			let jsxIcon = <i className={`fas fa-${type.typeName}`} />
			values.push([type.iconType, jsxIcon]);
		}
		);
		list.push(jsx, values);
		return list;
	}

	/**
	* Returns JSX showing indentation of items
	* @param {Number} i item index passed from generateInputs()
	* @return {JSX}    Array of JSX of icons
	*/
	getDepth(idx) {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.items[idx].depth; i++)
			jsx.push(<div key={i} className="pl-2 ml-1"><i className="fas fa-long-arrow-alt-right mt-2 text-secondary"></i></div>);
		return jsx;
	}

	generateInputs() {
		let jsx = [];
		let i = 0;
		for (i = 0; i < this.state.counter; i++) {
			let subpointDepth = this.state.items[i].depth;
			jsx.push(
				<Row className="mb-2" key={i + 1}>
					{this.getDepth(i)} {/*return indentation for subpoints*/}
					<div className="col-1">
						<Dropdown key={i} idx={i} list={this.generateIcons(i)} selectedIndex={this.getIconName(this.state.items[i].icon)} handleClick={(id, idx) => this.updateIcon(id, idx)} edit />
					</div>

					<div className="input-group col-9">
						<ItemInput
							title='Text'
							handleInput={this.handleInput}
							index={i}
							value={this.state.items[i]}
							contentType={this.state.items[i].contentType}
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
		return this.state.loaded ? (
			<div className='text-center'>
				<Button size="sm" variant="info" onClick={this.handleShow}>
					<i
						className='fas fa-edit text-white mr-2'
						style={{ transform: 'scale(1.5)' }}></i>
					<span className="text-white">Edit Card</span>
				</Button>
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
									<Form.Control type="text" defaultValue={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>

						<div className="font-weight-bold">Items</div>
						{this.generateInputs()}

						<Row>
							<Col className="mt-2">
								<AddButton variant="success" label="Add Item" onClick={() => this.incrementCounter(1)} />
								<AddButton variant="primary" label="Add Graphic" onClick={() => this.incrementCounter(2)} />
								<AddButton variant="info" label="Add Site Resource" onClick={() => this.incrementCounter(3)} />
							</Col>
						</Row>

						<Row>
							<div className='col-3' />
							<div className='col-6'>
								<Error
									empty={this.state.emptyInputs}
									message={this.state.errorMessage}
								/>
							</div>
						</Row>
					</Modal.Body>

					<Modal.Footer className="modal-footer">
						<Button variant="warning" onClick={() => console.log(this.state.items, this.state.counter)}>Test</Button>
						<Button variant="secondary" onClick={this.handleClose}>Close</Button>
						<Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Create Card</Button>
					</Modal.Footer>
				</Modal>
			</div>
		) : "";
	}
}

EditCard.propTypes = {
	title: PropTypes.string,
	icons: PropTypes.array
};
/*
					title={"Create New Card"}
					icons={this.state.iconSet}
					numcards={this.state.cards.length}
					SubjectID={this.state.pageInfo.pageId}
					categoryType={1}
*/
export default EditCard;
