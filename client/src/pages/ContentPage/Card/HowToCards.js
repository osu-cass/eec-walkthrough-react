import React, {Fragment, useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

// A set of automated cards that appear on the "how to use" page
function HowToCards(props) {

  const [normalIcons, setNormalIcons] = useState([]);
  const [resourceIcons, setResourceIcons] = useState([]);

  // filter out unused icons
  useEffect (() => {
    const iconSetNormal = [];
    const iconSetResource = [];

    for (let i = 0; i < props.icons.length; i++) {
      if (props.icons[i].groupIndex === 3) {
        iconSetResource.push(props.icons[i]);
      } else if (props.icons[i].groupIndex) {
        iconSetNormal.push(props.icons[i]);
      }
    }

    setNormalIcons(iconSetNormal);
    setResourceIcons(iconSetResource);
    console.log(props.categories);
  }, []);

  // Checks if the current card should be displayed
  return (
    <Fragment>

      <Card className="my-2">
        <Card.Header>
          <h5 className="font-weight-bold">
            This guide is broken down into sections
          </h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >

          {props.categories.map((category) =>
            <div key={category.categoryId}>
              <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
                <li>
                  <NavLink to={`/page-list/${category.categoryId}`}><b>{category.pluralName}: </b></NavLink>
                  <span className="font-weight-normal">{category.description}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Tidbits card */}
      <Card className="my-2">
        <Card.Header>
          <h5 className="font-weight-bold">
          Each section includes a number of useful pertinent &quot;tidbits&quot; identified by a preceding icon
          </h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">These include</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              {normalIcons.map((icon) =>
                <li className="my-2" key={icon.iconType}>
                  <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}} />
                  <span className="font-weight-normal">{icon.typeKeyword}</span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <span className="font-italic allow-newlines">Note: &quot;tidbit&quot; types can
            be toggled between &quot;hidden&quot; and &quot;unhidden&quot; by clicking the icon in the
            header bars of each section. A list of opportunities only can be toggled
            to, with the ability to expand information on any particular opportunity.
            Registered users can save preferred view configurations.
            </span>
          </div>
        </div>
      </Card>

      <Card className="my-2">
        <Card.Header>
          <h5 className="font-weight-bold">
          Each section also references in depth learning resources that offer deeper information about the topic
          </h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">
            A preceding icon identifies the type of learning resource offered
          </div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              {resourceIcons.map((icon) =>
                <li className="my-2" key={icon.iconType}>
                  <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}} />
                  <span className="font-weight-normal">{icon.typeKeyword}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="font-weight-bold mb-3">
            A trailing icon identifies the learning resource as internal or external
          </div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              <li className="my-2">
                <i className={`fas fa-fw fa-info mr-2`} />
                <span className="font-weight-normal">In Depth OSU EEC Resource</span>
              </li>
              <li className="my-2">
                <i className={`fas fa-fw fa-link mr-2`} />
                <span className="font-weight-normal">Link to external resource</span>
              </li>
            </ul>
          </div>
          <div className="font-weight-bold mb-3">
            A second trailing icon will indicate when the learning resource is a download
          </div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              <li className="my-2">
                <i className={`fas fa-fw fa-download mr-2`} />
                <span className="font-weight-normal">Download of learning resource</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

    </Fragment>
  );
}
export default HowToCards;

HowToCards.propTypes = {
  categories: PropTypes.array,
  icons: PropTypes.array
};
