import React from "react";
import Card from "./Card";
import SubjectCard from "./SubjectCard";
import "./Subject.css";

class CardContainer extends React.Component {
  state = {
    loaded: false
  }

  generateCards() {
    const used = []; // holds ids of all the used tidbits, prevents reprint
    const Cards = this.props.cards.map((card, i) => { // Loop through cards
      return (
        <Card
          key={i}
          headerId={this.props.headerId}
          card={card.title}
          items={card.items}
          checkFilter={this.checkFilter}
          orderIndex={card.orderIndex}
          cardId={card.cardId}
          used={used}
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
    return this.props.cards.length ? ( // Render content when data loaded from backend
      this.generateCards()
    ) : (
      <SubjectCard subjectName={`No Cards under ${this.props.headerName}`} />
    );
  }
}

export default CardContainer;
