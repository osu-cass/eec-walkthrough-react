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
        alt={props.title}
        className={`expandable-image rounded img-fluid ${props.thumbnail ? ("img-thumbnail"):("")} ${props.header ? ("header"):("")}`}
        onClick={() => setModalShow(true)}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        url={props.url}
        header={props.title}
        onHide={() => setModalShow(false)}
      />
    </Col>
  );
}
export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.bool,
  header: PropTypes.bool
};
