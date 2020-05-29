import React from "react";
import Subject from "./pages/Subject";
import Home from "./pages/Home";
import ManageUsers from "./pages/ManageUsers";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
	state = {
		sidebarOpen: false,
	};

	componentDidMount() {
		//fetch all pages
		//check if route exists within pages
	}

	handleSidebar = () => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen });
	};

	render() {
		return (
			<main>
				<NavBar handleSidebar={this.handleSidebar} />
				<Sidebar
					className={this.state.sidebarOpen ? "visible" : "hidden"}
					handleSidebar={this.handleSidebar}
				/>
				<Switch>
					<Route
						path='/subjects/:pageId'
						render={(props) => (
							<Subject {...props} pageId={props.match.params.pageId} />
						)}
					/>
					<Route
						path='/industries/:pageId'
						render={(props) => (
							<Subject {...props} pageId={props.match.params.pageId} />
						)}
					/>
          <Route path='/search'>
						<Search />
					</Route>
					<Route path='/manage-users'>
						<ManageUsers />
					</Route>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='*'>
						<Home />
					</Route>
				</Switch>
			</main>
		);
	}
}

export default App;
