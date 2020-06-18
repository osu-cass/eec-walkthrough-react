import React from "react";
import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import ReviewHeader from "./ReviewHeader";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import EditPage from "./EditPage";
import FilterBar from "./FilterBar";
import "./Header.css";

// Header that contains some number of cards
function Header(props) {

  return !props.approved && !props.mode && !props.mainPageHeader ? (
    null
  ) : (
    <div className={`d-flex ${props.sticky ? "sticky-top " : " "}
      ${props.approved ? "header-approved" : "header-review"}
      ${props.approved ? "header-approved" : "header-review"}
      header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow`}
    style={{top: "1em", zIndex: "998"}}
    >
      <div className="row mx-2">
        <h4 className="flex-grow-1 font-weight-bold">{props.title}</h4>
      </div>
      {props.mainPageHeader ? (
        <div className="row mx-2">
          {props.mode ? (
            <div className="row">
              <EditPage
                pageId={parseInt(props.pageId)}
                pageName={props.name}
                title={props.pageTitle}
                description={props.description}
                img={props.imageUrl}
                role={props.role}
                refresh={() => props.refresh()}
                handlePageEdit={props.handlePageEdit}
              />
              <ReviewPage
                name={props.name}
                title={props.pageTitle}
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
      ) : (
        <div className="row mx-2">
          {props.mode ? (
            <div className="row">
              <FilterBar
                data={props.filterData}
                headerIndex={props.filterIndex}
                handleFilter={props.handleFilter}
                resetFilter={props.resetFilter}
              />
              <EditHeader
                headerName={props.title}
                headerId={props.headerId}
                role={props.role}
                refresh={() => props.fetchData()}
              />
              <ReviewHeader
                title={props.title}
                headerId={props.headerId}
                refresh={() => props.refresh()}
                approved={props.approved}
                userId={props.userId}
                created={props.created}
              />
            </div>
          ) : (
            <FilterBar
              data={props.filterData}
              headerIndex={props.filterIndex}
              handleFilter={props.handleFilter}
              resetFilter={props.resetFilter}
            />
          )}
        </div>
      )}
    </div>
  );

}
export default Header;

Header.propTypes = {
  name: PropTypes.string,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  headerId: PropTypes.number,
  mainPageHeader: PropTypes.any,
  approved: PropTypes.any,
  sticky: PropTypes.any,
  title: PropTypes.string,
  refresh: PropTypes.any,
  userId: PropTypes.number,
  pageId: PropTypes.number,
  created: PropTypes.any,
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  handlePageEdit: PropTypes.any,
  filterData: PropTypes.any,
  filterIndex: PropTypes.number,
  handleFilter: PropTypes.func,
  resetFilter: PropTypes.func,
  fetchData: PropTypes.any
};
