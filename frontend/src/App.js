import React, {useState} from "react";
import ContentPage from "./pages/ContentPage/ContentPage";
import Home from "./pages/Home/Home";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageIcons from "./pages/ManageIcons/ManageIcons";
import ManageLinks from "./pages/ManageLinks/ManageLinks";
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

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false);
  const [pageEdit, setPageEdit] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  };

  function closeSidebar() {
    setSidebarOpen(false);
  };

  function handleLoginStatusChange() {
    setLoginStatusChange(!loginStatusChange);
  }
  
  function handlePageEdit() {
    setPageEdit(!pageEdit);
  }

  function handleNameChange() {
    setNameChange(!nameChange);
  }

  return (
    <main>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <NavBar
        openSidebar={() => openSidebar()} nameChange={nameChange}
        handleLoginStatusChange={() => handleLoginStatusChange()}
      />
      <Sidebar
        className={sidebarOpen ? "visible" : "hidden"}
        loginStatusChange={loginStatusChange}
        pageEdit={pageEdit}
        closeSidebar={() => closeSidebar()}
      />
      <Switch>

        <Route path='/technologies/:pageId'>
          <ContentPage
            handlePageEdit={() => handlePageEdit()}
          />
        </Route>

        <Route path='/processes/:pageId'>
          <ContentPage
            handlePageEdit={() => handlePageEdit()}
          />
        </Route>

        <Route path='/productivity/:pageId'>
          <ContentPage
            handlePageEdit={() => handlePageEdit()}
          />
        </Route>

        <Route path='/assessments/:pageId'>
          <ContentPage
            handlePageEdit={() => handlePageEdit()}
          />
        </Route>

        <Route path='/industries/:pageId'>
          <ContentPage
            handlePageEdit={() => handlePageEdit()}
          />
        </Route>

        <Route path='/search/:searchId'>
          <Search />
        </Route>

        <Route path='/page-list/:pageName'>
          <PageList />
        </Route>

        <Route path='/manage-icons'>
          <ManageIcons />
        </Route>

        <Route path='/manage-links'>
          <ManageLinks />
        </Route>

        <Route path='/manage-users'>
          <ManageUsers />
        </Route>

        <Route path='/register-user'>
          <RegisterUser />
        </Route>

        <Route path='/edit-user'>
          <EditUser handleNameChange={() => handleNameChange()} />
        </Route>

        <Route path='/500'>
          <Error500 />
        </Route>

        <Route exact path='/'>
          <Home loginStatusChange={loginStatusChange} />
        </Route>

        <Route path='*'>
          <Error404 />
        </Route>

      </Switch>
    </main>
  );

}
export default App;
