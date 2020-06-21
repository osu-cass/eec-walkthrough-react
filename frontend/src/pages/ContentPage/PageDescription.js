import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import EditPage from "./EditPage";
import "./PageDescription.css";

// Header and card that describes the page
function PageDescription(props) {

  return (
    <div>
      <div className={`d-flex ${props.sticky ? "sticky-top " : " "}
        ${props.approved ? "header-approved" : "header-review"}
        ${props.approved ? "header-approved" : "header-review"}
        header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow`}
        style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">{props.name}</h4>
        </div>

        <div className="row mx-2">
          {props.mode ? (
            <div className="row">
              <EditPage
                pageId={parseInt(props.pageId)}
                pageName={props.name}
                title={props.title}
                description={props.description}
                img={props.imageUrl}
                role={props.role}
                refresh={() => props.refresh()}
                handlePageEdit={props.handlePageEdit}
              />
              <ReviewPage
                name={props.name}
                title={props.title}
                description={props.description}
                imageUrl={props.imageUrl}
                pageId={props.pageId}
                headerId={props.headerId}
                refresh={() => props.refresh()}
                approved={props.approved}
                userId={props.userId}
                created={props.created}
              />
              <ChangeMode role={props.role}
                mode={props.mode}
                onPageMode={e => props.onPageMode(e)}
              />
            </div>
          ) : (
            <div className="row">
              <ChangeMode role={props.role}
                mode={props.mode}
                onPageMode={e => props.onPageMode(e)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`${props.approved ? "card-approved" : "card-review"} my-3 p-3 card rounded shadow-sm`}>
        <div className="row">
          <div className="col-8">
            <h5 className='font-weight-bold'>{props.title}</h5>
            <p>{props.description}</p>
          </div>
          <div className="col-4 text-center">
            <Image url={props.imageUrl}
              title={props.name}
              thumbnail={false}
              header={true}
            />
          </div>
        </div>
      </div>

    </div>
  );

}
export default PageDescription;

PageDescription.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  approved: PropTypes.number,
  imageUrl: PropTypes.string,
  refresh: PropTypes.func,
  pageId: PropTypes.number,
  created: PropTypes.any,
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  handlePageEdit: PropTypes.func
};