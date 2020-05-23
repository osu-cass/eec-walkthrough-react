import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Login from './Login'
import Search from './Search'

class NavBar extends React.Component {
  render() {
    return (
      <div className="navigation-bar">
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
        {/*
        will probably have to fix this
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
