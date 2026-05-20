import React, {Fragment, useState} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import ImageModal from "./ImageModal";
import "./Image.css";

// Displays various kinds of images
function Image(props) {
  const [modalShow, setModalShow] = useState(false);
  const [title] = useState(props.title.replace(/<\/?[^>]+(>|$)/g, ""));
  const altAttr = props.altText && props.altText.trim() ? props.altText.trim() : title;

  console.log("altAttr being set by Image", altAttr);
  
  if (props.thumbnail) {
    return (
      <Col className="px-0">
        <img
          src={props.url}
          alt={altAttr}
          title={title}
          onError={(e) => e.target.src = "/missing.png"}
          className="expandable-image rounded img-fluid img-thumbnail"
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    );
  } else if (props.header) {
    return (
      <Col className="px-0">
        <img
          src={props.url}
          alt={altAttr}
          onError={(e) => e.target.src = "/missing.png"}
          className="expandable-image header rounded img-fluid img-normal"
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    );
  } else {
    return (
      <Fragment>
        <img
          src={props.url}
          alt={altAttr}
          onError={(e) => e.target.src = "/missing.png"}
          className="expandable-image rounded img-fluid"
          style={{cursor: "pointer", maxWidth: "15em"}}
          onClick={() => setModalShow(true)}
        />
        <ImageModal
          show={modalShow}
          url={props.url}
          header={title}
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
  altText: PropTypes.string,
  thumbnail: PropTypes.bool,
  header: PropTypes.bool
};
