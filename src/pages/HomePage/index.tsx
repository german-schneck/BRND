// Dependencies
import React from 'react';

// // StyleSheet
// import styles from './HomePage.module.scss';

// Components
import AppLayout from '../../shared/layouts/AppLayout';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

function HomePage(): React.ReactNode {
  return (
    <AppLayout>
      HomePage
    </AppLayout>
  );
}

export default withProtectionRoute(HomePage, 'only-connected');