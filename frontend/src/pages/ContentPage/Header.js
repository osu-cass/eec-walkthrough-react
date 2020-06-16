import React from "react";
import PropTypes from "prop-types";
import ReviewHeader from "./ReviewHeader";
import ReviewPage from "./ReviewPage";
import "./Header.css";

// Header that contains some number of cards
function Header(props) {

  function hideCard() { }

  return (
    <div className={`d-flex ${props.sticky ? "sticky-top " : " "} ${props.approved ? "header-approved" : "header-review"}
      header-bar justify-content-between p-3 my-3 text-dark-50 rounded shadow`}
    style={{top: "1em", zIndex: "998"}}
    >
      <h4 className="flex-grow-1 font-weight-bold">{props.title}</h4>
      {props.mainPageHeader && !props.approved ? (
        <h4 className="flex-grow-1">External users cannot view or search for this page</h4>
      ) : (
        null
      )}
      <span
        className="mr-5 mt-1 icons"
        onClick={event => hideCard(event.target.getAttribute("value"))}
      >
        {props.children}
      </span>
      {props.mainPageHeader ? (
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
      ) : (
        <ReviewHeader
          title={props.title}
          headerId={props.headerId}
          refresh={() => props.refresh()}
          approved={props.approved}
          userId={props.userId}
          created={props.created}
        />
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
  children: PropTypes.any,
  refresh: PropTypes.any,
  userId: PropTypes.number,
  pageId: PropTypes.number,
  created: PropTypes.any
};
