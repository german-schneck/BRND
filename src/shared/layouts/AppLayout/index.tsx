// Dependencies
import React from 'react';

// Components
import NavigationBar from '@components/NavigationBar';

// StyleSheet
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  return (
    <div className={styles.layout}>
      <div className={styles.view}>
        {children}
      </div>

      <div className={styles.bar}>
        <NavigationBar />
      </div>
    </div>
  );
};

export default AppLayout;
