import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss';
import ProjectCreation from './Pages/ProjectCreation/ProjectCreation';
import Searchbar from './Components/Searchbar/Searchbar';
import reportWebVitals from './reportWebVitals';
import ProjectPage from "./Pages/ProjectPage/ProjectPage"
import TaskPage from './Pages/TaskPage/TaskPage';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home/Home';
import CommunityPage from './Pages/Communities/CommunityPage/CommunityPage';
import SearchResultsPage from './Pages/SearchResults/SearchResults';
import LoginPage from "./Pages/Login/Login";
import SignUpPage from './Pages/SignUp/SignUp';
import AuthContextProvider from './Context/LoginContext';
import "./sass/main.scss"
import { Provider } from "react-redux";
import { store } from "./store/store"


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="create-project" element={<ProjectCreation />} caseSensitive={false} />
              <Route path="test" element={<Searchbar />} caseSensitive={false} />
              <Route path="project" element={<ProjectPage />} caseSensitive={false} />
              <Route path="project/task/:id" element={<TaskPage />} caseSensitive={false} />
              <Route path="community" element={<CommunityPage />} caseSensitive={false} ></Route>
              <Route path="search-results" element={<SearchResultsPage />} caseSensitive={false} ></Route>
              <Route path="login" element={<LoginPage />} caseSensitive={false} ></Route>
              <Route path="signup" element={<SignUpPage />} caseSensitive={false} ></Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();