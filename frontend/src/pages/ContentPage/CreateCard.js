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

// Create card button and modal
class CreateCard extends React.Component {
  state = {
    counter: 0, // count number of inputs added
    title: "",
    items: [],
    show: false,
    loaded: false,
    errorMessage: "",
    basicIcons: [],
    imageIcons: [],
    linkIcons: []
  }

  async componentDidMount() {
    const items = [];
    const item = {};

    // Init empty item
    const content = {text: "", label: "", url: ""};
    item.content = content;
    item.depth = 0;
    item.icon = null;
    item.contentType = null;

    items.push(item);

    await this.setState({items: items});
    await this.setState({role: getProfile().role});
    this.setState({loaded: true});
  }

  handleClose = () => {
    this.setState({show: false});
    this.setState({errorMessage: ""});
  }
  handleShow = () => this.setState({show: true});

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
    // Sort icons into three categories, general items, images, and links
    this.sortIcons(this.props.icons);
  }

  // Sort icons into three categories, general items, images, and links
  sortIcons() {
    const gen = [];
    const images = [];
    const links = [];
    for (let i = 0; i < this.props.icons.length; i++) {
      if (this.props.icons[i].typeName === "chart-area") {
        images.push(this.props.icons[i]);
      } else if (this.props.icons[i].typeName === "info" || this.props.icons[i].typeName === "link") {
        links.push(this.props.icons[i]);
      } else {
        gen.push(this.props.icons[i]);
      }
    }
    this.setState({basicIcons: gen});
    this.setState({imageIcons: images});
    this.setState({linkIcons: links});
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
    let copy = [...this.state.items];
    let i;
    let remove = 1;
    const parent = copy[idx].depth;
    const start = idx + 1;

    // Delete children if any (if greater than parent subpoint depth, it is a child)
    if (idx !== this.state.items.length - 1) {
      for (i = start; i < this.state.items.length && parent < copy[i].depth; i++) {
        remove++;
      }
    }

    // Delete from state.items
    const count = this.state.counter;
    copy = [...this.state.items];
    copy.splice(idx, remove);	// Initialize empty
    this.setState({items: copy});
    this.setState({counter: count - remove});
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

  handleSubmit = async () => {
    // Check for empty inputs
    if (this.checkInputs()) {
      return;
    }

    // Get the card format from the select
    const formatSelect = document.getElementById("select-create-card-format");
    const cardFormat = formatSelect.options[formatSelect.selectedIndex].value;

    // Prepare data for new card
    const cardData = {
      headerId: this.props.headerId,
      orderIndex: this.props.numCards + 1, // append to end of list of cards for this header
      cardType: cardFormat,
      title: this.state.title,
      userId: 1
    };

    // Store item ids to handle parentId
    const itemIds = [];

    // Create new card
    const results = await fetch("/cards/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      const obj = await results.json();

      // reset error messages
      this.setState({errorMessage: ""});

      // Close modal
      this.handleClose();

      // Loop through state items and create
      for (const key in this.state.items) {

        // object representing a single item
        const itemData = {
          orderIndex: this.findOrderIndex(key),
          contentText: this.state.items[key].content.text,
          contentLabel: this.state.items[key].content.label,
          contentUrl: this.state.items[key].content.url,
          cardId: obj.insertId,
          iconType: this.state.items[key].icon,
          parentId: this.findParent(key, this.state.items[key].depth, itemIds)
        };

        // Items can be dependent on previous item to be created (parentId)
        const itemResults = await fetch("/items/", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(itemData)
        });

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

      // refresh the page
      this.props.refresh();

    } else {

      // there was an error creating the card
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

  checkInputs() {
    let emptyFound = false;
    let errorMessage = this.state.errorMessage;

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
    for (let i = 0; i < this.state.items.length; i++) {
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
  * @return {State} Updated state, no actual return value
  */
  updateIcon(icon, index) {
    const copy = [...this.state.items];
    copy[index].icon = icon;
    this.setState({items: copy});
  }

  /**
  * Returns JSX for dropdown of all icons
  * @param {Number} i item index passed from generateInputs()
  * @return {JSX}    Array of JSX of icons
  */
  generateIcons(i, contentType) {
    const list = [];
    const jsx = [];
    const values = [];
    if (contentType === 3) {
      this.state.linkIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else if (contentType === 2) {
      this.state.imageIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else {
      this.state.basicIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    }
    list.push(jsx, values);
    return list;
  }

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
      const itemIdKey = this.state.items[i].itemId + " " + i;
      const subpointDepth = this.state.items[i].depth;
      const contentType = this.state.items[i].contentType;
      jsx.push(
        <Row className="mb-2" key={itemIdKey + "a"}>
          {this.getDepth(i)} {/* return indentation for subpoints*/}
          <div className="col-1">
            <Dropdown key={itemIdKey + "b"} idx={i}
              list={this.generateIcons(i, contentType)}
              handleClick={(id, idx) => this.updateIcon(id, idx)}
            />
          </div>

          <div className="input-group col-9">
            <ItemInput
              title="Text"
              maxLength="1000"
              handleInput={this.handleInput}
              index={i}
              value={this.state.items[i]}
              contentType={this.state.items[i].contentType}
            />
            {subpointDepth < 6 &&	// set maximum depth to 6
              <span>
                <button className='btn btn-success btn-sm ml-2' key={itemIdKey + "c"} data-index={i} onClick={(e) => this.updateSubpoints(e.target.getAttribute("data-index"))}>
                  <i className='fas fa-plus' /> Sub
                </button>
                <button className='btn btn-danger btn-sm ml-2' key={itemIdKey + "d"} data-index={i} onClick={(e) => this.deleteSubpoints(e.target.getAttribute("data-index"))}>
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
    return this.state.loaded && this.state.role >= 3 && this.props.mode ? (
      <div className='text-center mt-3 mb-2'>
        <Button variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-plus-circle text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          Create Card
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>

          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="font-weight-bold">Card Title</Form.Label>
                  <Form.Control type="text" maxLength="100" placeholder="Enter title" onChange={(e) => this.setState({title: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="font-weight-bold">Card Format</Form.Label>
                  <select className="form-control"
                    id="select-create-card-format"
                    defaultValue="0"
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
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Create Card</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ) : "";
  }
}
export default CreateCard;

CreateCard.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.array,
  headerId: PropTypes.number,
  numCards: PropTypes.any,
  refresh: PropTypes.any,
  mode: PropTypes.number
};

