// Dependencies
import React, {useCallback} from 'react';
import classNames from 'clsx';
import {useNavigate} from 'react-router-dom';

// StyleSheet
import styles from './NavigationBar.module.scss';

// Assets
import FlagIcon from '@/assets/icons/flag.svg?react';
import AddIcon from '@/assets/icons/add.svg?react';
import IconButton from '../IconButton';

// Components
import Typography from '../Typography';

// Hooks
import {useAuth} from '@/hooks/auth';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const {data} = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the click event for the vote button.
   * Navigates the user to the '/vote' route.
   */
  const handleClickVote = useCallback(() => {
    navigate('/vote');
  }, [navigate]);
  
  const handleClickHowToWorks = useCallback(() => {}, []);

  return (
    <div className={classNames(styles.layout)}>
      <div className={styles.icon}>
        <IconButton variant={'secondary'} icon={<FlagIcon />} onClick={handleClickHowToWorks} />
      </div>
      <div className={styles.icon}>
        <IconButton variant={'primary'} icon={<AddIcon />} onClick={handleClickVote} />
      </div>
      <button className={classNames(styles.icon, styles.user)}>
        <Typography weight={'regular'} size={14} lineHeight={18}>{data?.points}</Typography>
        <img className={styles.avatar} src={data?.photoUrl} width={32} height={32} />
      </button>
    </div>
  );
};

export default NavigationBar;
