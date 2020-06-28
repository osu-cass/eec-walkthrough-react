import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {getProfile} from "../../utilities/cookieAuth";
import ConstructCardModal from "./ConstructCardModal";
import PropTypes from "prop-types";

// Button and modal that allows a user to edit a card
function EditCard(props) {

  const [show, setShow] = useState(false);
  const [role, setRole] = useState(getProfile().role);

  // Hides the modal
  function handleClose() {
    setShow(false);
  }

  // Shows the modal
  function handleShow() {
    setShow(true);
  }

  return role >= 3 ? (
    <div className='text-center mx-2'>
      <Button size="sm" variant="info" onClick={() => handleShow()}>
        <i
          className='fas fa-fw fa-edit text-white mr-2'
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Card</span>
      </Button>
      <ConstructCardModal
        edit={true}
        handleClose={() => handleClose()}
        show={show}
        card={props.card}
        refresh={() => props.refresh()}
        iconSet={props.iconSet}
      />
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

