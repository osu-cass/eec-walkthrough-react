import React, {Fragment, useState} from "react";
import ContentPage from "./pages/ContentPage/ContentPage";
import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/HomePage";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageIcons from "./pages/ManageIcons/ManageIcons";
import ManageLinks from "./pages/ManageLinks/ManageLinks";
import ManageFiles from "./pages/ManageFiles/ManageFiles";
import ManageDirectories from "./pages/ManageDirectories/ManageDirectories";
import ManageCardTitles from "./pages/ManageCardTitles/ManageCardTitles";
import ManageContributors from "./pages/ManageContributors/ManageContributors";
import SubmitContributor from "./pages/SubmitContributor/SubmitContributor";
import ManageHome from "./pages/ManageHome/ManageHome";
import ViewHistory from "./pages/ViewHistory/ViewHistory";
import Search from "./pages/Search/Search";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import Contributors from "./pages/Contributors/Contributors";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import PublishRequests from "./pages/PublishRequests/PublishRequests";
import PublishRequestHistory from "./pages/PublishRequestHistory/PublishRequestHistory";
import RequestPage from "./pages/RequestPage/RequestPage";
import EditUser from "./pages/EditUser/EditUser";
import PageList from "./pages/PageList/PageList";
import Error404 from "./pages/404/Error404";
import Error500 from "./pages/500/Error500";
import Quiz from "./pages/Quiz/Quiz";
import QuizResults from "./pages/QuizResults/QuizResults";
import QuizEdit from "./pages/QuizEdit/QuizEdit";
import QuizMove from "./pages/QuizMove/QuizMove";
import PageHeader from "./components/PageHeader/PageHeader";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import {Route, Routes} from "react-router-dom"; 
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false);
  const [pageEdit, setPageEdit] = useState(false);
  const [nameChange, setNameChange] = useState(false);

  return (
    <Fragment>
      <Provider store={store}>
        <main>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />

          <PageHeader
            nameChange={nameChange}
            openSidebar={() => setSidebarOpen(true)}
            handleLoginStatusChange={() =>
              setLoginStatusChange(!loginStatusChange)
            }
          />

          <NavBar loginStatusChange={loginStatusChange} />

          <Sidebar
            className={sidebarOpen ? "visible" : "hidden"}
            loginStatusChange={loginStatusChange}
            pageEdit={pageEdit}
            closeSidebar={() => setSidebarOpen(false)}
          />

          <Routes>  {/* Changed: Switch → Routes */}
            <Route path="/wiki/:category/:pageId" element={<ContentPage handlePageEdit={() => setPageEdit(!pageEdit)} />} />
            <Route path="/training/:pageId" element={<TrainingPage />} />
            <Route path="/quiz/:pageId" element={<Quiz />} />
            <Route path="/quiz-results/:pageId" element={<QuizResults />} />
            <Route path="/edit-quiz/:pageId" element={<QuizEdit />} />
            <Route path="/move-quiz/:pageId" element={<QuizMove />} />
            <Route path="/search/:searchId" element={<Search />} />
            <Route path="/page-list/:categoryId" element={<PageList />} />
            <Route path="/manage-card-titles" element={<ManageCardTitles />} />
            <Route path="/manage-contributors" element={<ManageContributors />} />
            <Route path="/manage-icons" element={<ManageIcons />} />
            <Route path="/manage-images/:userId" element={<ManageFiles />} />
            <Route path="/manage-uploads" element={<ManageDirectories />} />
            <Route path="/manage-links" element={<ManageLinks />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-home" element={<ManageHome />} />
            <Route path="/history-report" element={<ViewHistory />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/publish-requests/:requestId" element={<RequestPage />} />
            <Route path="/publish-requests" element={<PublishRequests />} />
            <Route path="/publish-request-history" element={<PublishRequestHistory />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/edit-user" element={<EditUser handleNameChange={() => setNameChange(!nameChange)} />} />
            <Route path="/submit-contributor" element={<SubmitContributor />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="/old-home" element={<Home loginStatusChange={loginStatusChange} />} />
            <Route path="/demo" element={<HomePage loginStatusChange={loginStatusChange} />} />
            <Route path="/" element={<HomePage loginStatusChange={loginStatusChange} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </Provider>
    </Fragment>
  );
}
export default App;
