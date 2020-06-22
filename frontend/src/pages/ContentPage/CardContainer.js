import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import "./ContentPage.css";

// Contains all of the cards inside a header
function CardContainer(props) {

  function generateCards() {
    const Cards = props.cards.map((card, i) => {
      return (
        <Card
          key={i}
          headerId={props.headerId}
          unfilteredCard={props.unfilteredCards[i]}
          card={card}
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
  unfilteredCards: PropTypes.array,
  cards: PropTypes.any,
  headerId: PropTypes.any,
  refresh: PropTypes.func,
  headerName: PropTypes.any,
  mode: PropTypes.number,
  approved: PropTypes.number,
  iconSet: PropTypes.any
};