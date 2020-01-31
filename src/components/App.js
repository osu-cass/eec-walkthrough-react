import React from 'react'
import Subject from './Subject'
import Home from './Home'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
			<BrowserRouter>
				<Route path="/subjects/:id" render={(props) => <Subject id={props.match.params.id} /> } />
				<Route exact path="/">
						<Home />
				</Route>
			</BrowserRouter>
    )
  }
}

export default App 
