// Dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'clsx';

// Stylesheet
import styles from './TabNavigator.module.scss';

// Components
import Typography from '../Typography';

interface TabNavigatorProps {
  tabs: Array<{ path: string, label: string }>;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({tabs}) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
  const [indicatorOffset, setIndicatorOffset] = useState<number>(0);

  useEffect(() => {
    const currentIndex: number = tabs.findIndex(tab => tab.path === location.pathname);
    setActiveIndex(currentIndex);
  }, [location.pathname, tabs]);

  useEffect(() => {
    const activeTab = document.querySelector<HTMLDivElement>(`.${styles.tab}.${styles.active}`);
    if (activeTab) {
      setIndicatorWidth(activeTab.clientWidth);
      setIndicatorOffset(activeTab.offsetLeft);
    }
  }, [activeIndex]);

  return (
    <nav className={styles.layout}>
      {tabs.map((tab, index) => (
        <NavLink
          key={index}
          to={tab.path}
          className={({isActive}) => classNames(styles.tab, isActive && styles.active)}
        >
          <Typography variant={'druk'} weight={'wide'} >{tab.label}</Typography>
        </NavLink>
      ))}
      <motion.div
        className={styles.indicator}
        initial={{x: 0, width: 0}}
        animate={{x: indicatorOffset, width: indicatorWidth}}
        transition={{type: 'spring', stiffness: 300, damping: 30}}
      />
    </nav>
  );
};

export default TabNavigator;
