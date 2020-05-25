import React from 'react'
import Card from './Card'
import SubjectCard from './SubjectCard'
import './Subject.css'

class CardContainer extends React.Component {
    state = {
        cards: [],
        loaded: false
    }

    async componentDidMount() {
        const response = await this.setState({ cards: this.props.cards })
    }

    generateCards() {
        let used = []; //holds ids of all the used tidbits, prevents reprint
        let Cards = this.state.cards.map((card, i) => {				//Loop through cards
            return (
                <Card
                    key={i}
                    color="white"
                    id={this.props.id}
                    card={card.title}
                    items={card.items}
                    checkFilter={this.checkFilter}
                    cardId={card.cardId}
                    used={used}
                />
            );
        });

        return Cards
    }

    checkFilter = (id) => {
        var i;
        for (i = 0; i < this.props.filter.length; i++) {
            if (this.props.filter[i].iconType === id) {
                return this.props.filter[i].hidden;
            }
        }
        return false;
    }

    render() {
        return this.state.cards.length ? ( //Render content when data loaded from backend
            <div className="tidbitContainer">
                {this.generateCards()}
            </div>
        ) : <SubjectCard subjectName='None' />;
    }
}

export default CardContainer
