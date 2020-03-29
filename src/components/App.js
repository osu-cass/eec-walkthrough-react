import React from 'react'
import Subject from './Subject'
import Home from './Home'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

class App extends React.Component {
	state = {
		sidebarOpen: false
	}

  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }
	
	componentDidMount() {
		fetch(`/tidbits/types`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(tidbitTypes => this.setState({ tidbitTypes }))
			.then(() => this.setState({ loaded: true }));
	}

  render() {
    return (
			<main>
				<NavBar handleSidebar={this.handleSidebar} />
        <Sidebar
          className={this.state.sidebarOpen ? 'visible' : 'hidden'}
          handleSidebar={this.handleSidebar}
        />
				<Switch>
					{this.state.loaded && 
					<Route path="/subjects/:id" 
						render={(props) => <Subject {...props} tidbitTypes={this.state.tidbitTypes} id={props.match.params.id} /> } 
					/>
					}
					<Route exact path="/">
							<Home />
					</Route>
					<Route path="*">
							<Home />
					</Route>
				</Switch>
			</main>
    )
  }
}

export default App 
