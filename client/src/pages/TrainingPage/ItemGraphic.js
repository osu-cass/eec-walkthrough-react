import React from "react";
import styled from "@emotion/styled/macro";
import Sanitized from "../../components/General/Sanitized";
import {PropTypes} from "prop-types";
import Image from "../../components/General/Image";

const Annotation = styled.p`
	margin: 0;
	font-size: 0.9rem;
	font-style: italic;
`;

const Content = styled.p`
margin: 0;
`;

function ItemGraphic({props}) {

  const Icon = styled.i`
	margin-right: 0.5rem;
	margin-top: 0.25rem;
	font-size: ${props.iconTypeName === "circle" && "0.75rem"};
	width: 18px;
	&&[title] {
		color: ${props.iconColor};
	}
`;

  function largeImage() {
    if (props.iconTypeName === "picture-o") {
      return true;
    }
    return false;
  }

  return (
    <>
     	<Icon className={`fas fa-${props.iconTypeName}`} title={props.iconTypeKeyword} />
      <div>
        <Content>
          <div className="pb-1">
            <span className="icon-item-text">{props.contentText}</span>
            <Sanitized html={props.contentLabel} inline={!!props.inline} />
          </div>
          <Image
            url={props.contentUrl}
            title={props.contentLabel}
            thumbnail={false}
            header={largeImage()}
          />
        </Content>
        <Annotation>{props.annotation}</Annotation>
      </div>
    </>
  );
}

export default ItemGraphic;

ItemGraphic.propTypes = {
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
