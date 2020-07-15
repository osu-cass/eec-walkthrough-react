import React, {useState} from "react";
import {Button} from "react-bootstrap";
import ConstructLinkModal from "./ConstructLinkModal";
import PropTypes from "prop-types";

// Button that allows a user to edit a link
function EditLinks(props) {

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
    <div className="text-left mx-2">
      <Button size="sm" variant="info" onClick={(e) => handleShow(e)}>
        <i
          className="fas fa-fw fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Link</span>
      </Button>
      <ConstructLinkModal
        handleClose={() => handleClose()}
        handleUpdate={() => props.handleUpdate()}
        show={show}
        link={props.link}
      />
    </div>
  );

}
export default EditLinks;

EditLinks.propTypes = {
  link: PropTypes.object,
  handleUpdate: PropTypes.func
};
