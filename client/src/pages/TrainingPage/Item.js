import React from "react";
import styled from "@emotion/styled/macro";
import {ITEM_TYPE, ROLE} from "../../utilities/constants";
import ItemGeneral from "./ItemGeneral";
import ItemGraphic from "./ItemGraphic";
import ItemResource from "./ItemResource";
import ItemText from "./ItemText";
import {PropTypes} from "prop-types";

function Item(props) {
  const Container = styled.div`
		margin-bottom: 0.3rem;
		display: flex;
		align-items: flex-start;

		padding-left: ${props.indentation === 1 && "2rem"};
		padding-left: ${props.indentation === 2 && "4rem"};
	`;

  return (
    <>
      {
        props.internal && props.role !== ROLE.ADMIN
          ? null
          :  (<Container>
            {props.iconGroupIndex === ITEM_TYPE.GENERAL &&
					props.iconTypeName !== "font" && <ItemGeneral props={props} />}
            {props.iconGroupIndex === ITEM_TYPE.RESOURCE && (
              <ItemResource props={props} />
            )}
            {props.iconGroupIndex === ITEM_TYPE.GENERAL &&
					props.iconTypeName === "font" && <ItemText props={props} />}
            {props.iconGroupIndex === ITEM_TYPE.GRAPHIC && (
              <ItemGraphic props={props} />
            )}
          </Container>)
      }
    </>
  );
}

export default Item;

Item.propTypes = {
  indentation: PropTypes.number,
  iconGroupIndex: PropTypes.number,
  iconTypeName: PropTypes.string,
  internal: PropTypes.number,
  role: PropTypes.number
};
