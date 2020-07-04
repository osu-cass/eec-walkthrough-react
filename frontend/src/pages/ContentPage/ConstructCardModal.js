import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import AddButton from "./AddButton";
import ItemInput from "./ItemInput";
import IconDropdown from "./IconDropdown";
import Indent from "./Indent";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import "./ConstructCardModal.css";

// Modal used for creating and editing cards
function ConstructCardModal(props) {

  const [counter, setCounter] = useState(0);
  const [pureCounter, setPureCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState(0);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [basicIcons, setBasicIcons] = useState([]);
  const [imageIcons, setImageIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);

  // setup card data
  useEffect(() => {
    // Sort icons into three categories, general items, images, and links
    sortIcons(props.iconSet);

    // If we are a new card, just leave card data blank
    if (!props.edit) {
      return;
    }

    // Get data from the published or edited card
    let newItems = [];
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
      itemData.contentMode = item.contentMode;
      itemData.contentType = getContentType(item.contentText, item.contentLabel, item.contentUrl);
      itemData.current = 1;
      if (item.contentText === "$empty") {
        itemData.contentText = "";
      }
      newItems.push(itemData);
      newCounter++;
    });
    newItems = scanIndentation(newItems);
    setItems(newItems);
    setCounter(newCounter);
    setPureCounter(pureCounter + newCounter);
    setErrorMessage("");
    if (props.card.tempCardId) {
      setTitle(props.card.tempTitle);
      setFormat(props.card.tempCardType);
    } else {
      setTitle(props.card.title);
      setFormat(props.card.cardType);
    }
    // eslint-disable-next-line
  }, []);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);


  // Sort icons into three categories, general items, images, and links
  function sortIcons() {
    const gen = [];
    const images = [];
    const links = [];
    for (let i = 0; i < props.iconSet.length; i++) {
      if (props.iconSet[i].typeName === "chart-area") {
        images.push(props.iconSet[i]);
      } else if (props.iconSet[i].typeName === "copy" || props.iconSet[i].typeName === "list" ||
        props.iconSet[i].typeName === "play" || props.iconSet[i].typeName === "video-camera" ||
        props.iconSet[i].typeName === "book" || props.iconSet[i].typeName === "truck") {
        links.push(props.iconSet[i]);
      } else if (props.iconSet[i].typeName !== "info" && props.iconSet[i].typeName !== "link" &&
        props.iconSet[i].typeName !== "fire" && props.iconSet[i].typeName !== "bolt") {
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

  // Returns the content type (number of fields)
  function getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if ((text !== "" || text === "$empty") && label !== "" && url !== "") { return 3; }
  }

  // Keeps track of the current number of input fields
  function incrementCounter(contentType) {
    const newCounter = counter;
    const pureId = pureCounter;
    const key = (newCounter).toString();
    let copy = [...items];

    let newIconType = null;
    if (items.length && items[items.length - 1].contentType === contentType) {
      newIconType = items[items.length - 1].iconType;
    }

    let newContentMode = -1;
    if (items.length && items[items.length - 1].contentType === 3) {
      newContentMode = items[items.length - 1].contentMode;
    }

    // Init new empty item
    copy[key] = {};
    copy[key].counterId = pureId + 1;
    copy[key].contentText = "";
    copy[key].contentLabel = "";
    copy[key].contentUrl = "";
    copy[key].iconType = newIconType;
    copy[key].contentType = contentType;
    copy[key].contentMode = newContentMode;
    copy[key].indentation = 0;

    // Make sure the indentation is up to date
    copy = scanIndentation(copy);

    setItems(copy);
    setCounter(newCounter + 1);
    setPureCounter(pureCounter + newCounter + 1);
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

    // If the current index is the first item on the card or we can not find the index
    if (!arrayIndex || (amount === -1 && copy[arrayIndex].indentation === 0)) {
      return;
    }

    // If we are removing indentation do that and return
    if (amount === -1 && copy[arrayIndex].indentation >= 0) {

      // Lower our indentation level
      copy[arrayIndex].indentation += -1;

      // Update the indentation level across the card
      copy = scanIndentation(copy);

      // We are done. Save the changes and return
      setItems(copy);
    } else {

      // Check if we should be able to update our indentation and by how much
      const prevIndent = copy[arrayIndex - 1].indentation;
      if (copy[arrayIndex].indentation <= prevIndent && copy[arrayIndex].indentation <= 3) {
        copy[arrayIndex].indentation += 1;

        // Update the indentation level across the card
        copy = scanIndentation(copy);

        setItems(copy);
      }

    }

  }

  // Change the placement order of the selected item
  function changeOrder(counterId, up) {
    let arrayIndex = -1;
    let copy = [...items];

    // Find the index of this item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        arrayIndex = i;
        break;
      }
    }

    // If we cannot find the index, then return
    if (arrayIndex === -1) {
      return;
    }

    // Check if we are trying to move up or down the card
    if (up) {
      // if this is not the top item on the card, swap it with the item above it
      if (arrayIndex !== 0) {
        [copy[arrayIndex], copy[arrayIndex - 1]] = [copy[arrayIndex - 1], copy[arrayIndex]];
        copy = scanIndentation(copy);
        setItems(copy);
      }
    } else {
      // if this is not the bottom item on the card, swap it with the item below it
      if (arrayIndex + 1 < copy.length) {
        [copy[arrayIndex], copy[arrayIndex + 1]] = [copy[arrayIndex + 1], copy[arrayIndex]];
        copy = scanIndentation(copy);
        setItems(copy);
      }
    }
  }

  async function handleCreate() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Get the card format from the select
    const formatSelect = document.getElementById("select-new-card-format");
    const newCardFormat = formatSelect.options[formatSelect.selectedIndex].value;

    // Update the order index of each item
    const copy = items;
    for (let i = 0; i < copy.length; i++) {
      copy[i].orderIndex = i;
    }

    // Prepare data for new card
    const cardData = {
      headerId: props.headerId,
      cardType: newCardFormat,
      title: title,
      items: copy
    };

    // Create the new card
    const results = await fetch(`/cards`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      // reset error messages
      setErrorMessage("");

      // close the modal
      props.handleClose();

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

  // Submit the current card
  async function handleEdit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Get the card format from the select
    const formatSelect = document.getElementById("select-new-card-format");
    const newCardFormat = formatSelect.options[formatSelect.selectedIndex].value;

    // Set the order index of each item and clean up assign empty strings as needed
    const copy = items;
    for (let i = 0; i < copy.length; i++) {
      copy[i].orderIndex = i;
      if (copy[i].contentType === 3 && copy[i].contentText === "") {
        copy[i].contentText = "$empty";
      }
    }

    // Prepare data for new card
    const cardData = {
      cardType: newCardFormat,
      title: title,
      items: copy
    };

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
      props.handleClose();

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

  // Deletes the selected item
  function deleteItem(counterId) {
    let arrayIndex = -1;
    let copy = [...items];

    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }

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

    // Delete the selected item
    const count = counter;
    copy.splice(arrayIndex, 1);

    // Update the indentation level across the card
    copy = scanIndentation(copy);

    setItems(copy);
    setCounter(count - 1);
  }

  // Scans through items to ensure they are all indented correctly
  function scanIndentation(itemArray) {
    // The first item in the card can never be indented
    if (itemArray.length) {
      itemArray[0].indentation = 0;
      itemArray[0].maxIndent = 0;
    }
    // Update the indentation of the rest of the items
    for (let i = 1; i < itemArray.length; i++) {
      if (itemArray[i].indentation > itemArray[i - 1].indentation + 1) {
        itemArray[i].indentation = itemArray[i - 1].indentation + 1;
      }
      itemArray[i].maxIndent = itemArray[i - 1].indentation + 1;
    }
    return itemArray;
  }

  // Delete the current card
  async function deleteCard() {
    // Send call to backend to delete card
    const results = await fetch(`/cards/${props.card.cardId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      // Close modal
      props.handleClose();
      // Reload page after deleting
      props.refresh();
    } else {
      setErrorMessage("Error deleting card. Please try again later.");
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
        if (item.contentText === "") {
          emptyFound = true;
          newErrorMessage = "Error: Item is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 2) { // label + url
        if (item.contentLabel === "" || item.contentUrl === "") {
          emptyFound = true;
          newErrorMessage = "Error: Graphic is not filled out completely on line " + (i + 1);
          break;
        }
      } else if (item.contentType === 3) { // text + label + url
        if (item.contentLabel === "" || item.contentUrl === "") {
          emptyFound = true;
          newErrorMessage = "Error: Resource is not filled out completely on line " + (i + 1);
          break;
        }
        if (item.contentMode < 0) {
          emptyFound = true;
          newErrorMessage = "Error: Resource link type is not selected on line " + (i + 1);
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
      copy[key].contentText = e.target.value;
    } else if (contentType === 2) {
      copy[key].contentLabel = e.target.value;
    } else if (contentType === 3) {
      copy[key].contentUrl = e.target.value;
    }
    setItems(copy);
  }

  // Controls link data changes coming from <ItemInput>
  function handleLinkValue(index, value) {
    const key = index.toString();
    const copy = [...items];
    copy[key].contentMode = value;
    setItems(copy);
  }

  // Updates dropdown icon selected for specific index
  // @param {Number} icon itemType ID of Icon
  // @param {Number} index Index of item being changed
  // @return {State} Updated state, no actual return value
  function updateIcon(icon, index) {
    const copy = [...items];
    copy[index].iconType = icon;
    setItems(copy);
  }

  // Gets the name of an icon given an ID and content type
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
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else if (contentType === 2) {
      imageIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else {
      basicIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    }
    list.push(jsx, values);
    return list;
  }

  return (
    <div className='text-center mx-2'>
      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{props.edit ? "Edit Card" : "Create Card"}</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
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
                  id="select-new-card-format"
                  defaultValue={format}
                >
                  <option value="0">Default</option>
                  <option value="1">Thumbnail Gallery</option>
                </select>
              </Form.Group>
            </Col>
          </Row>

          <div className="font-weight-bold mb-2">Items</div>

          {/* Item Input Fields */}

          {items.map((item, i) =>
            <Row className="mb-2" key={item.counterId + "a"}>
              <div className="input-group">
                <span className="ml-2 mr-3">
                  <button className='btn btn-danger btn-sm ml-2'
                    onClick={() => deleteItem(item.counterId)}
                    key={item.counterId + "g"}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-times' />
                  </button>
                  <button className={`btn btn-primary btn-sm ml-2 ${item.indentation === 0 ? "disabled" : ""}`}
                    onClick={() => changeIndent(item.counterId, -1)}
                    key={item.counterId + "c"}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-minus' />
                  </button>
                  <button className={`btn btn-primary btn-sm ml-2 ${item.maxIndent <= item.indentation || item.indentation === 4 ? "disabled" : ""}`}
                    onClick={() => changeIndent(item.counterId, 1)}
                    key={item.counterId + "d"}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-plus' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i ? "" : "disabled"}`}
                    onClick={() => changeOrder(item.counterId, true)}
                    key={item.counterId + "e"}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-up' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i + 1 < items.length ? "" : "disabled"}`}
                    onClick={() => changeOrder(item.counterId, false)}
                    key={item.counterId + "f"}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-down' />
                  </button>
                </span>
                <Indent indentLevel={item.indentation} />
                <IconDropdown key={item.counterId + "b"} idx={i}
                  list={generateIcons(i, item.contentType)}
                  selectedIndex={getIconName(item.iconType, item.contentType)}
                  handleClick={(id, idx) => updateIcon(id, idx)}
                  edit
                />
                <ItemInput
                  title="Text"
                  maxLength="1000"
                  handleInput={(e1, e2, e3) => handleInput(e1, e2, e3)}
                  handleLinkValue={(e1, e2) => handleLinkValue(e1, e2)}
                  index={i}
                  value={item}
                  contentType={item.contentType}
                />
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

          {props.edit ? (
            <Fragment>
              <Button
                className="mr-auto"
                variant="danger"
                onClick={() => { if (window.confirm("Are you sure you wish to delete this card?")) { deleteCard(); } }}
              >
                Delete Card
              </Button>
              <Button variant="primary" onClick={() => handleEdit()}>Submit Card Changes</Button>
            </Fragment>
          ) : (
            <Button variant="primary" onClick={() => handleCreate()}>Submit Card</Button>
          )}
          <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>

        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default ConstructCardModal;

ConstructCardModal.propTypes = {
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  card: PropTypes.object,
  handleUpdate: PropTypes.func,
  iconSet: PropTypes.array,
  headerId: PropTypes.number
};
