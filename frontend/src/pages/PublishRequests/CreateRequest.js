import React, {useState} from "react";
import {Button} from "react-bootstrap";
import ConstructRequestModal from "./ConstructRequestModal";

// Button that allows a user to create a publish request
function CreateRequest() {

  const [show, setShow] = useState(false);

  // Hides the modal
  function handleClose() {
    setShow(false);
  }

  // Shows the modal
  function handleShow() {
    setShow(true);
  }

  return (
    <div className="text-center mx-2 mt-3 mb-4">
      <Button variant="info" onClick={(e) => handleShow(e)}>
        <i
          className="fas fa-fw fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Create Request</span>
      </Button>
      <ConstructRequestModal
        handleClose={() => handleClose()}
        show={show}
      />
    </div>
  );

}
export default CreateRequest;