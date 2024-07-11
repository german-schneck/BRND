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
          { path: 'all', element: <HomePage /> },
          { path: 'trending', element: <HomePage /> },
          { path: 'new', element: <HomePage /> },
        ],
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        children: [
          { path: '', element: <ProfilePage /> },
        ],
      },
      {
        path: '/brand/:id',
        element: <BrandPage />,
      },
      { path: '/welcome', element: <WelcomePage /> },
      { path: '/vote/:unixDate?', element: <VotePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

