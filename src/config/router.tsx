// Dependencies
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// Pages
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PodiumPage from '../pages/PodiumPage';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';

// Hooks
import {useAuth} from '../shared/hooks/auth';

// Components
import LoaderIndicator from '../shared/components/LoaderIndicator';

/**
 * Renders a component or redirects based on a condition.
 * 
 * @param {boolean} [operation=false] - Condition to check whether to redirect or render the component.
 * @param {string} redirectTo - The URL to redirect to if the condition is true.
 * @param {() => React.ReactNode} component - A function that returns the React component to render if the condition is false.
 * @returns {React.ReactNode} - Either a redirection to the specified URL or the specified component.
 */
const Protected = ({operation = false, redirectTo, component}: { operation?: boolean; redirectTo: string; component: () => React.ReactNode }) => 
  operation ? <Navigate to={redirectTo} /> : component();

/**
 * RootNavigation component that handles the rendering of different routes based on authentication status.
 * It displays a loading indicator while authentication status is being determined.
 * Once the loading is complete, it dynamically renders routes based on the user's authentication status and the route's requirements.
 * 
 * @returns {React.ReactNode} - The Router component with nested routes or a LoaderIndicator if authentication status is still loading.
 */
export const RootNavigation = (): React.ReactNode => {
  const {isLoading, isError, data} = useAuth();

  const hasLoggedIn = !!(!isError && data);

  if (isLoading) {
    return (
      <LoaderIndicator variant={'fullscreen'} />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={(<Protected operation={!hasLoggedIn} redirectTo='/login' component={HomePage} />)} />
        <Route path={'/login'} element={(<Protected operation={hasLoggedIn} redirectTo='/' component={LoginPage} />)} />
        <Route path={'/welcome'} element={(<Protected operation={!hasLoggedIn} redirectTo='/login' component={WelcomePage} />)} />
        <Route path={'/podium'} element={(<Protected operation={!hasLoggedIn} redirectTo='/login' component={PodiumPage} />)} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default RootNavigation;

