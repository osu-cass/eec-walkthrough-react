import React, { Fragment } from 'react'
import { Modal, Button } from 'react-bootstrap';
import BulletPoint from './BulletPoint'

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
        <img src={props.URL} alt={props.header} className="rounded img-fluid" />
      </Modal.Body>
    </Modal>
  );
}

function Image(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Fragment>
      <BulletPoint icon="chart-area" text={props.caption} bold={true}>
          <Button variant="link" style={{ padding: 0, border: 0 }} onClick={() => setModalShow(true)}>
            <img src={props.URL} alt={props.header} className="rounded img-fluid" style={{ maxWidth: "30em" }} />
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            URL={props.URL}
            header={props.header}
            onHide={() => setModalShow(false)}
          />
      </BulletPoint>
    </Fragment>
  )
}

export default Image
