import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import AddButton from "./AddButton";
import ItemInput from "./ItemInput";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import "./CreateCard.css";
import "./ContentPage.css";

// Button and modal that allows a user to edit a card
class EditCard extends React.Component {
  state = {
    counter: 0, // count number of inputs added
    title: "",
    format: 0,
    items: [], // current items have current 1, new items have current 0
    toDelete: [], // hold the ids to be deleted on "Remove"
    show: false,
    loaded: false,
    errorMessage: ""
  }

  async componentDidMount() {
    const items = [];
    let itemData = {};
    let counter = 0;
    const itemSet = this.generateItems();
    // Push items from props to state
    itemSet.forEach((item) => {
      itemData = {};
      itemData.itemId = item.itemId;
      itemData.content = {
        text: item.contentText,
        label: item.contentLabel,
        url: item.contentUrl
      };
      itemData.parentId = item.parentId;
      itemData.depth = item.depth;
      itemData.icon = item.iconType;
      itemData.contentType = this.getContentType(item.contentText, item.contentLabel, item.contentUrl);
      itemData.current = 1;
      itemData.orderIndex = item.orderIndex;
      items.push(itemData);
      counter++;
    });
    this.setState({items: items});
    this.setState({role: getProfile().role});
    this.setState({title: this.props.cardName});
    this.setState({format: this.props.cardType});
    this.setState({counter: counter});
    this.setState({loaded: true});
    this.setState({errorMessage: ""});
  }

  getChildren(id) {
    const results = this.props.items.reduce((result, item) => {
      if (item.parentId === id) {
        result.push(item);
      }
      return result;
    }, []);
    return results.length ? results : false;
  }

  // given a list of items
  // check each item. grab its item id, and check list again for items whose parent id match. assume sorted by order index already.
  // result: to list each one in order, from top to bottom
  recurseItems(item, used, items, isChild, prevDepth) {	// isChild = marks if it has any parent, for coloring
    const childs = this.getChildren(item.itemId); // get all childs of this item
    if (!(used.includes(item.itemId))) {
      used.push(item.itemId); // push used
      // assign depth if child using prevDepth
      if (isChild) { item.depth = prevDepth + 1; } else { item.depth = 0; }
      if (childs) {
        // push item
        items.push(item);
        // recurse over childs found
        childs.map((child) => (this.recurseItems(child, used, items, true, item.depth)));
      } else {
        items.push(item);
      }
    }
  }

  generateItems() {
    const items = []; // hold items
    const used = []; // hold used items to avoid looping over again
    this.props.items.map((item) => { // loop through each item (if not used), and grab its childs
      this.recurseItems(item, used, items, false, 0);
      return null;
    });
    return items;
  }

  findDepth(item, itemArr, i) {
    // No parent is depth 0
    if (!itemArr.length || item.parentId === null) {
      return 0;
    }
    // Check if previous item's parent is null, item depth is default 1
    if (itemArr[i - 1].parentId === null) {
      return 1;
    } else if (item.parentId === itemArr[i - 1].parentId) {
      // Shares same parent as previous item, return same depth
      return itemArr[i - 1].depth;
    } else if (item.parentId !== itemArr[i - 1].parentId) {
      // Does not share same parent
      return itemArr[i - 1].depth + 1;
    } else {
      // New case
      return itemArr[i - 1].depth - 1;
    }
  }

  handleClose = () => {
    this.setState({show: false});
    this.setState({errorMessage: ""});
  }
  handleShow = () => this.setState({show: true});

  getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if (text !== "" && label !== "" && url !== "") { return 3; }
  }

  incrementCounter = (contentType) => {
    const count = this.state.counter;
    const key = (count).toString();
    const copy = [...this.state.items];
    const content = {text: "", label: "", url: ""};

    // Init new empty item
    copy[key] = {};
    copy[key].content = content;
    copy[key].depth = 0;
    copy[key].icon = null;
    copy[key].contentType = contentType;

    this.setState({items: copy});
    this.setState({counter: count + 1});
  }

  /**
  * Update state relating to subpoint depth (how far item is tabbed)
  * @param {Number} idx Index of item
  * @return {State}    Updated state, no actual return value
  */
  updateSubpoints(idx) {
    // Handle random bug, will work if you keep clicking + Sub. Unknown reason.
    if (idx === null) {
      console.error("error ", idx, this.state.items);
      return;
    }

    idx = parseInt(idx);
    const copy = [...this.state.items];
    const content = {text: "", label: "", url: ""};
    const item = {};
    const count = this.state.counter;
    // let key = (idx + 1).toString();

    // Init empty item
    item.content = content;
    item.depth = copy[idx].depth + 1;
    item.icon = null;
    item.contentType = 1;
    item.current = 0;

    // Increment counter and insert child
    copy.splice(idx + 1, 0, item);	// Initialize empty
    this.setState({items: copy});
    this.setState({counter: count + 1});
  }

  /**
  * Update state by removing selected item
  * @param {Number} idx Index of item
  * @return {State}    Updated state, no actual return value
  */
  deleteSubpoints(idx) {
    if (idx === null) {
      console.error("error ", idx, this.state.items);
      return;
    }
    idx = parseInt(idx);

    const toDelete = [...this.state.toDelete];
    let copy = [...this.state.items];
    let i;
    let remove = 1;
    const parent = copy[idx].depth;
    const start = idx + 1;

    // Delete children if any (if greater than parent subpoint depth, it is a child)
    if (idx !== this.state.items.length - 1) {
      for (i = start; i < this.state.items.length && parent < copy[i].depth; i++) {
        toDelete.push(this.state.items[i].itemId);
        remove++;
      }
    }

    // Delete from state.items
    const count = this.state.counter;
    copy = [...this.state.items];
    copy.splice(idx, remove);	// Initialize empty
    this.setState({items: copy});
    this.setState({counter: count - remove});

    // Set up Ids to be deleted
    toDelete.push(this.state.items[idx].itemId);
    this.setState({toDelete: toDelete});
  }

  /**
  * Find parent of item by finding closest index of (subpoint depth - 1) to the left
  * @param {Number} idx Index of item
  * @param {Number} val Value of depth of this item
  * @return {Number}    Index of parent
  */
  findParent(idx, val, ids) {
    let closestIdx = null;
    this.state.items.forEach((item, i) => {
      if (i >= idx) { return closestIdx; }
      if (item.depth === (val - 1)) { closestIdx = i; }
    });
    return closestIdx !== null ? ids[closestIdx] : null;
  }

  findOrderIndex(i) {
    const items = this.state.items;
    // base case
    if (i === 0 || items[i].depth === 0) { return 1; }
    // if left depth is smaller, this is a new "group". order index restarts at 1
    if (items[i - 1].depth < items[i].depth) { return 1; }
    // if left sibling of item has same depth, order index inc
    if (items[i - 1].depth === items[i].depth) { return items[i - 1].depth + 1; }
  }

  deleteCard = async () => {
    // Send call to backend to delete card
    const results = await fetch(`/cards/${this.props.cardId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      // Close modal
      this.handleClose();
      // Reload page after deleting
      this.props.refresh();
    } else {
      this.setState({errorMessage: "Error deleting card. Please try again later."});
    }
  }

  handleSubmit = async () => {
    // Check for empty inputs
    if (this.checkInputs()) {
      return;
    }

    // Get the card format from the select
    const formatSelect = document.getElementById("select-edit-card-format");
    const cardFormat = formatSelect.options[formatSelect.selectedIndex].value;

    // Prepare data for new card
    const cardData = {
      headerId: this.props.headerId,
      orderIndex: this.props.orderIndex,
      cardType: cardFormat,
      title: this.state.title,
      approved: 0
    };

    // Store item ids to handle parentId
    const itemIds = [];

    // Edit card
    const results = await fetch(`/cards/${this.props.cardId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      // reset error messages
      this.setState({errorMessage: ""});

      // Close modal
      this.handleClose();

      // Loop through state items and update
      for (const key in this.state.items) {

        const current = this.state.items[key].current;

        // object representing a single item
        const itemData = {
          cardId: this.props.cardId,
          contentText: this.state.items[key].content.text,
          contentLabel: this.state.items[key].content.label,
          contentUrl: this.state.items[key].content.url,
          iconType: this.state.items[key].icon,
          approved: 0
        };

        // Check if item is being updated or added to the card
        if (current) {

          // Item is being updated
          itemData.itemId = this.state.items[key].itemId;
          itemData.orderIndex = this.findOrderIndex(key);
          itemData.parentId = this.state.items[key].parentId;
          itemData.approved = 0;

          // Make the request to update the item
          const itemResults = await fetch(`/items/${itemData.itemId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(itemData)
          });

          // Check if the item was updated successfully
          if (itemResults.ok) {
            await itemResults.json();
            itemIds.push(itemData.itemId);
          } else {
            const itemObj = await itemResults.json();
            if (typeof itemObj.error === "undefined") {
              console.error("Error updating item.");
            } else {
              console.error("Error updating item:", itemObj.error);
            }
          }

        } else {

          // Item is being created
          itemData.parentId = this.findParent(key, this.state.items[key].depth, itemIds);
          itemData.orderIndex = parseInt(key) + 1;

          // Make the request to create the item
          const itemResults = await fetch("/items/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(itemData)
          });

          // Check if the item was created successfully
          if (itemResults.ok) {
            const itemObj = await itemResults.json();
            itemIds.push(itemObj.insertId);
          } else {
            const itemObj = await itemResults.json();
            if (typeof itemObj.error === "undefined") {
              console.error("Error creating item.");
            } else {
              console.error("Error creating item:", itemObj.error);
            }
          }

        }
      }

      // Loop through old items that are no longer in the card and delete them
      for (let i = 0; i < this.state.toDelete.length; i++) {
        const itemResults = await fetch(`/items/${this.state.toDelete[i]}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"}
        });
        if (!itemResults.ok) {
          console.error("Error deleting item.");
        }
      }

      // refresh the page
      this.props.refresh();

    } else {

      // there was an error updating the card
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        this.setState({errorMessage: "An internal server error occurred. Please try again later."});
      } else {
        this.setState({errorMessage: obj.error});
      }

    }

  }

  // Check for empty inputs (card title, item text/content/labels, icons)
  checkInputs() {
    let emptyFound = false;
    let errorMessage = this.state.errorMessage;
    let i = 0;

    // Empty title
    if (!this.state.title.length) {
      emptyFound = true;
      errorMessage = "Error: Empty card title";
      if (emptyFound) {
        this.setState({errorMessage: errorMessage});
        return true;
      }
    }
    // Empty item text
    for (i = 0; i < this.state.items.length; i++) {
      const item = this.state.items[i];
      if (item.contentType === 1) { // text
        if (item.content.text === "") {
          emptyFound = true;
          errorMessage = "Error: Item is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 2) { // label + url
        if (item.content.label === "" || item.content.url === "") {
          emptyFound = true;
          errorMessage = "Error: Graphic is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 3) { // text + label + url
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
    this.setState({errorMessage: errorMessage});
    if (emptyFound) { return true; }
    return false;
  }

  // Control input coming from <ItemInput> for each row according to contentType and index in this.state.items
  handleInput = (e, index, contentType) => {
    const key = index.toString();
    const copy = [...this.state.items];
    if (contentType === 1) { copy[key].content.text = e.target.value; } else if (contentType === 2) { copy[key].content.label = e.target.value; } else if (contentType === 3) { copy[key].content.url = e.target.value; }
    this.setState({items: copy});
  }

  /**
  * Updates dropdown icon selected for specific index
  * @param {Number} icon itemType ID of Icon
  * @param {Number} index Index of item being changed
  * @return {State}  			Updated state, no actual return value
  */
  updateIcon(icon, index) {
    const copy = [...this.state.items];
    copy[index].icon = icon;
    this.setState({items: copy});
  }

  getIconName(id) {
    let i;
    for (i = 0; i < this.props.icons.length; i++) {
      if (this.props.icons[i].iconType === id) { return i; }
    }
    return null;
  }

  /**
  * Returns JSX for dropdown of all icons
  * @param {Number} i item index passed from generateInputs()
  * @return {JSX}    Array of JSX of icons
  */
  generateIcons(i) {
    const list = [],
      jsx = [],
      values = [];
    this.props.icons.map((type) => {
      jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}}>
        <i className={`fas fa-${type.typeName}`} /> {type.typeKeyword}
      </div>);
      const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
      values.push([type.iconType, jsxIcon]);
      return null;
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
    const jsx = [];
    let i = 0;
    for (i = 0; i < this.state.items[idx].depth; i++) { jsx.push(<div key={i} className="pl-2 ml-1"><i className="fas fa-long-arrow-alt-right mt-2 text-secondary"></i></div>); }
    return jsx;
  }

  generateInputs() {
    const jsx = [];
    let i = 0;
    for (i = 0; i < this.state.counter; i++) {
      const subpointDepth = this.state.items[i].depth;
      jsx.push(
        <Row className="mb-2" key={i + 1}>
          {this.getDepth(i)} {/* return indentation for subpoints*/}
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
            {subpointDepth < 6 &&	// set maximum depth to 6, can be increased if it fits the screen
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
      );
    }
    return jsx;
  }

  render() {
    return this.state.loaded && this.state.role >= 3 ? (
      <div className='text-center'>
        <Button className="mx-2" size="sm" variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-edit text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          <span className="text-white">Edit Card</span>
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>

          <Modal.Body >
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="font-weight-bold">Card Title</Form.Label>
                  <Form.Control type="text" defaultValue={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="font-weight-bold">Card Format</Form.Label>
                  <select className="form-control"
                    id="select-edit-card-format"
                    defaultValue={this.state.format}
                  >
                    <option value="0">Default</option>
                    <option value="1">Thumbnail Gallery</option>
                  </select>
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
              <div className='col-6 mt-4'>
                <Error
                  message={this.state.errorMessage}
                />
              </div>
            </Row>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Submit Card Edit</Button>
            <Button variant="danger" onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { this.deleteCard(); } }}>Delete Card</Button>
            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ) : "";
  }
}
export default EditCard;

EditCard.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.array,
  cardName: PropTypes.string,
  items: PropTypes.array,
  headerId: PropTypes.number,
  cardId: PropTypes.number,
  cardType: PropTypes.number,
  parentId: PropTypes.number,
  orderIndex: PropTypes.number,
  refresh: PropTypes.func
};

