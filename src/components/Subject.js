import React from 'react'
import NavBar from './NavBar'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import Card from './Card'
import CardData from './CardData'
import FilterBar from './FilterBar'
import Sidebar from './Sidebar'
import './Subject.css'

class Subject extends React.Component {
  state = {
    sidebarOpen: false,
    cards: [],
		subjectInfo: [],
		loaded: false
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
    return (
      <div>
        <NavBar handleSidebar={this.handleSidebar} />
        <Sidebar
          className={this.state.sidebarOpen ? 'visible' : 'hidden'}
          handleSidebar={this.handleSidebar}
        />

        <div className="container">
          <SubjectCard subjectName={'bye'}>
            <FilterBar
              data={this.state.cards}
              handleFilter={this.handleFilter}
            />
          </SubjectCard>

          <SubjectIntro
            header="Compressed air is a common utility found in most industrial facilities"
            description="Compressed air has been a key industrial utility since the 1800's. It can drive pneumatic cylinders, air motors, diaprham pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications."
            img="../aircompressor.png"
          />

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

          <SubjectCard subject="Opportunities to Consider" />
        </div>
      </div>
    );	
	}
}

export default Subject
