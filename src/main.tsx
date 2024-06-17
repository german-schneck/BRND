/**
 * BRND Application
 * @author German D. Schneck <german.schneck@gmail.com>
 */
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthKitProvider} from '@farcaster/auth-kit';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// React-Query Provider
const queryClient = new QueryClient();

// Configuration
import {RootNavigation, farcasterConfig} from './config';

// SCSS StyleSheet
import './shared/styles/global.scss';
import '@farcaster/auth-kit/styles.css';

// Managers
import BottomSheetManager from './shared/managers/BottomSheetManager';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthKitProvider config={farcasterConfig}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetManager />
        <RootNavigation />
      </QueryClientProvider>
    </AuthKitProvider>
  </React.StrictMode>,
);
