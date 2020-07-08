import React from "react";
import ContentPage from "./pages/ContentPage/ContentPage";
import Home from "./pages/Home/Home";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import Search from "./pages/Search/Search";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import EditUser from "./pages/EditUser/EditUser";
import PageList from "./pages/PageList/PageList";
import Error404 from "./pages/404/Error404";
import Error500 from "./pages/500/Error500";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";
import "./App.css";

class App extends React.Component {
  state = {
    sidebarOpen: false,
    loginStatusChange: false,
    pageEdit: false,
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
  handlePageEdit = () => {
    this.setState({pageEdit: !this.state.pageEdit});
  }

  handleNameChange = () => {
    this.setState({nameChange: !this.state.nameChange});
  }

  render() {
    return (
      <main>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <NavBar
          openSidebar={this.openSidebar} nameChange={this.state.nameChange}
          handleLoginStatusChange={this.handleLoginStatusChange}
        />
        <Sidebar
          className={this.state.sidebarOpen ? "visible" : "hidden"}
          loginStatusChange={this.state.loginStatusChange}
          pageEdit={this.state.pageEdit}
          closeSidebar={this.closeSidebar}
        />
        <Switch>
          <Route
            path='/technologies/:pageId'
            render={(props) => (
              <ContentPage {...props}
                pageId={props.match.params.pageId}
                handlePageEdit={this.handlePageEdit}
              />
            )}
          />
          <Route
            path='/processes/:pageId'
            render={(props) => (
              <ContentPage {...props}
                pageId={props.match.params.pageId}
                handlePageEdit={this.handlePageEdit}
              />
            )}
          />
          <Route
            path='/productivity/:pageId'
            render={(props) => (
              <ContentPage {...props}
                pageId={props.match.params.pageId}
                handlePageEdit={this.handlePageEdit}
              />
            )}
          />
          <Route
            path='/assessments/:pageId'
            render={(props) => (
              <ContentPage {...props}
                pageId={props.match.params.pageId}
                handlePageEdit={this.handlePageEdit}
              />
            )}
          />
          <Route
            path='/industries/:pageId'
            render={(props) => (
              <ContentPage {...props}
                pageId={props.match.params.pageId}
                handlePageEdit={this.handlePageEdit}
              />
            )}
          />
          <Route path='/search/:searchId'>
            <Search />
          </Route>
          <Route path='/page-list/:pageName'>
            <PageList />
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
          <Route path='/500'>
            <Error500 />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </main>
    );
  }
}
export default App;
