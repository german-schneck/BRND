// Dependencies
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import classNames from 'clsx';

// Stylesheet
import styles from './TabNavigator.module.scss';

// Components
import Typography from '../Typography';
import { useDebounce } from 'react-use';

interface TabNavigatorProps {
  tabs: Array<{ path: string, label: string }>;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ tabs }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorOffset, setIndicatorOffset] = useState<number>(0);

  /**
   * Updates the indicator's width and offset based on the active tab.
   * Finds the active tab element using the active class and updates the state
   * with the tab's client width and offset left position.
   */
  const updateIndicator = () => {
    const activeTab = document.querySelector<HTMLDivElement>(`.${styles.tab}.${styles.active}`);
    if (activeTab) {
      setIndicatorWidth(activeTab.clientWidth);
      setIndicatorOffset(activeTab.offsetLeft);
    }
  };
    
  useEffect(() => {
    const currentIndex: number = tabs.findIndex(tab => tab.path === location.pathname);
    setActiveIndex(currentIndex);
  }, [location.pathname, tabs]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeIndex]);

  /**
   * Determines if a given path is active based on the current location.
   * @param {string} path - The path to evaluate.
   * @returns {boolean} - True if the path is active, false otherwise.
   */
  const isPathActive = (path: string): boolean => {
    return location.pathname === path;
  };

  useDebounce(updateIndicator, 100);

  return (
    <nav className={styles.layout}>
      {tabs.map((tab, index) => (
        <NavLink
          key={`--tab-index-${index.toString()}`}
          to={tab.path}
          className={classNames(styles.tab, isPathActive(tab.path) && styles.active)}
        >
          <Typography variant={'druk'} weight={'wide'} >{tab.label}</Typography>
        </NavLink>
      ))}
      <motion.div
        className={styles.indicator}
        initial={{ x: 0, width: 0 }}
        animate={{ x: indicatorOffset, width: indicatorWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </nav>
  );
};

export default TabNavigator;
