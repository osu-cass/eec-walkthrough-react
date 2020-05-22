import React, { Fragment } from 'react'
import { Modal, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.url} alt={props.header} className="rounded img-fluid" />
      </Modal.Body>
    </Modal>
  );
}

function Image(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Col>
      <img src={props.url} alt={props.header} className="rounded img-fluid" style={{ cursor: "pointer", maxWidth: "15em" }} onClick={() => setModalShow(true)} />

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
