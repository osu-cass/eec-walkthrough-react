import React, {useEffect} from "react";
import {getAgreement, acceptAgreement} from "../../utilities/agreementMode";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";

// Modal that allows a user to accept an agreement
function Agreement(props) {

  // get the current agreement status
  useEffect(() => {
    if (getAgreement(props.agreementName)) {
      // we have already accepted the terms
      props.closeModal();
      props.acceptFunction();
    }
  }, [props.agreementName, props.terms]);

  return (
    <div className="text-center mx-2 my-auto">

      <Modal show={props.show} onHide={() => props.closeModal()} dialogClassName="modal-width">

        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{props.agreementTitle}</h5>
          <Button variant="none" onClick={() => props.closeModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <p>
            {props.terms}
          </p>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            className="mr-auto"
            variant="success"
            onClick={() => {props.closeModal(); acceptAgreement(props.agreementName); props.acceptFunction()}}
          >
            Accept Terms
          </Button>
          <Button variant="secondary" onClick={() => props.closeModal()}>Cancel</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );

}
export default Agreement;

Agreement.propTypes = {
  agreementTitle: PropTypes.string,
  agreementName: PropTypes.string,
  terms: PropTypes.string,
  acceptFunction: PropTypes.func,
  show: PropTypes.bool,
  closeModal: PropTypes.func
};