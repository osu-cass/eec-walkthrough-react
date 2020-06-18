import React from "react";
import Card from "./Card";
import GridCard from "./GridCard";
import PropTypes from "prop-types";
import "./ContentPage.css";

// Contains all of the cards beneath a header
class CardContainer extends React.Component {
  state = {
    loaded: false
  }

  generateCards() {
    const used1 = []; // holds ids of all the used tidbits, prevents reprint
    const used2 = []; // holds ids of all the used tidbits, prevents reprint
    const Cards = this.props.cards.map((card, i) => { // Loop through cards
      return card.cardType ? (
          <GridCard
            key={i}
            headerId={this.props.headerId}
            card={card.title}
            items={card.items}
            checkFilter={this.checkFilter}
            orderIndex={card.orderIndex}
            cardId={card.cardId}
            cardType={card.cardType}
            approved={card.approved}
            created={card.created}
            userId={card.userId}
            used1={used1}
            used2={used2}
            iconSet={this.props.iconSet}
            refresh={() => this.props.refresh()}
          />
        ) : (
          <Card
            key={i}
            headerId={this.props.headerId}
            card={card.title}
            items={card.items}
            checkFilter={this.checkFilter}
            orderIndex={card.orderIndex}
            cardId={card.cardId}
            cardType={card.cardType}
            approved={card.approved}
            created={card.created}
            userId={card.userId}
            used1={used1}
            used2={used2}
            iconSet={this.props.iconSet}
            refresh={() => this.props.refresh()}
          />
      );
    });

    return Cards;
  }

  checkFilter = (id) => {
    let i;
    for (i = 0; i < this.props.filter.length; i++) {
      if (this.props.filter[i].iconType === id) {
        return this.props.filter[i].hidden;
      }
    }
    return false;
  }

  render() {
    if (this.props.cards.length) {
      return this.generateCards();
    } else {
      return null;
    }
  }
}
export default CardContainer;

CardContainer.propTypes = {
  cards: PropTypes.any,
  headerId: PropTypes.any,
  iconSet: PropTypes.any,
  refresh: PropTypes.any,
  filter: PropTypes.any,
  headerName: PropTypes.any
};