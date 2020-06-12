import React from "react";
import Subject from "./pages/ContentPage/Subject";
import Home from "./pages/Home/Home";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import Search from "./pages/Search/Search";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import EditUser from "./pages/EditUser/EditUser";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";

class App extends React.Component {
  state = {
    sidebarOpen: false,
    loginStatusChange: false,
    nameChange: false
  };

  openSidebar = () => {
    this.setState({sidebarOpen: true});
  };

  closeSidebar = () => {
    this.setState({sidebarOpen: false});
  };

  handleLoginStatusChange = () => {
    this.setState({loginStatusChange: !this.state.loginStatusChange});
  }

  handleNameChange = () => {
    this.setState({nameChange: !this.state.nameChange});
  }

  render() {
    return (
      <main>
        <NavBar
          openSidebar={this.openSidebar} nameChange={this.state.nameChange}
          handleLoginStatusChange={this.handleLoginStatusChange}
        />
        <Sidebar
          className={this.state.sidebarOpen ? "visible" : "hidden"}
          loginStatusChange={this.state.loginStatusChange}
          closeSidebar={this.closeSidebar}
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
          <Route path='/search/:searchId'>
            <Search />
          </Route>
          <Route path='/manage-users'>
            <ManageUsers />
          </Route>
          <Route path='/register-user'>
            <RegisterUser />
          </Route>
          <Route path='/edit-user'>
            <EditUser handleNameChange={this.handleNameChange} />
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
