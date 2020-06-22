import React, {useEffect, useState} from "react";
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
function EditCard(props) {

  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState(0);
  const [items, setItems] = useState([]);
  const [toDelete, setToDelete] = useState([]);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [basicIcons, setBasicIcons] = useState([]);
  const [imageIcons, setImageIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);
  const [role, setRole] = useState(0);

  useEffect(() => {
    // Get data from the published or edited card
    const items = [];
    let itemData = {};
    let counter = 0;
    let itemSet = [];
    if (props.card.tempItems.length) {
      itemSet = generateItems(props.card.tempItems);
    } else {
      itemSet = generateItems(props.card.items);
    }
    // Push items from props to state
    itemSet.forEach((item) => {
      itemData = {};
      itemData.itemId = item.itemId;
      itemData.content = {
        text: item.contentText,
        label: item.contentLabel,
        url: item.contentUrl
      };
      itemData.contentText = item.contentText;
      itemData.contentLabel = item.contentLabel;
      itemData.contentUrl = item.contentUrl;
      itemData.parentId = item.parentId;
      itemData.depth = item.depth;
      itemData.iconType = item.iconType;
      itemData.contentType = getContentType(item.contentText, item.contentLabel, item.contentUrl);
      itemData.current = 1;
      itemData.orderIndex = item.orderIndex;
      items.push(itemData);
      counter++;
    });
    setItems(items);
    setRole(getProfile().role);
    setCounter(counter);
    setLoaded(true);
    setErrorMessage("");
    if (props.card.tempCardId) {
      setTitle(props.card.tempTitle);
      setFormat(props.card.tempCardType);
    } else {
      setTitle(props.card.title);
      setFormat(props.card.cardType);
    }
    // Sort icons into three categories, general items, images, and links
    sortIcons(props.iconSet);
    // eslint-disable-next-line
  }, []);

  // Sort icons into three categories, general items, images, and links
  function sortIcons() {
    const gen = [];
    const images = [];
    const links = [];
    for (let i = 0; i < props.iconSet.length; i++) {
      if (props.iconSet[i].typeName === "chart-area") {
        images.push(props.iconSet[i]);
      } else if (props.iconSet[i].typeName === "info" || props.iconSet[i].typeName === "link") {
        links.push(props.iconSet[i]);
      } else {
        gen.push(props.iconSet[i]);
      }
    }
    setBasicIcons(gen);
    setImageIcons(images);
    setLinkIcons(links);
  }

  function getChildren(id) {
    const results = props.card.items.reduce((result, item) => {
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
  function recurseItems(item, used, items, isChild, prevDepth) {  // isChild = marks if it has any parent, for coloring
    const children = getChildren(item.itemId); // get all children of this item
    if (!(used.includes(item.itemId))) {
      used.push(item.itemId); // push used
      // assign depth if child using prevDepth
      if (isChild) { item.depth = prevDepth + 1; } else { item.depth = 0; }
      if (children) {
        // push item
        items.push(item);
        // recurse over children found
        children.map((child) => (recurseItems(child, used, items, true, item.depth)));
      } else {
        items.push(item);
      }
    }
  }

  function generateItems(itemList) {
    const items = []; // hold items
    const used = []; // hold used items to avoid looping over again
    itemList.map((item) => { // loop through each item (if not used), and grab its children
      recurseItems(item, used, items, false, 0);
      return null;
    });
    return items;
  }

  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }

  function handleShow() {
    setShow(true);
  }

  function getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if (text !== "" && label !== "" && url !== "") { return 3; }
  }

  function incrementCounter(contentType) {
    const count = counter;
    const key = (count).toString();
    const copy = [...items];
    const content = {text: "", label: "", url: ""};

    // Init new empty item
    copy[key] = {};
    copy[key].content = content;
    copy[key].depth = 0;
    copy[key].iconType = null;
    copy[key].contentType = contentType;
    copy[key].contentText = content.text;
    copy[key].contentLabel = content.label;
    copy[key].contentUrl = content.url;
    copy[key].orderIndex = 1;
    setItems(copy);
    setCounter(count + 1);
  }

  /**
  * Update state relating to subpoint depth (how far item is tabbed)
  * @param {Number} idx Index of item
  * @return {State}    Updated state, no actual return value
  */
  function updateSubpoints(idx) {
    // Handle random bug, will work if you keep clicking + Sub. Unknown reason.
    if (idx === null) {
      console.error("error ", idx, items);
      return;
    }

    idx = parseInt(idx);
    const copy = [...items];
    const content = {text: "", label: "", url: ""};
    const item = {};
    const count = counter;

    // Init empty item
    item.content = content;
    item.depth = copy[idx].depth + 1;
    item.iconType = null;
    item.contentType = 1;
    item.current = 0;
    item.contentText = content.text;
    item.contentLabel = content.label;
    item.contentUrl = content.url;
    item.orderIndex = 1;

    // Increment counter and insert child
    copy.splice(idx + 1, 0, item); // Initialize empty
    setItems(copy);
    setCounter(count + 1);
  }

  /**
  * Update state by removing selected item
  * @param {Number} idx Index of item
  * @return {State}    Updated state, no actual return value
  */
  function deleteSubpoints(idx) {
    if (idx === null) {
      console.error("error ", idx, items);
      return;
    }
    idx = parseInt(idx);

    const toDeleteList = [...toDelete];
    let copy = [...items];
    let i;
    let remove = 1;
    const parent = copy[idx].depth;
    const start = idx + 1;

    // Delete children if any (if greater than parent subpoint depth, it is a child)
    if (idx !== items.length - 1) {
      for (i = start; i < items.length && parent < copy[i].depth; i++) {
        toDeleteList.push(items[i].itemId);
        remove++;
      }
    }

    // Delete from state.items
    const count = counter;
    copy = [...items];
    copy.splice(idx, remove);	// Initialize empty
    setItems(copy);
    setCounter(count - remove);

    // Set up Ids to be deleted
    toDeleteList.push(items[idx].itemId);
    setToDelete(toDeleteList);
  }

  async function deleteCard() {
    // Send call to backend to delete card
    const results = await fetch(`/cards/${props.card.cardId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      // Close modal
      handleClose();
      // Reload page after deleting
      props.refresh();
    } else {
      setErrorMessage("Error deleting card. Please try again later.");
    }
  }

  async function handleSubmit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Get the card format from the select
    const formatSelect = document.getElementById("select-edit-card-format");
    const newCardFormat = formatSelect.options[formatSelect.selectedIndex].value;

    let cardData = {};

    // Prepare data for new card
    if (items.length) {
      cardData = {
        orderIndex: props.card.orderIndex,
        cardType: newCardFormat,
        title: title,
        items: items
      };
    } else {
      cardData = {
        orderIndex: props.card.orderIndex,
        cardType: newCardFormat,
        title: title
      };
    }

    // Edit card
    const results = await fetch(`/cards/${props.card.cardId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      // reset error messages
      setErrorMessage("");

      // close the modal
      handleClose();

      // refresh the page
      props.refresh();

    } else {

      // there was an error updating the card
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }

  }

  // Check for empty inputs (card title, item text/content/labels, icons)
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    let i = 0;

    // Empty title
    if (!title.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty card title";
      if (emptyFound) {
        setErrorMessage(newErrorMessage);
        return true;
      }
    }
    // Empty item text
    for (i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.contentType === 1) { // text
        if (item.content.text === "") {
          emptyFound = true;
          newErrorMessage = "Error: Item is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 2) { // label + url
        if (item.content.label === "" || item.content.url === "") {
          emptyFound = true;
          newErrorMessage = "Error: Graphic is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 3) { // text + label + url
        if (item.content.text === "" || item.content.label === "" || item.content.url === "") {
          emptyFound = true;
          newErrorMessage = "Error: Resource is not filled out completely on line " + (i + 1);
          break;
        }
      }
      // Check icons
      if (item.iconType === null) {
        emptyFound = true;
        newErrorMessage = "Error: Empty item icon on line " + (i + 1);
        break;
      }
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // Control input coming from <ItemInput> for each row according to
  // contentType and index in the items state
  function handleInput(e, index, contentType) {
    const key = index.toString();
    const copy = [...items];
    if (contentType === 1) {
      copy[key].content.text = e.target.value;
    } else if (contentType === 2) {
      copy[key].content.label = e.target.value;
    } else if (contentType === 3) {
      copy[key].content.url = e.target.value;
    }
    copy[key].contentText = copy[key].content.text;
    copy[key].contentLabel = copy[key].content.label;
    copy[key].contentUrl = copy[key].content.url;
    setItems(copy);
  }

  /**
  * Updates dropdown icon selected for specific index
  * @param {Number} icon itemType ID of Icon
  * @param {Number} index Index of item being changed
  * @return {State} Updated state, no actual return value
  */
  function updateIcon(icon, index) {
    const copy = [...items];
    copy[index].iconType = icon;
    setItems(copy);
  }

  function getIconName(id, contentType) {
    let i;
    if (contentType === 3) {
      for (i = 0; i < linkIcons.length; i++) {
        if (linkIcons[i].iconType === id) { return i; }
      }
    } else if (contentType === 2) {
      for (i = 0; i < imageIcons.length; i++) {
        if (imageIcons[i].iconType === id) { return i; }
      }
    } else {
      for (i = 0; i < basicIcons.length; i++) {
        if (basicIcons[i].iconType === id) { return i; }
      }
    }
    return null;
  }

  /**
  * Returns JSX for dropdown of all icons
  * @param {Number} i item index passed from generateInputs()
  * @return {JSX}    Array of JSX of icons
  */
  function generateIcons(i, contentType) {
    const list = [];
    const jsx = [];
    const values = [];
    if (contentType === 3) {
      linkIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else if (contentType === 2) {
      imageIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else {
      basicIcons.map((type) => {
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

  /**
  * Returns JSX showing indentation of items
  * @param {Number} i item index passed from generateInputs()
  * @return {JSX}    Array of JSX of icons
  */
  function getDepth(idx) {
    const jsx = [];
    let i = 0;
    for (i = 0; i < items[idx].depth; i++) { jsx.push(<div key={i} className="pl-2 ml-1"><i className="fas fa-long-arrow-alt-right mt-2 text-secondary"></i></div>); }
    return jsx;
  }

  function generateInputs() {
    const jsx = [];
    let i = 0;
    for (i = 0; i < counter; i++) {
      const itemIdKey = items[i].itemId + " " + i;
      const subpointDepth = items[i].depth;
      const contentType = items[i].contentType;
      jsx.push(
        <Row className="mb-2" key={itemIdKey + "a"}>
          {getDepth(i)} {/* return indentation for subpoints*/}
          <div className="col-1">
            <Dropdown key={itemIdKey + "b"} idx={i}
              list={generateIcons(i, contentType)}
              selectedIndex={getIconName(items[i].iconType, contentType)}
              handleClick={(id, idx) => updateIcon(id, idx)}
              edit
            />
          </div>

          <div className="input-group col-9">
            <ItemInput
              title='Text'
              handleInput={(e1, e2, e3) => handleInput(e1, e2, e3)}
              index={i}
              value={items[i]}
              contentType={items[i].contentType}
            />
            {subpointDepth < 6 &&	// set maximum depth to 6, can be increased if it fits the screen
              <span>
                <button className='btn btn-success btn-sm ml-2' key={itemIdKey + "c"} data-index={i} onClick={(e) => updateSubpoints(e.target.getAttribute("data-index"))}>
                  <i className='fas fa-plus' /> Sub
                </button>
                <button className='btn btn-danger btn-sm ml-2' key={itemIdKey + "d"} data-index={i} onClick={(e) => deleteSubpoints(e.target.getAttribute("data-index"))}>
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

  return loaded && role >= 3 ? (
    <div className='text-center mx-2'>
      <Button size="sm" variant="info" onClick={() => handleShow()}>
        <i
          className='fas fa-edit text-white mr-2'
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Card</span>
      </Button>
      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Card</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >
          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Card Title</Form.Label>
                <Form.Control type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Card Format</Form.Label>
                <select className="form-control"
                  id="select-edit-card-format"
                  defaultValue={format}
                >
                  <option value="0">Default</option>
                  <option value="1">Thumbnail Gallery</option>
                </select>
              </Form.Group>
            </Col>
          </Row>

          <div className="font-weight-bold">Items</div>
          {generateInputs()}

          <Row>
            <Col className="mt-2">
              <AddButton variant="success" label="Add Item" onClick={() => incrementCounter(1)} />
              <AddButton variant="primary" label="Add Graphic" onClick={() => incrementCounter(2)} />
              <AddButton variant="info" label="Add Site Resource" onClick={() => incrementCounter(3)} />
            </Col>
          </Row>

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-4'>
              <Error
                message={errorMessage}
              />
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            className="mr-auto"
            variant="danger" 
            onClick={() => {if (window.confirm("Are you sure you wish to delete this item?")) { deleteCard(); } }}
          >
            Delete Card
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Card Edit</Button>
          <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default EditCard;

EditCard.propTypes = {
  card: PropTypes.object,
  orderIndex: PropTypes.number,
  refresh: PropTypes.func,
  iconSet: PropTypes.array
};

