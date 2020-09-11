import React, {Fragment, useState} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import ImageModal from "./ImageModal";
import "./Image.css";

// Displays various kinds of images
function Image(props) {
  const [modalShow, setModalShow] = useState(false);

  if (props.thumbnail) {
    return (
      <Col>
        <img
          src={props.url}
          alt={props.title}
          title={props.title}
          className="expandable-image rounded img-fluid img-thumbnail"
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    );
  } else if (props.header) {
    return (
      <Col>
        <img
          src={props.url}
          alt={props.title}
          className="expandable-image header rounded img-fluid img-normal"
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    );
  } else {
    return (
      <Fragment>
        <img
          src={props.url}
          alt={props.title}
          className="expandable-image rounded img-fluid"
          style={{cursor: "pointer", maxWidth: "15em"}}
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Fragment>
    );
  }
}
export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.bool,
  header: PropTypes.bool
};
