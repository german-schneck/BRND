// Dependencies
import React from 'react';
import {Routes, Route} from 'react-router-dom';

// // StyleSheet
import styles from './HomePage.module.scss';

// Components
import AppLayout from '../../shared/layouts/AppLayout';
import NewBrands from './partials/NewBrands';
import TrendBrands from './partials/TrendBrands';
import AllBrands from './partials/AllBrands';
import TabNavigator from '@/components/TabNavigator';

// Assets
import Logo from '@/assets/images/logo.svg';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

function HomePage(): React.ReactNode {
  return (
    <AppLayout>
      <div className={styles.body}>
        <div className={styles.header}>
          <img src={Logo} className={styles.logo} alt="Logo" />

          <div className={styles.tabs}>
            <TabNavigator
              tabs={[
                {
                  label: 'All',
                  path: '/all'
                },
                {
                  label: 'New',
                  path: '/'
                },
                {
                  label: 'Trending',
                  path: '/trending'
                }
              ]}
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<NewBrands />} />
          <Route path="/trending" element={<TrendBrands />} />
          <Route path="/all" element={<AllBrands />} />
        </Routes>
      </div>
    </AppLayout>
  );
}

export default withProtectionRoute(HomePage, 'only-connected');