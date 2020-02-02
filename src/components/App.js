import React from 'react'
import Subject from './Subject'
import Home from './Home'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends React.Component {
	state = {
		sidebarOpen: false
	}

  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }


  render() {
    return (
			<BrowserRouter>        
				<NavBar handleSidebar={this.handleSidebar} />
        <Sidebar
          className={this.state.sidebarOpen ? 'visible' : 'hidden'}
          handleSidebar={this.handleSidebar}
        />
				
				<Route path="/subjects/:id" render={(props) => <Subject id={props.match.params.id} /> } />
				<Route exact path="/">
						<Home />
				</Route>
			</BrowserRouter>
    )
  }
}

export default App 
