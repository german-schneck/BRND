// Dependencies
import React from 'react';

// Components
import NavigationBar from '@/components/NavigationBar';

// StyleSheet
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {children}

      <div className={styles.bar}>
        <NavigationBar />
      </div>
    </div>
  );
};

export default AppLayout;
