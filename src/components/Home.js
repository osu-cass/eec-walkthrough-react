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
				<div className="container">
					<h1>Home Page, will be filled out later</h1>	
					<h3>Currently</h3>
					<ul>
						<li>Sidebar subjects reads from database</li>
							<ul>
								<li>Subject name, link based on subject id</li>
							</ul>
						<li>Subjects reads from database</li>
							<ul>
								<li>Subject name, summary, description, image path</li>
							</ul>
						<li>Filter buttons work</li>
							<ul>
								<li>Filter icons generate based on number of tidbits and icon used for that tidbit</li>
								<li>Reset button in progress</li>
							</ul>
						<li>Working on reading tidbits from database</li>
					</ul>
				</div>
			</div>
    )
  }
}

export default Home 
