import React from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import "./Image.css";

function Image(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Col>
      <img
        src={props.url}
        alt={props.header}
        className={`rounded img-fluid ${props.thumbnail ? ("img-thumbnail"):("")}`}
        style={{cursor: "pointer", maxWidth: "15em"}}
        onClick={() => setModalShow(true)}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        url={props.url}
        header={props.header}
        onHide={() => setModalShow(false)}
      />
    </Col>
  );
}
export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired,
  header: PropTypes.string,
  thumbnail: PropTypes.bool
};
