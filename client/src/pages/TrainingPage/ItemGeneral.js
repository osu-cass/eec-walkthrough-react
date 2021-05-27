import React from "react";
import styled from "@emotion/styled/macro";
import Sanitized from "../../components/General/Sanitized";
import {PropTypes} from "prop-types";

const Annotation = styled.p`
	margin: 0;
	font-size: 0.9rem;
	font-style: italic;
`;

const Content = styled.p`
		margin: 0;
	`;

function ItemGeneral({props}) {
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
        <Content>
          <Sanitized html={props.contentText} inline={!!props.inline} />
        </Content>
        <Annotation>{props.annotation}</Annotation>
      </div>
    </>
  );
}

export default ItemGeneral;

ItemGeneral.propTypes = {
  props: PropTypes.object,
  iconTypeName: PropTypes.string,
  iconTypeKeyword: PropTypes.string,
  iconColor: PropTypes.string,
  contentText: PropTypes.string,
  inline: PropTypes.string,
  annotation: PropTypes.string
};
