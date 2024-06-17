// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './NavigationBar.module.scss';

// Assets
import FlagIcon from '@/assets/icons/flag.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import AddIcon from '@/assets/icons/add.svg?react';

// Components
import Typography from '../Typography';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => (
  <div className={classNames(styles.layout)}>
    <button className={styles.icon}>
      <FlagIcon />
    </button>
    <button className={classNames(styles.icon, styles.search)}>
      <SearchIcon />
    </button>
    <button className={styles.icon}>  
      <div className={styles.add}>
        <AddIcon />
      </div>
    </button>
    <button className={classNames(styles.icon, styles.user)}>
      <Typography weight={'regular'} size={14} lineHeight={18}>300<b>/300</b></Typography>
      <img className={styles.avatar} src={'https://steamavatar.io/img/1477787726ELINA.jpg'} width={32} height={32} />
    </button>
  </div>
);

export default NavigationBar;
