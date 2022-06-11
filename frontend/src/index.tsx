import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.scss';
import ProjectCreation from './Pages/ProjectCreation/ProjectCreation';
import Searchbar from './Pages/Searchbar/Searchbar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<h1>hi from app</h1>} />
          <Route path="create-project" element={<ProjectCreation />} caseSensitive={false} />
          <Route path="test" element={<Searchbar />} caseSensitive={false} />
        </Route>
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
    );

reportWebVitals();