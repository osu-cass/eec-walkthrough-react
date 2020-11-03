import React, {useState} from "react";
import ContentPage from "./pages/ContentPage/ContentPage";
import HomePage from "./pages/HomePage/HomePage";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageIcons from "./pages/ManageIcons/ManageIcons";
import ManageLinks from "./pages/ManageLinks/ManageLinks";
import ManageFiles from "./pages/ManageFiles/ManageFiles";
import ManageDirectories from "./pages/ManageDirectories/ManageDirectories";
import ManageCardTitles from "./pages/ManageCardTitles/ManageCardTitles";
import ViewHistory from "./pages/ViewHistory/ViewHistory";
import Search from "./pages/Search/Search";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import PublishRequests from "./pages/PublishRequests/PublishRequests";
import PublishRequestHistory from "./pages/PublishRequestHistory/PublishRequestHistory";
import RequestPage from "./pages/RequestPage/RequestPage";
import EditUser from "./pages/EditUser/EditUser";
import PageList from "./pages/PageList/PageList";
import Error404 from "./pages/404/Error404";
import Error500 from "./pages/500/Error500";
import PageHeader from "./components/PageHeader/PageHeader";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";
import "./App.css";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false);
  const [pageEdit, setPageEdit] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  return (
    <main>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

      <PageHeader
        nameChange={nameChange}
        openSidebar={() => setSidebarOpen(true)}
        handleLoginStatusChange={() => setLoginStatusChange(!loginStatusChange)}
      />

      <NavBar
        loginStatusChange={loginStatusChange}
      />

      <Sidebar
        className={sidebarOpen ? "visible" : "hidden"}
        loginStatusChange={loginStatusChange}
        pageEdit={pageEdit}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <Switch>

        <Route path="/wiki/:category/:pageId">
          <ContentPage
            handlePageEdit={() => setPageEdit(!pageEdit)}
          />
        </Route>

        <Route path="/search/:searchId">
          <Search />
        </Route>

        <Route path="/page-list/:categoryId">
          <PageList />
        </Route>

        <Route path="/manage-card-titles">
          <ManageCardTitles />
        </Route>

        <Route path="/manage-icons">
          <ManageIcons />
        </Route>

        <Route path="/manage-images/:userId">
          <ManageFiles />
        </Route>

        <Route path="/manage-uploads">
          <ManageDirectories />
        </Route>

        <Route path="/manage-links">
          <ManageLinks />
        </Route>

        <Route path="/manage-users">
          <ManageUsers />
        </Route>

        <Route path="/history-report">
          <ViewHistory />
        </Route>

        <Route path="/disclaimer">
          <Disclaimer/>
        </Route>

        <Route path="/publish-requests/:requestId">
          <RequestPage />
        </Route>

        <Route path="/publish-requests">
          <PublishRequests />
        </Route>

        <Route path="/publish-request-history">
          <PublishRequestHistory />
        </Route>

        <Route path="/register-user">
          <RegisterUser />
        </Route>

        <Route path="/edit-user">
          <EditUser handleNameChange={() => setNameChange(!nameChange)} />
        </Route>

        <Route path="/500">
          <Error500 />
        </Route>

        <Route exact path="/">
          <HomePage loginStatusChange={loginStatusChange} />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>

      </Switch>

    </main>
  );

}
export default App;
