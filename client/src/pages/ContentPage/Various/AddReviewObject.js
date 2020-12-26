import React, {useState, Fragment} from "react";
import Toast from "../../../components/General/Toast";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

// Button that allows a user to add this object to their publish request.
function AddReviewObject(props) {

  const [addToast, setAddToast] = useState(false);
  const [dupToast, setDupToast] = useState(false);

  // Save the object to local storage if it doesn't already exist
  function handleAddObjectRequest() {
    try {
      // See if we already have a collection of objects to add.
      let collection = window.localStorage.getItem("publishRequestObjects");
      collection = JSON.parse(collection);

      const object = {
        objectType: props.objectType,
        objectId: props.objectId
      };

      // Make sure the object is not already added
      let newObject = true;
      for (let i = 0; i < collection.objects.length; i++) {
        if (collection.objects[i].objectType === props.objectType &&
            collection.objects[i].objectId === props.objectId) {
          newObject = false;
          break;
        }
      }

      // add the object to the request if it is new
      if (newObject) {
        collection.objects.push(object);
        window.localStorage.setItem("publishRequestObjects", JSON.stringify(collection));
        setAddToast(true);
        setDupToast(false);
      } else {
        setAddToast(false);
        setDupToast(true);
      }
    } catch {
      // We don't have a valid collection of objects.
      // We will want to create a new collection of objects.
      const collection = {
        objects: []
      };

      const object = {
        objectType: props.objectType,
        objectId: props.objectId
      };

      collection.objects.push(object);
      window.localStorage.setItem("publishRequestObjects", JSON.stringify(collection));

      setAddToast(true);
      setDupToast(false);
    }
  }

  // close a toast
  function closeToast(toastIndex) {
    if (toastIndex === 1) {
      setAddToast(false);
    } else {
      setDupToast(false);
    }
  }

  return (
    <Fragment>
      {props.objectType === 1 ? (
        <Fragment>
          <Toast show={addToast} text="Page Added" handleClose={() => closeToast(1)} />
          <Toast show={dupToast} text="Page Already Added" handleClose={() => closeToast(2)} />
        </Fragment>
      ) : (
        null
      )}

      {props.objectType === 2 ? (
        <Fragment>
          <Toast show={addToast} text="Header Added" handleClose={() => closeToast(1)} />
          <Toast show={dupToast} text="Header Already Added" handleClose={() => closeToast(2)} />
        </Fragment>
      ) : (
        null
      )}

      {props.objectType === 3 ? (
        <Fragment>
          <Toast show={addToast} text="Card Added" handleClose={() => closeToast(1)} />
          <Toast show={dupToast} text="Card Already Added" handleClose={() => closeToast(2)} />
        </Fragment>
      ) : (
        null
      )}

      <div className="text-center my-1 ml-auto">
        <Button variant="info" onClick={() => handleAddObjectRequest()}>
          <span className="text-white">Add to Publish Request</span>
        </Button>
      </div>
    </Fragment>
  );

}
export default AddReviewObject;

AddReviewObject.propTypes = {
  objectType: PropTypes.number,
  objectId: PropTypes.number
};