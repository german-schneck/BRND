// Dependencies
import {useState} from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './SearchInput.module.scss';

// Assets
import SearchIcon from '@/assets/icons/search.svg?react';

export default function SearchInput() {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <div className={classNames(styles.container, isActive && styles.active)}>
      <SearchIcon />
      <input 
        name={'name'} 
        className={styles.input} 
        type={'text'} 
        placeholder={'Search brands'}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
    </div>
  );
}