import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import EditPage from "./EditPage";
import "./PageDescription.css";

// Header and card that describes the page
function PageDescription(props) {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (props.page.approved && props.page.tempPageId && props.mode) {
      setName(props.page.tempName);
      setTitle(props.page.tempTitle);
      setDescription(props.page.tempDescription);
      setImageUrl(props.page.tempImageUrl);
    } else {
      setName(props.page.name);
      setTitle(props.page.title);
      setDescription(props.page.description);
      setImageUrl(props.page.imageUrl);
    }
  }, [props.page, props.mode]);

  return (
    <div>
      <div className={`d-flex header-bar justify-content-between
        ${props.page.approved && (!props.page.tempPageId || !props.mode) ? (
          "page-approved" 
        ) : (
          "page-review"
        )}
        my-3 p-3 text-dark-50 rounded shadow`}
        style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            {name}
          </h4>
          <h4 className="ml-4">{props.page.approved ? null : "<This page is unpublished>"}</h4>
        </div>

        <div className="row mx-2">
          <div className="row">
            <EditPage
              page={props.page}
              role={props.role}
              refresh={() => props.refresh()}
              handlePageEdit={props.handlePageEdit}
            />
            <ReviewPage
              page={props.page}
              refresh={() => props.refresh()}
            />
            <ChangeMode role={props.role}
              mode={props.mode}
              onPageMode={e => props.onPageMode(e)}
            />
          </div>
        </div>
      </div>

      <div className={`${props.page.approved && (!props.page.tempPageId || !props.mode) ? "page-approved" : "page-review"}
        my-3 p-3 card rounded shadow-sm`}
      >
        <div>
            <div className="row">
              <div className="col-8">
                <h5 className='font-weight-bold'>{title}</h5>
                <p>{description}</p>
              </div>
              <div className="col-4 text-center">
                <Image url={imageUrl}
                  title={name}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>
        </div>

      </div>
    </div>
  );

}
export default PageDescription;

PageDescription.propTypes = {
  page: PropTypes.object,
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  handlePageEdit: PropTypes.func,
  refresh: PropTypes.func
};