import React from 'react'
import NavBar from './NavBar'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import CardContainer from './CardContainer'
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
		fetch(`/subjects/${this.props.id}`)
				.then(res => res.json())
				.then(subjectInfo => this.setState({subjectInfo}));
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
    return this.state.subjectInfo.length ? ( //Render content when data loaded from backend
      <div>
        <NavBar handleSidebar={this.handleSidebar} />
        <Sidebar
          className={this.state.sidebarOpen ? 'visible' : 'hidden'}
          handleSidebar={this.handleSidebar}
        />
				
				{/*Debugging Purposes*/}
				<button className='btn btn-primary' onClick={() => console.log(this.state.cards)}>State</button>

        <div className="container">
          <SubjectCard subjectName={this.state.subjectInfo[0].SubjectName}>
            <FilterBar
              data={this.state.cards}
              handleFilter={this.handleFilter}
            />
          </SubjectCard>

          <SubjectIntro
            header={this.state.subjectInfo[0].Summary}
            description={this.state.subjectInfo[0].Description}
            img={this.state.subjectInfo[0].SubjectImage}
          />

					<CardContainer id={this.props.id} />
          <SubjectCard subject="Opportunities to Consider" />
        </div>
      </div>
	) : <div> Loading </div> ;	
	}
}

export default Subject
