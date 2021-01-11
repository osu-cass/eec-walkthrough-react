import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../../utilities/cookieAuth";
import {isGraphic} from "../../../utilities/itemType";
import PropTypes from "prop-types";
import BasicItems from "./BasicItems";
import ThumbnailGallery from "./ThumbnailGallery";
import HighlightText from "../Various/HighlightText";
import {formatTime} from "../../../utilities/formatTime";
import {API_URL} from "../../../utilities/constants";
import Error from "../../../components/General/Error";
import AddReviewObject from "../Various/AddReviewObject";
import "./ReviewCard.css";

// Button and modal that allows a user to review a card
function ReviewCard(props) {

  const [role, setRole] = useState(0);
  const [show, setShow] = useState(false);
  const [imageItems, setImageItems] = useState([]);
  const [imageTempItems, setTempImageItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardTypeName, setCardTypeName] = useState("Default");
  const [tempCardTypeName, setTempCardTypeName] = useState("Default");

  // get the current users role
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
  }, []);

  // display the correct card type in the review modal
  useEffect(() => {
    if (props.card.cardType === 10) {
      setCardTypeName("Default / Internal");
    } else if (props.card.cardType === 11) {
      setCardTypeName("Thumbnail Gallery / Internal");
    } else if (props.card.cardType === 12) {
      setCardTypeName("Expandable List / Internal");
    } else if (props.card.cardType === 1) {
      setCardTypeName("Thumbnail Gallery");
    } else if (props.card.cardType === 2) {
      setCardTypeName("Expandable List");
    } else {
      setCardTypeName("Default");
    }

    if (props.card.tempCardType === 10) {
      setTempCardTypeName("Default / Internal");
    } else if (props.card.tempCardType === 11) {
      setTempCardTypeName("Thumbnail Gallery / Internal");
    } else if (props.card.tempCardType === 12) {
      setTempCardTypeName("Expandable List / Internal");
    } else if (props.card.tempCardType === 1) {
      setTempCardTypeName("Thumbnail Gallery");
    } else if (props.card.tempCardType === 2) {
      setTempCardTypeName("Expandable List");
    } else {
      setTempCardTypeName("Default");
    }
  }, [props.card.tempCardType, props.card.cardType]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const imageArray = [];
    const tempImageArray = [];
    for (let i = 0; i < props.card.items.length; i++) {
      if (isGraphic(props.card.items[i])) {
        imageArray.push(props.card.items[i]);
      }
    }
    for (let i = 0; i < props.card.tempItems.length; i++) {
      if (isGraphic(props.card.tempItems[i])) {
        tempImageArray.push(props.card.tempItems[i]);
      }
    }
    setImageItems(imageArray);
    setTempImageItems(tempImageArray);
  }, [props.card.items, props.card.tempItems]);

  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }
  function handleShow() {
    setShow(true);
  }

  // delete changes
  async function handleClear() {
    // Check that the user really wants to delete the changes this version
    if (!window.confirm("Are you sure you want to delete the proposed changes?")) {
      return;
    }

    if (!window.confirm("Confirm one last time that you want to delete the the proposed changes.")) {
      return;
    }

    // delete proposed changes
    const results = await fetch(`${API_URL}/cards/${props.card.cardId}/changes`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newCard = {
        approved: props.card.approved,
        cardId: props.card.cardId,
        headerId: props.card.headerId,
        cardType: props.card.cardType,
        title: props.card.title,
        items: props.card.items,
        userId: props.card.userId,
        created: props.card.created,
        orderIndex: props.card.orderIndex,
        tempOrderIndex: null,
        tempCardId: null,
        tempCardType: null,
        tempCreated: null,
        tempUserId: null,
        tempItems: [],
        tempTitle: null
      };

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newCard, "card", "clear");

    } else {

      const obj = await results.json();

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

  // unpublish
  async function handleRemove() {
    // Check that the user really wants to unpublish this version
    if (!window.confirm("Are you sure you want to unpublish this card?\nThis will overwrite any unpublished version if one exists.")) {
      return;
    }

    // Unpublish the card
    const results = await fetch(`${API_URL}/cards/${props.card.cardId}/unpublish`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newCard = {
        approved: 0,
        cardId: props.card.cardId,
        headerId: props.card.headerId,
        cardType: props.card.cardType,
        title: props.card.title,
        items: [],
        userId: props.card.userId,
        created: props.card.created,
        orderIndex: props.card.orderIndex,
        tempOrderIndex: null,
        tempCardId: null,
        tempCardType: null,
        tempCreated: null,
        tempUserId: null,
        tempItems: props.card.items,
        tempTitle: null
      };

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newCard, "card", "unpublish");

    } else {

      const obj = await results.json();

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

  // publish
  async function handleSubmit() {
    // Check that the user really wants to approve this version
    if (!window.confirm("Are you sure you want to approve this new version?\nThis will overwrite the published version if one exists.")) {
      return;
    }

    // Approve the card
    const results = await fetch(`${API_URL}/cards/${props.card.cardId}/publish`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      let newCard = {};

      if (props.card.approved) {
        newCard = {
          approved: 1,
          cardId: props.card.cardId,
          headerId: props.card.headerId,
          cardType: props.card.tempCardType,
          title: props.card.tempTitle,
          items: props.card.tempItems,
          userId: props.card.tempUserId,
          created: props.card.tempCreated,
          orderIndex: props.card.tempOrderIndex,
          tempOrderIndex: null,
          tempCardId: null,
          tempCardType: null,
          tempCreated: null,
          tempUserId: null,
          tempItems: [],
          tempTitle: null
        };
      } else {
        newCard = {
          approved: 1,
          cardId: props.card.cardId,
          headerId: props.card.headerId,
          cardType: props.card.cardType,
          title: props.card.title,
          items: props.card.tempItems,
          userId: props.card.userId,
          created: props.card.created,
          orderIndex: props.card.orderIndex,
          tempOrderIndex: null,
          tempCardId: null,
          tempCardType: null,
          tempCreated: null,
          tempUserId: null,
          tempItems: [],
          tempTitle: null
        };
      }

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newCard, "card", "publish");

    } else {

      const obj = await results.json();

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

  return role >= 3 ? (
    <div className="text-center mx-2 my-auto d-print-none">

      <Button size="sm" variant="success" onClick={() => handleShow()}>
        <i
          className='fas fa-stamp text-white mr-2'
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Review Card</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Review Card (#card-{props.card.cardId})</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {props.card.approved ? (
            <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
              <h4 className="font-weight-bold">Published Version ({cardTypeName})</h4>
              <span className="created-text">Last updated {formatTime(props.card.created)}</span>
              <div className="m-3">
                {props.card.tempCardId ? (
                  <HighlightText
                    newMode={false}
                    newText={props.card.tempTitle}
                    oldText={props.card.title}
                    elementType={1}
                  />
                ) : (
                  <h3 className="font-weight-bold">{props.card.title}</h3>
                )}
                {props.card.cardType === 1 || props.card.cardType === 11 ? (
                  <div className="m-0 p-0 card border-0">
                    {props.card.tempCardId ? (
                      <ThumbnailGallery items={imageItems} compareMode={2} otherItems={imageTempItems} />
                    ) : (
                      <ThumbnailGallery items={imageItems} />
                    )}
                  </div>
                ) : (
                  <div className="m-0 p-0 card border-0">
                    {props.card.tempCardId ? (
                      <BasicItems items={props.card.items} mode={props.mode} reviewing={true} compareMode={2} otherItems={props.card.tempItems} setCheck={() => {}} />
                    ) : (
                      <BasicItems items={props.card.items} mode={props.mode} reviewing={true} setCheck={() => {}} />
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            null
          )}

          {props.edited ? (
            <Fragment>
              {props.card.approved && props.card.tempCardId ? (
                <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
                  <h4 className="font-weight-bold">New Version ({tempCardTypeName})</h4>
                  <span className="created-text">Last updated {formatTime(props.card.tempCreated)}</span>
                  <div className="m-3">
                    <HighlightText
                      newMode={true}
                      newText={props.card.tempTitle}
                      oldText={props.card.title}
                      elementType={1}
                    />
                    {props.card.tempCardType === 1 || props.card.tempCardType === 11 ? (
                      <ThumbnailGallery items={imageTempItems} reviewing={true} compareMode={1} otherItems={imageItems} />
                    ) : (
                      <div className="m-0 p-0 card border-0">
                        <BasicItems items={props.card.tempItems} mode={props.mode} reviewing={true} compareMode={1} otherItems={props.card.items} setCheck={() => {}} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="version-container p-2 m-3 border border-dark rounded text-wrap">
                  <h4 className="font-weight-bold">New Version ({cardTypeName})</h4>
                  <span className="created-text">Last updated {formatTime(props.card.created)}</span>
                  <div className="m-3">
                    <h3 className="font-weight-bold">{props.card.title}</h3>
                    {props.card.cardType === 1 || props.card.cardType === 11 ? (
                      <ThumbnailGallery items={imageTempItems} />
                    ) : (
                      <div className="m-0 p-0 card border-0">
                        <BasicItems items={props.card.tempItems} reviewing={true} setCheck={() => {}} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          ) : (
            null
          )}

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
          {role >= 5 ? (
            <Fragment>
              <Fragment>
                {props.edited ? (
                  <Fragment>
                    <Button
                      className="mr-auto"
                      variant="danger"
                      onClick={() => handleClear()}
                    >
                      Delete Changes
                    </Button>
                    <AddReviewObject
                      objectType={3}
                      objectId={props.card.cardId}
                    />
                  </Fragment>
                ) : (
                  null
                )}
              </Fragment>
              <Fragment>
                {props.card.approved && props.edited ? (
                  <Fragment>
                    <Button
                      className="ml-1"
                      variant="danger"
                      onClick={() => handleRemove()}
                    >
                      Unpublish Card
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {props.card.approved ? (
                      <Button variant="danger" onClick={() => handleRemove()}>Unpublish Card</Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                    )}
                  </Fragment>
                )}
              </Fragment>
            </Fragment>
          ) : (
            <Fragment>
              {props.edited ? (
                <Fragment>
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => handleClear()}
                  >
                    Delete Changes
                  </Button>
                  <AddReviewObject
                    objectType={3}
                    objectId={props.card.cardId}
                  />
                </Fragment>
              ) : (
                null
              )}
            </Fragment>
          )}
          <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default ReviewCard;

ReviewCard.propTypes = {
  edited: PropTypes.bool,
  handleUpdate: PropTypes.func,
  card: PropTypes.object,
  mode: PropTypes.number
};