/**
 * BRND Application
 * @author German D. Schneck <german.schneck@gmail.com>
 */
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

// SCSS StyleSheet
import './shared/styles/global.scss';
import '@farcaster/auth-kit/styles.css';

// React-Query Provider
const queryClient = new QueryClient();

// Configuration
import { router } from './config/router';
import { farcasterConfig } from './config/farcaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthKitProvider config={farcasterConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthKitProvider>
  </React.StrictMode>,
);
