import React from 'react'
import { Modal, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Image.css';

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
          style={{ cursor: "pointer" }}
          onClick={() => setExpand(!expand)}
        />
      </Modal.Body>
    </Modal>
  );
}

function Image(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Col>
      <img
        src={props.url}
        alt={props.header}
        className="rounded img-fluid"
        style={{ cursor: "pointer", maxWidth: "15em" }}
        onClick={() => setModalShow(true)}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        url={props.url}
        header={props.header}
        onHide={() => setModalShow(false)}
      />
    </Col>
  )
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string
};

export default Image
