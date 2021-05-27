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

function ItemText({props}) {

  return (
    <div>
      <Content>
        <Sanitized html={props.contentText} inline={!!props.inline} />
      </Content>
      <Annotation>{props.annotation}</Annotation>
    </div>

  );
}

export default ItemText;

ItemText.propTypes = {
  props: PropTypes.object,
  contentText: PropTypes.string,
  inline: PropTypes.string,
  annotation: PropTypes.string
};
