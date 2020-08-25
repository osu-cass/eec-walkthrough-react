import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {getProfile} from "../../utilities/cookieAuth";
import ConstructCardModal from "./ConstructCardModal";
import PropTypes from "prop-types";

// Button that allows a user to edit a card
function EditCard(props) {

  const [show, setShow] = useState(false);
  const [role] = useState(getProfile().role);

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

  return role >= 3 ? (
    <div className="text-center mx-2">
      <Button size="sm" variant="info" onClick={(e) => handleShow(e)}>
        <i
          className="fas fa-fw fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Card</span>
      </Button>
      <ConstructCardModal
        edit={true}
        handleClose={() => handleClose()}
        show={show}
        handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
        iconSet={props.iconSet}
        card={props.card}
        role={props.role}
        sources={props.sources}
      />
    </div>
  ) : (
    null
  );

}
export default EditCard;

EditCard.propTypes = {
  card: PropTypes.object,
  handleUpdate: PropTypes.func,
  iconSet: PropTypes.array,
  role: PropTypes.number,
  sources: PropTypes.array
};
