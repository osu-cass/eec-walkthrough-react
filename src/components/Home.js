import React from 'react'
import NavBar from './NavBar'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import Card from './Card'
import CardData from './CardData'
import FilterBar from './FilterBar'
import Sidebar from './Sidebar'
import './Subject.css'

class Home extends React.Component {
	state = {
		sidebarOpen: false
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
				
				<h1>This is the Home Page (Work in Progress), navigate using the Sidebar</h1>

			</div>
    )
  }
}

export default Home 
