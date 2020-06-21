import React from "react";
import Image from "./Image";
import PropTypes from "prop-types";

// The contents of a thumbnail gallery card
function ThumbnailGallery(props) {

  return (
    <div className="row text-center text-lg-left">
      {props.imageItems.map((item) =>
        <div className="col-lg-3 col-md-4 col-6 my-auto" align="center"
          key={item.itemId + "a"}
        >
          <div className="d-block mb-4 h-100" key={item.itemId + "b"}>
            <Image
              url={item.contentUrl}
              title={item.contentLabel}
              thumbnail={true}
              header={false}
              key={item.itemId + "c"}
            />
          </div>
        </div>
      )}
    </div>
  );

}
export default ThumbnailGallery;

ThumbnailGallery.propTypes = {
  imageItems: PropTypes.array
};
