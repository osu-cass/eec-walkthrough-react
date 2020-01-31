import React from 'react'
import NavBar from './NavBar'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import Card from './Card'
import CardData from './CardData'
import FilterBar from './FilterBar'
import Sidebar from './Sidebar'
import './Subject.css'

class CardContainer extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    //For each card, take its category and assign if its hidden or visible
    let cards = CardData.map((cat, i) => {
      var data = {
        category: cat.category,
        icon: cat.icon,
        id: cat.id,
        hidden: false,
      }
      return data
    })
    this.setState({ cards: cards })
		
		fetch(`/cards/${this.props.id}`)
				.then(res => res.json())
				.then(cards => );
  }

  handleFilter = id => {
    let cardList = [...this.state.cards] //Create copy of object, update object, set state with new copy
    var i
    for (i = 0; i < cardList.length; i++) {
      if (cardList[i].id === id) {
        cardList[i].hidden = !cardList[i].hidden //Update object and change hidden to opposite
      }
    }
    this.setState({ cards: cardList })
  }

  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  render() {
    return this.state.cards.length ? ( //Render content when data loaded from backend
      <div>
				<button className='btn btn-primary' onClick={() => console.log(this.state.cards)}>Debug</button>

            {/* For each Category/Card */}
          {CardData.map((cat, i) => {
            return (
              <div
                id={cat.id}
                className={
                  this.state.cards.length > 0
                    ? this.state.cards[i].hidden
                      ? 'hide'
                      : 'active'
                    : ''
                }
              >
                <Card
                  category={cat.category}
                  icon={cat.icon}
                  description={cat.description}
                />
              </div>
            )
          })}

      </div>
	) : <div> Loading Cards </div> ;	
	}
}

export default CardContainer 
