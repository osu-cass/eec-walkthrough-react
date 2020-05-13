import React from 'react'
import Subject from './pages/Subject'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

class App extends React.Component {
	state = {
		sidebarOpen: false
	}

	handleSidebar = () => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen })
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
					<Route path="/subjects/:id"
						render={(props) => <Subject {...props} id={props.match.params.id} />}
					/>
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
