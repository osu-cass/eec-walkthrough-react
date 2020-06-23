import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import EditPage from "./EditPage";
import "./PageDescription.css";

// Header and card that describes the page
function PageDescription(props) {

  return props.mode ? (

    <div>
      <div className={`d-flex header-bar justify-content-between
        ${props.page.approved && !props.page.tempPageId ? "page-approved" : "page-review"}
        my-3 p-3 text-dark-50 rounded shadow`}
        style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            {props.page.tempPageId ? (
              props.page.tempName
            ) : (
              props.page.name
            )}
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

      <div className={`${props.page.approved && !props.page.tempPageId ? "page-approved" : "page-review"}
        my-3 p-3 card rounded shadow-sm`}
      >
        <div>
          {props.page.tempPageId ? (

            <div className="row">
              <div className="col-8">
                <h5 className='font-weight-bold'>{props.page.tempTitle}</h5>
                <p>{props.page.tempDescription}</p>
              </div>
              <div className="col-4 text-center">
                <Image url={props.page.tempImageUrl}
                  title={props.page.tempName}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>

          ) : (

            <div className="row">
              <div className="col-8">
                <h5 className='font-weight-bold'>{props.page.title}</h5>
                <p>{props.page.description}</p>
              </div>
              <div className="col-4 text-center">
                <Image url={props.page.imageUrl}
                  title={props.page.name}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>

          )}
        </div>
      </div>
    </div>

  ) : (

    <div>
      <div className={`d-flex header-bar
      ${props.page.approved ? "page-approved" : "page-review"}
      justify-content-between my-3 p-3 text-dark-50 rounded shadow`}
        style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2 align-middle">
          <h4 className="flex-grow-1 font-weight-bold">{props.page.name}</h4>
          <h4 className="ml-4">{props.page.approved ? null : "<This page is unpublished>"}</h4>
        </div>

        <div className="row mx-2">
          {props.mode ? (
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

      <div className={`${props.page.approved ? "page-approved" : "page-review"}
        my-3 p-3 card rounded shadow-sm`}
      >
        <div className="row">
          <div className="col-8">
            <h5 className='font-weight-bold'>{props.page.title}</h5>
            <p>{props.page.description}</p>
          </div>
          <div className="col-4 text-center">
            <Image url={props.page.imageUrl}
              title={props.page.name}
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
  page: PropTypes.object,
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  handlePageEdit: PropTypes.func,
  refresh: PropTypes.func
};