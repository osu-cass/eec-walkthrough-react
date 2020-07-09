import React, {useState} from "react";
import {Button} from "react-bootstrap";
import ConstructIconModal from "./ConstructIconModal";
import PropTypes from "prop-types";

// Button that allows a user to edit an icon
function EditIcon(props) {

  const [show, setShow] = useState(false);

  // Hides the modal
  function handleClose() {
    setShow(false);
  }

  // Shows the modal
  function handleShow(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setShow(true);
  }

  return (
    <div className="text-center mx-2">
      <Button size="sm" variant="info" onClick={(e) => handleShow(e)}>
        <i
          className="fas fa-fw fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Icon</span>
      </Button>
      <ConstructIconModal
        edit={true}
        handleClose={() => handleClose()}
        show={show}
        icon={props.icon}
      />
    </div>
  );

}
export default EditIcon;

EditIcon.propTypes = {
  icon: PropTypes.object
};
