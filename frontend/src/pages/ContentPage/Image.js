import React from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import "./Image.css";

function Image(props) {
  const [modalShow, setModalShow] = React.useState(false);

  if (props.thumbnail) {
    return (
      <Col>
        <img
          src={props.url}
          alt={props.title}
          title={props.title}
          className="expandable-image rounded img-fluid img-thumbnail"
          style={{cursor: "pointer", maxheight: "23em"}}
          onClick={() => setModalShow(true)}
        />
        <MyVerticallyCenteredModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    )
  } else if (props.header) {
    return (
      <Col>
        <img
          src={props.url}
          alt={props.title}
          className="expandable-image header rounded img-fluid"
          style={{cursor: "pointer", maxHeight: "23em"}}
          onClick={() => setModalShow(true)}
        />
        <MyVerticallyCenteredModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    )
  } else {
    return (
      <Col>
        <img
          src={props.url}
          alt={props.title}
          className="expandable-image rounded img-fluid"
          style={{cursor: "pointer", maxWidth: "15em"}}
          onClick={() => setModalShow(true)}
        />
        <MyVerticallyCenteredModal
          show={modalShow}
          url={props.url}
          header={props.title}
          onHide={() => setModalShow(false)}
        />
      </Col>
    )
  }
}
export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.bool,
  header: PropTypes.bool
};
