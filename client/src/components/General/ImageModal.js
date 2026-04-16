import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import { proxyImage } from "../../utilities/imageProxy";

// Modal for holding images
function ImageModal(props) {
  const [expand, setExpand] = useState(false);

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
          src={proxyImage(props.url)}
          alt={props.header}
          onError={(e) => e.target.src = "/missing.png"}
          className="rounded img-fluid w-100 mx-auto d-block"
          style={{cursor: "pointer"}}
          onClick={() => setExpand(!expand)}
        />
      </Modal.Body>
    </Modal>
  );
}
export default ImageModal;

ImageModal.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string
};