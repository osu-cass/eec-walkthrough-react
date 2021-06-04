import React from "react";
import styled from "@emotion/styled/macro";
import Sanitized from "../../components/General/Sanitized";
import {PropTypes} from "prop-types";
import {CONTENT_MODE} from "../../utilities/constants";

const Annotation = styled.p`
	margin: 0;
	font-size: 0.9rem;
	font-style: italic;
`;

function ItemResource({props}) {
  const Icon = styled.i`
	margin-right: 0.5rem;
	margin-top: 0.25rem;
	font-size: ${props.iconTypeName === "circle" && "0.75rem"};
	width: 18px;
	&&[title] {
		color: ${props.iconColor};
	}
`;
  return (
    <>
      <Icon className={`fas fa-${props.iconTypeName}`} title={props.iconTypeKeyword} />
      <div>
        <a
          href={props.contentUrl}
          className={`font-weight-bold ${
            props.contentMode === CONTENT_MODE.INTERNAL ||
						props.contentMode === CONTENT_MODE.INTERNAL_DOWNLOAD
              ? "osu-link"
              : "text-primary"
          }`}
          target="_blank" rel="noreferrer"
        >
          <p className="font-weight-bold" style={{margin: 0}}>
            {props.contentLabel}
          </p>
        </a>
        <a
          href={props.contentUrl}
          className={`${
            props.contentMode === CONTENT_MODE.INTERNAL ||
						props.contentMode === CONTENT_MODE.INTERNAL_DOWNLOAD
              ? "osu-link"
              : "text-primary"
          }`}
          target="_blank" rel="noreferrer"
        >
          <small>
            <Sanitized html={props.contentText} inline={!!props.inline} />
          </small>
        </a>
        <Annotation>{props.annotation}</Annotation>
      </div>
    </>
  );
}

export default ItemResource;

ItemResource.propTypes = {
  props: PropTypes.object,
  iconTypeName: PropTypes.string,
  iconTypeKeyword: PropTypes.string,
  iconColor: PropTypes.string,
  contentText: PropTypes.string,
  inline: PropTypes.string,
  annotation: PropTypes.string,
  contentLabel: PropTypes.string,
  contentMode: PropTypes.number,
  contentUrl: PropTypes.string
};
