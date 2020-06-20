import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import "./ContentPage.css";

// Contains all of the cards inside a header
function CardContainer(props) {

  function generateCards() {
    const used1 = []; // holds ids of all the used tidbits, prevents reprint
    const used2 = []; // holds ids of all the used tidbits, prevents reprint
    const Cards = props.cards.map((card, i) => { // Loop through cards
      return (
        <Card
          key={i}
          headerId={props.headerId}
          card={card}
          used1={used1}
          used2={used2}
          refresh={() => props.refresh()}
          mode={props.mode}
          iconSet={props.iconSet}
        />
      );
    });

    return Cards;
  }

  return props.cards.length && (props.approved || props.mode) ? (
    generateCards()
  ) : (
    null
  );

}
export default CardContainer;

CardContainer.propTypes = {
  cards: PropTypes.any,
  headerId: PropTypes.any,
  refresh: PropTypes.any,
  headerName: PropTypes.any,
  mode: PropTypes.number,
  approved: PropTypes.number,
  iconSet: PropTypes.any
};