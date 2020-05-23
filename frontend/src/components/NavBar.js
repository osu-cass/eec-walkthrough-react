import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Login from './Login'
import Search from './Search'

class NavBar extends React.Component {
  render() {
    return (
      <div className="navigation-bar">
        <nav className="navbar navbar-dark bg-dark">
          <h3 className="text-white">
            <a
              className="text-info mr-2"
              href="#"
              onClick={this.props.handleSidebar}
            >
              <i className="fas fa-bars"></i>
            </a>
            EEC Walkthrough
          </h3>

          <div className="d-flex">
            <Search />
            <Login />
          </div>
        </nav>
        {/*
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as="h3" className="text-white">
            <a
              className="text-info mr-2"
              href="#"
              onClick={this.props.handleSidebar}
            >
              <i className="fas fa-bars"></i>
            </a>
            EEC Walkthrough
          </Navbar.Brand>

          <div className="d-flex">
            <Search />
            <Login />
          </div>
        </Navbar>
         */}
      </div>

    )
  }
}

export default NavBar
