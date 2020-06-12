import React from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";

function MyVerticallyCenteredModal(props) {
  const [expand, setExpand] = React.useState(false);

  return (
    <Modal
      {...props}
      dialogClassName={expand ? "modal-expand" : "modal-inscreen"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExited={() => setExpand(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={props.url}
          alt={props.header}
          className="rounded img-fluid w-100 mx-auto d-block"
          style={{cursor: "pointer"}}
          onClick={() => setExpand(!expand)}
        />
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;

MyVerticallyCenteredModal.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string
};