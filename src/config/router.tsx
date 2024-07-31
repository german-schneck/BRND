// Dependencies
import { createBrowserRouter } from 'react-router-dom';

// Pages
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import VotePage from '../pages/VotePage';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import ProfilePage from '../pages/ProfilePage';
import BrandPage from '../pages/BrandPage';
import ClaimedPage from '../pages/ClaimedPage';

// Providers
import { AppProvider } from '../shared/providers/AppProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProvider />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          { path: 'top', element: <HomePage /> },
          { path: 'new', element: <HomePage /> },
          { path: 'all', element: <HomePage /> },
        ],
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        children: [
          { path: '', element: <ProfilePage /> },
          { path: 'podium', element: <ProfilePage /> },
        ],
      },
      {
        path: '/brand/:id',
        element: <BrandPage />,
      },
      { path: '/welcome', element: <WelcomePage /> },
      { path: '/vote/:unixDate?', element: <VotePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/claimed', element: <ClaimedPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

