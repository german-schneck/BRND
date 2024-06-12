// Dependencies
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Pages
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

export const RootNavigation = (): React.ReactNode => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default RootNavigation;

