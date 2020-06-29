import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {getProfile} from "../../utilities/cookieAuth";
import ConstructCardModal from "./ConstructCardModal";
import PropTypes from "prop-types";
import "./CreateCard.css";

// Button that allows a user to create a card
function CreateCard(props) {

  const [show, setShow] = useState(false);
  const [role] = useState(getProfile().role);

  // Hides the modal
  function handleClose() {
    setShow(false);
  }

  // Shows the modal
  function handleShow() {
    setShow(true);
  }

  return role >= 3 && props.mode === 1 ? (
    <div className="text-center mt-3 mb-2">
      <Button variant="info" onClick={() => handleShow()}>
        <i
          className="fas fa-plus-circle text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Create Card</span>
      </Button>
      <ConstructCardModal
        edit={false}
        handleClose={() => handleClose()}
        show={show}
        refresh={() => props.refresh()}
        iconSet={props.iconSet}
        headerId={props.headerId}
      />
    </div>
  ) : (
    null
  );

}
export default CreateCard;

CreateCard.propTypes = {
  refresh: PropTypes.func,
  iconSet: PropTypes.array,
  headerId: PropTypes.number,
  mode: PropTypes.number
};