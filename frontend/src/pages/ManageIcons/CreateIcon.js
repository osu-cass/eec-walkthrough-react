import React, {useState} from "react";
import {Button} from "react-bootstrap";
import ConstructIconModal from "./ConstructIconModal";
import PropTypes from "prop-types";
import "./CreateIcon.css";

// Button that allows a user to create an icon
function CreateIcons(props) {

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
    <div className="text-center mx-2 mt-2 mb-4">
      <Button variant="info" onClick={(e) => handleShow(e)}>
        <i
          className="fas fa-fw fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Create Icon</span>
      </Button>
      <ConstructIconModal
        edit={false}
        handleClose={() => handleClose()}
        handleUpdate={() => props.handleUpdate()}
        show={show}
      />
    </div>
  );

}
export default CreateIcons;

CreateIcons.propTypes = {
  handleUpdate: PropTypes.func
};