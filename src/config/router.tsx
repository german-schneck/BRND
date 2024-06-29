// Dependencies
import React  from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Pages
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import VotePage from '../pages/VotePage';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';

/**
 * RootNavigation component that handles the rendering of different routes based on authentication status.
 * It displays a loading indicator while authentication status is being determined.
 * Once the loading is complete, it dynamically renders routes based on the user's authentication status and the route's requirements.
 * 
 * @returns {React.ReactNode} - The Router component with nested routes or a LoaderIndicator if authentication status is still loading.
 */
export function RootNavigation(): React.ReactNode {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/welcome'} element={<WelcomePage />} />
        <Route path={'/vote'} element={<VotePage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

