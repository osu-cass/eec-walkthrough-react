import React from 'react'
import Subject from './Subject'
import Home from './Home'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  state = {
	}

  render() {
    return (
			<BrowserRouter>
				<Route path="/subjects/">
						<Subject />
				</Route>
				<Route exact path="/">
						<Home />
				</Route>
			</BrowserRouter>
    )
  }
}

export default App 
