// Dependencies
import {useState} from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './SearchInput.module.scss';

// Assets
import SearchIcon from '@/assets/icons/search.svg?react';

interface SearchInputProps {
  onChangeText: (text: string) => void;
}

export default function SearchInput({onChangeText}: SearchInputProps) {
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
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
}