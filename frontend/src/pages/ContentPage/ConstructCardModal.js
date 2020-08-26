import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import AddButton from "./AddButton";
import ItemInput from "./ItemInput";
import IconDropdown from "./IconDropdown";
import Toast from "../../components/General/Toast";
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
  const [checked, setChecked] = useState(0);
  const [copyToast, setCopyToast] = useState(false);
  const [cardTitleMode, setCardTitleMode] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);

  // setup card data
  useEffect(() => {
    // Sort icons into three categories, general items, images, and links
    sortIcons(props.iconSet);

    // If we are a new card, just return
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
      itemData.internal = item.internal;
      itemData.sourceId = item.sourceId;
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
    setChecked(isInternal());
    // eslint-disable-next-line
  }, [props.show]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  // Checks if the current card is internal only
  function isInternal() {
    let currentCardType = 0;

    if (props.card.tempCardId) {
      currentCardType = props.card.tempCardType;
    } else {
      currentCardType = props.card.cardType;
    }

    return currentCardType >= 10;
  }

  // Sort icons into three categories, general items, images, and links
  function sortIcons() {
    const gen = [];
    const images = [];
    const links = [];
    for (let i = 0; i < props.iconSet.length; i++) {
      if (props.iconSet[i].groupIndex === 1) {
        gen.push(props.iconSet[i]);
      } else if (props.iconSet[i].groupIndex === 2) {
        images.push(props.iconSet[i]);
      } else if (props.iconSet[i].groupIndex === 3) {
        links.push(props.iconSet[i]);
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
    let newIndent = 0;
    if (items.length) {
      newIndent = items[items.length - 1].indentation;
      if (items[items.length - 1].contentType === contentType) {
        newIconType = items[items.length - 1].iconType;
      }
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
    copy[key].indentation = newIndent;
    copy[key].internal = 0;
    copy[key].sourceId = 0;

    // Make sure the indentation is up to date
    copy = scanIndentation(copy);

    setItems(copy);
    setCounter(newCounter + 1);
    setPureCounter(pureCounter + newCounter + 1);
  }

  // Increase the indentation level of the item
  function changeIndent(amount) {
    const counterId = selectedItem;
    let arrayIndex = -1;
    let copy = [...items];

    // Find the index of this item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index then return
    if (arrayIndex === -1) {
      console.error("Unable to find item to indent");
      return;
    }

    // If the current index is the first item on the card return
    if (arrayIndex === 0) {
      console.error("This item can not be indented");
      return;
    }

    // If we are removing indentation do that and return
    if (amount === -1) {

      // Lower our indentation level
      if (copy[arrayIndex].indentation > 0) {
        copy[arrayIndex].indentation += -1;

        // Update the indentation level across the card
        copy = scanIndentation(copy);

        // We are done. Save the changes and return
        setItems(copy);
      }

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
  function changeOrder(up) {
    const counterId = selectedItem;
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
      console.error("Unable to find item to move");
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
    let newCardFormat = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);
    if (document.getElementById("internal-modal-checkbox").checked) {
      newCardFormat += 10;
    }

    // Update the order index of each item
    const copy = items;
    for (let i = 0; i < copy.length; i++) {
      copy[i].orderIndex = i;
    }

    // If we are using a preset title apply it now
    let submitTitle = title;
    if (cardTitleMode !== "") {
      submitTitle = cardTitleMode;
    }

    // Prepare data for new card
    const cardData = {
      headerId: props.headerId,
      cardType: newCardFormat,
      title: submitTitle,
      items: copy
    };

    // Create the new card
    const results = await fetch(`/api/cards`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      const obj = await results.json();

      // give ids and icon type names to each item
      for (let i = 0; i < copy.length; i++) {
        copy[i].itemId = i;
        copy[i].approved = 0;
        for (let j = 0; j < props.iconSet.length; j++) {
          if (props.iconSet[j].iconType === copy[i].iconType) {
            copy[i].typeName = props.iconSet[j].typeName;
            copy[i].color = props.iconSet[j].color;
          }
        }
      }

      const newCard = {
        approved: 0,
        cardId: obj.insertId,
        headerId: props.headerId,
        cardType: newCardFormat,
        title: submitTitle,
        items: [],
        userId: 0,
        created: new Date().toISOString()
          .slice(0, 19)
          .replace("T", " "),
        orderIndex: obj.insertId,
        tempOrderIndex: null,
        tempCardId: null,
        tempCardType: null,
        tempCreated: null,
        tempUserId: null,
        tempTitle: null,
        tempItems: copy
      };

      props.handleUpdate(newCard, "card", "create");

      // Reset state
      setCounter(0);
      setPureCounter(0);
      setTitle("");
      setFormat(0);
      setItems([]);
      setErrorMessage("");

      // Close modal
      props.handleClose();

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
    let newCardFormat = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);
    if (document.getElementById("internal-modal-checkbox").checked) {
      newCardFormat += 10;
    }

    // Set the order index of each item and clean up empty strings as needed
    const copy = items;
    for (let i = 0; i < copy.length; i++) {
      copy[i].orderIndex = i;
      if (copy[i].contentType === 3 && copy[i].contentText === "") {
        copy[i].contentText = "$empty";
      }
    }

    // If we are using a preset title apply it now
    let submitTitle = title;
    if (cardTitleMode !== "") {
      submitTitle = cardTitleMode;
    }

    // Prepare data for new card
    const cardData = {
      cardType: newCardFormat,
      title: submitTitle,
      items: copy
    };

    // Edit card
    const results = await fetch(`/api/cards/${props.card.cardId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      // give ids and icon type names to each item
      for (let i = 0; i < copy.length; i++) {
        copy[i].itemId = i;
        copy[i].approved = 0;
        for (let j = 0; j < props.iconSet.length; j++) {
          if (props.iconSet[j].iconType === copy[i].iconType) {
            copy[i].typeName = props.iconSet[j].typeName;
            copy[i].color = props.iconSet[j].color;
          }
        }
      }

      let newCard = {};

      if (props.card.approved) {
        newCard = {
          approved: props.card.approved,
          cardId: props.card.cardId,
          headerId: props.card.headerId,
          cardType: props.card.cardType,
          title: props.card.title,
          items: props.card.items,
          userId: props.card.userId,
          created: props.card.created,
          orderIndex: props.card.orderIndex,
          tempOrderIndex: props.card.orderIndex,
          tempCardId: props.card.cardId,
          tempCardType: newCardFormat,
          tempCreated: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          tempUserId: 0,
          tempItems: copy,
          tempTitle: submitTitle
        };
      } else {
        newCard = {
          approved: props.card.approved,
          cardId: props.card.cardId,
          headerId: props.card.headerId,
          cardType: newCardFormat,
          title: submitTitle,
          items: props.card.items,
          userId: 0,
          created: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          orderIndex: props.card.orderIndex,
          tempOrderIndex: props.card.tempOrderIndex,
          tempCardId: props.card.tempCardId,
          tempCardType: props.card.tempCardType,
          tempCreated: props.card.tempCreated,
          tempUserId: props.card.tempUserId,
          tempItems: copy,
          tempTitle: props.card.tempTitle
        };
      }

      props.handleUpdate(newCard, "card", "update");

      // Reset state
      setCounter(0);
      setPureCounter(0);
      setTitle("");
      setFormat(0);
      setItems([]);
      setErrorMessage("");

      // Close modal
      props.handleClose();

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
  function deleteItem() {
    const counterId = selectedItem;
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
      console.error("Unable to find the item to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this item?")) {
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
    const results = await fetch(`/api/cards/${props.card.cardId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newCard = {
        cardId: props.card.cardId,
        tempCardId: props.card.tempCardId,
        headerId: props.card.headerId
      };

      // Reset state
      setCounter(0);
      setPureCounter(0);
      setTitle("");
      setFormat(0);
      setItems([]);
      setErrorMessage("");

      // Close modal
      props.handleClose();

      props.handleUpdate(newCard, "card", "delete");

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
    if (!title.length && cardTitleMode === "") {
      emptyFound = true;
      newErrorMessage = "Error: Empty card title";
      if (emptyFound) {
        setErrorMessage(newErrorMessage);
        return true;
      }
    }
    // Empty item array
    if (items.length === 0) {
      setErrorMessage("Error: A card must contain at least one item");
      return true;
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

  // Controls source data changes coming from <ItemInput>
  function handleSourceValue(index, value) {
    const key = index.toString();
    const copy = [...items];
    copy[key].sourceId = value;
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
  function generateIcons(i, contentType) {
    const list = [];
    const jsx = [];
    const values = [];
    if (contentType === 3) {
      linkIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} style={{color: type.color}} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} style={{color: type.color}} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else if (contentType === 2) {
      imageIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} style={{color: type.color}} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} style={{color: type.color}} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    } else {
      basicIcons.map((type) => {
        // filter out icons based on the content type
        jsx.push(<div className="dropdown-item clickIcon" style={{cursor: "pointer"}} key={type.typeId + "a"}>
          <i className={`fas fa-fw fa-${type.typeName}`} key={type.typeId + "b"} style={{color: type.color}} /> {type.typeKeyword}
        </div>);
        const jsxIcon = <i className={`fas fa-fw fa-${type.typeName}`} style={{color: type.color}} />;
        values.push([type.iconType, jsxIcon]);
        return null;
      });
    }
    list.push(jsx, values);
    return list;
  }

  // Copy item
  function copyItem() {
    const counterId = selectedItem;
    let arrayIndex = -1;
    const copy = [...items];
    let item = {};

    // Find the index of this item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        item = copy[i];
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find item to copy");
      return;
    }

    // show the toast stating that we have copied an item
    setCopyToast(true);

    // stringify the item data
    const itemString = item.contentText + "$%$" + item.contentLabel + "$%$" +
      item.contentUrl + "$%$" + item.iconType + "$%$" + item.contentType + "$%$" +
      item.contentMode;

    // save the item to local storage
    window.localStorage.setItem("itemCopy", itemString);
  }

  // Paste item
  function pasteItem() {
    // retrieve the item from local storage
    const newItem = window.localStorage.getItem("itemCopy");
    if (newItem === null) {
      setErrorMessage("No item to paste from clipboard");
      return;
    }

    // split the item into an array
    const itemArray = newItem.split("$%$");

    // add the item to the card
    const newCounter = counter;
    const pureId = pureCounter;
    const key = (newCounter).toString();
    let copy = [...items];

    // create the new item
    copy[key] = {};
    copy[key].counterId = pureId + 1;
    copy[key].contentText = itemArray[0];
    copy[key].contentLabel = itemArray[1];
    copy[key].contentUrl = itemArray[2];
    copy[key].iconType = parseInt(itemArray[3], 10);
    copy[key].contentType = parseInt(itemArray[4], 10);
    copy[key].contentMode = parseInt(itemArray[5], 10);
    copy[key].indentation = 0;

    // Make sure the indentation is up to date
    copy = scanIndentation(copy);

    setItems(copy);
    setCounter(newCounter + 1);
    setPureCounter(pureCounter + newCounter + 1);
  }

  // Closes the specified toast
  function closeToast() {
    setCopyToast(false);
  }

  // Updates the current card title when the dropdown is changed
  function updateCardTitle() {
    const titleSelect = document.getElementById("card-title-dropdown");
    const newCardValue = titleSelect.options[titleSelect.selectedIndex].value;
    setCardTitleMode(newCardValue);
  }

  // Toggle the internal status of an item
  function toggleInternal() {
    const counterId = selectedItem;
    let arrayIndex = -1;
    const copy = [...items];

    // Find the item
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].counterId === counterId) {
        if (copy[i].internal === 1) {
          copy[i].internal = 0;
        } else {
          copy[i].internal = 1;
        }
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find item change internal status");
    } else {
      setItems(copy);
    }

  }

  return (
    <div className='text-center mx-2'>

      <Toast show={copyToast} text="Item copied" handleClose={() => closeToast()} />

      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{props.edit ? "Edit Card" : "Create Card"}</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="cardTitleDropdown">
                <Form.Label className="font-weight-bold">Card Title</Form.Label>
                <select className="form-control"
                  id="card-title-dropdown"
                  defaultValue="0"
                  onChange={() => updateCardTitle()}
                >
                  <option value="">Custom</option>
                  {props.cardTitles.map((title) =>
                    <option value={title.title}>{title.title}</option>
                  )}
                </select>
              </Form.Group>
            </Col>
          </Row>

          {cardTitleMode === "" ? (
            <Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Label className="font-weight-bold">Custom Card Title</Form.Label>
                  <Form.Control type="text" maxLength="100" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            null
          )}

          <Row>
            <Col>
              <Form.Group controlId="formFormat">
                <Form.Label className="font-weight-bold">Card Format</Form.Label>
                <select className="form-control"
                  id="select-new-card-format"
                  defaultValue={format}
                >
                  <option value="0">Default</option>
                  <option value="1">Thumbnail Gallery</option>
                  <option value="2">Expandable List</option>
                </select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="custom-control form-control-lg custom-checkbox my-2">
                {checked ? (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox" onClick={() => setChecked(0)} defaultChecked
                  />
                ) : (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox"
                  />
                )}
                <label className="form-check-label custom-control-label font-weight-bold pl-3" htmlFor="internal-modal-checkbox">
                  Internal (not viewable by the public)
                </label>
              </div>
            </Col>
          </Row>

          <div className="font-weight-bold mb-2">Items</div>

          <div className="item-button-bar card sticky-top py-2 px-2 mb-3">
            <div>
              <button className="btn btn-danger btn ml-2"
                onClick={() => deleteItem()}
              >
                <i className="fas fa-fw fa-times mr-2" />
                Delete Item
              </button>

              <button className="btn btn-info internal-item-button btn ml-2"
                onClick={() => toggleInternal()}
              >
                <i className="fas fa-fw fa-unlock mr-2" />
                Toggle Internal
              </button>

              <button className="btn btn-info copy-paste-button btn ml-2"
                onClick={() => copyItem()}
              >
                <i className="fas fa-fw fa-copy mr-2" />
                Copy Item
              </button>

              <button className="btn btn-primary btn ml-2"
                onClick={() => changeIndent(-1)}
              >
                <i className="fas fa-fw fa-minus mr-2" />
                Unindent
              </button>

              <button className="btn btn-primary btn ml-2"
                onClick={() => changeIndent(1)}
              >
                <i className="fas fa-fw fa-plus mr-2" />
                Indent
              </button>

              <button className="btn btn-success btn ml-2"
                onClick={() => changeOrder(true)}
              >
                <i className="fas fa-fw fa-arrow-up mr-2" />
                Move Up
              </button>

              <button className="btn btn-success btn ml-2"
                onClick={() => changeOrder(false)}
              >
                <i className="fas fa-fw fa-arrow-down mr-2" />
                Move Down
              </button>
            </div>
          </div>

          {/* Item Input Fields */}

          {items.map((item, i) =>
            <Row
              className={`mb-2 mx-2 ${item.counterId === selectedItem ? "modal-selected-item" : ""} ${item.internal ? "internal-modal-item" : ""}`}
              key={item.counterId}
              onClick={() => setSelectedItem(item.counterId)}
            >
              <div className="input-group">
                <Indent indentLevel={item.indentation} />
                <IconDropdown
                  idx={i}
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
                  handleSourceValue={(e1, e2) => handleSourceValue(e1, e2)}
                  index={i}
                  value={item}
                  contentType={item.contentType}
                  internal={item.internal}
                  sourceId={item.sourceId}
                  sources={props.sources}
                />
              </div>
            </Row>
          )}

          <Row>
            <Col className="mt-2">
              <AddButton variant="info" label="Add Item" onClick={() => incrementCounter(1)} />
              <AddButton variant="success" label="Add Graphic" onClick={() => incrementCounter(2)} />
              <AddButton variant="primary" label="Add Site Resource" onClick={() => incrementCounter(3)} />
              <Button
                onClick={() => pasteItem()}
                className="mr-2 copy-paste-button"
                variant="info"
              >
                <i
                  className='fas fa-paste text-white mr-2'
                  style={{transform: "scale(1.5)"}}
                />
                Paste Item
              </Button>
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
              {props.role >= 4 ? (
                <Fragment>
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => { if (window.confirm("Are you sure you want to delete this card?")) { deleteCard(); } }}
                  >
                  Delete Card
                  </Button>
                  <Button variant="primary" onClick={() => handleEdit()}>Submit Card Changes</Button>
                </Fragment>
              ) : (
                <Button variant="primary" onClick={() => handleEdit()}>Submit Card Changes</Button>
              )}
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
  headerId: PropTypes.number,
  sources: PropTypes.array,
  cardTitles: PropTypes.array,
  role: PropTypes.number
};
