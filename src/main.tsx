/**
 * BRND Application
 * @author German D. Schneck <german.schneck@gmail.com>
 */
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthKitProvider} from '@farcaster/auth-kit';

// Configuration
import {RootNavigation, farcasterConfig} from './config';

// SCSS StyleSheet
import './shared/styles/global.scss';
import '@farcaster/auth-kit/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthKitProvider config={farcasterConfig}>
      <RootNavigation />
    </AuthKitProvider>
  </React.StrictMode>,
);
