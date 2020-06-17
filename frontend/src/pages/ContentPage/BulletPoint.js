import React, {Fragment} from "react";
import Image from "./Image";
import "./BulletPoint.css";
import PropTypes from "prop-types";

function styleText(icon) {
  if (icon === "check-square") { return "font-weight-bold"; }
  if (icon === "flag") { return "font-italic mt-4"; }	// break between every flag icon
  if (icon === "opportunity-desc") { return "opportunity-desc"; }
}

function isBold(bold) {
  if (bold) { return "font-weight-bold"; }
}


function filter(check) {
  if (check) { return "hide"; } else { return "active"; }
}

function getContentType(text, label, url) {
  if (text !== "" && label === "" && url === "") { return 1; }
  if (text === "" && label !== "" && url !== "") { return 2; }
  if (text !== "" && label !== "" && url !== "") { return 3; }
}

function BulletPoint (props) {
  return (
    <div key={props.id} className={`mb-2 ${filter(props.hide)}`}>
      {getContentType(props.text, props.label, props.url) === 1 ?
        <Fragment>
          <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)} `}></i>
          <span className={styleText(props.icon) || isBold(props.bold)}>
            {props.text}
          </span>
        </Fragment>
        : ""}
      {getContentType(props.text, props.label, props.url) === 2 ?
        <Fragment>
          <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)} `}></i>
          <span className={styleText(props.icon) || isBold(props.bold)}>
            {props.text}
          </span>
          {props.label}
          <Image url={props.url} title={props.label} thumbnail={false} header={false}/>
        </Fragment>
        : ""}
      {getContentType(props.text, props.label, props.url) === 3 ?
        <Fragment>
          <div className=''>
            <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)}`} /><a href={props.url} className="text-primary"> {props.label} </a> <br></br>
            {props.text}
          </div>
        </Fragment>
        : ""}
      <div className='pl-5 mt-2'>{props.children}</div>
    </div >
  );
}
export default BulletPoint;

BulletPoint.propTypes = {
  id: PropTypes.any,
  hide: PropTypes.any,
  text: PropTypes.any,
  label: PropTypes.any,
  url: PropTypes.any,
  icon: PropTypes.any,
  bold: PropTypes.any,
  children: PropTypes.any
};