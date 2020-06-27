import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import AddButton from "./AddButton";
import ItemInput from "./ItemInput";
import IconDropdown from "./IconDropdown";
import Indent from "./Indent";
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
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [basicIcons, setBasicIcons] = useState([]);
  const [imageIcons, setImageIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);
  const [role, setRole] = useState(0);

  useEffect(() => {
    // Get data from the published or edited card
    const newItems = [];
    let itemData = {};
    let newCounter = 0;
    let itemSet = [];
    if (props.card.tempItems.length) {
      itemSet = generateItems(props.card.tempItems);
    } else {
      itemSet = generateItems(props.card.items);
    }
    // Push items from props to state
    itemSet.forEach((item) => {
      itemData = {};
      itemData.counterId = newCounter + 1;
      itemData.itemId = item.itemId;
      itemData.contentText = item.contentText;
      itemData.contentLabel = item.contentLabel;
      itemData.contentUrl = item.contentUrl;
      itemData.indentation = item.indentation;
      itemData.iconType = item.iconType;
      itemData.contentType = getContentType(item.contentText, item.contentLabel, item.contentUrl);
      itemData.current = 1;
      itemData.orderIndex = item.orderIndex;
      newItems.push(itemData);
      newCounter++;
    });
    setItems(newItems);
    setRole(getProfile().role);
    setCounter(newCounter);
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

  // Makes a copy of the items in the props
  function generateItems(itemList) {
    const itemArray = [];
    itemList.map((item) => {
      itemArray.push(item);
      return null;
    });
    return itemArray;
  }

  // Hides the modal
  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }

  // Shows the modal
  function handleShow() {
    setShow(true);
  }

  // Returns the content type (number of fields)
  function getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if (text !== "" && label !== "" && url !== "") { return 3; }
  }

  // Keeps track of the current number of input fields
  function incrementCounter(contentType) {
    const newCounter = counter;
    const key = (newCounter).toString();
    const copy = [...items];

    // Init new empty item
    copy[key] = {};
    copy[key].counterId = newCounter + 1;
    copy[key].contentText = "";
    copy[key].contentLabel = "";
    copy[key].contentUrl = "";
    copy[key].icon = null;
    copy[key].contentType = contentType;
    copy[key].orderIndex = 1;
    copy[key].indentation = 0;

    setItems(copy);
    setCounter(newCounter + 1);
  }

  // Increase the indentation level of the item
  function changeIndent(counterId, amount) {
    let arrayIndex = -1;
    let copy = [...items];
    
    // Find the index of this item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the item to indent");
      return;
    }

    // Update the indentation leven
    if (copy[arrayIndex].indentation + amount <= 4 && copy[arrayIndex].indentation + amount >= 0 ) {
      copy[arrayIndex].indentation += amount;
      setItems(copy);
    }
  }

  // Deletes the selected item
  function deleteItem(counterId) {
    let arrayIndex = -1;
    let copy = [...items];
    
    // Find the index of this item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the item to indent");
      return;
    }

    // Delete from state.items
    const count = counter;
    copy.splice(arrayIndex, 1);	// Initialize empty
    setItems(copy);
    setCounter(count - 1);
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

    const itemIds = [];
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
      if (item.icon === null) {
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
    setItems(copy);
  }


  // Updates dropdown icon selected for specific index
  // @param {Number} icon itemType ID of Icon
  // @param {Number} index Index of item being changed
  // @return {State} Updated state, no actual return value
  function updateIcon(icon, index) {
    const copy = [...items];
    copy[index].icon = icon;
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

  // Returns JSX for dropdown of all icons
  // @param {Number} i item index passed from generateInputs()
  // @return {JSX}   Array of JSX of icons
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
                <Form.Control type="text" maxLength="100" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
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

          {/* Item Input Fields */}

          {items.map((item, i) =>
            <Row className="mb-2" key={item.counterId + "a"}>
              <Indent indentLevel={item.indentation} />
              <div className="col-1">
                <IconDropdown key={item.counterId + "b"} idx={i}
                  list={generateIcons(i, item.contentType)}
                  selectedIndex={getIconName(item.icon, item.contentType)}
                  handleClick={(id, idx) => updateIcon(id, idx)}
                  edit
                />
              </div>
              <div className="input-group col-9">
                <ItemInput
                  title="Text"
                  maxLength="1000"
                  handleInput={(e1, e2, e3) => handleInput(e1, e2, e3)}
                  index={i}
                  value={item}
                  contentType={item.contentType}
                />
                <span>
                  <button className='btn btn-success btn-sm ml-2' key={item.counterId + "c"} data-index={i}
                    onClick={(e) => changeIndent(item.counterId, -1)}
                  >
                    <i className='fas fa-minus' />
                  </button>
                  <button className='btn btn-success btn-sm ml-2' key={item.counterId + "d"} data-index={i}
                    onClick={(e) => changeIndent(item.counterId, 1)}
                  >
                    <i className='fas fa-plus' />
                  </button>
                  <button className='btn btn-danger btn-sm ml-2' key={item.counterId + "e"} data-index={i}
                    onClick={(e) => deleteItem(item.counterId)}
                  >
                    <i className='fas fa-times' /> Remove
                  </button>
                </span>

              </div>
            </Row>
          )}

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
            onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { deleteCard(); } }}
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
  refresh: PropTypes.func,
  iconSet: PropTypes.array
};

