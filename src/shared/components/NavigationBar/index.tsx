// Dependencies
import React, {useCallback} from 'react';
import classNames from 'clsx';
import {useNavigate} from 'react-router-dom';

// StyleSheet
import styles from './NavigationBar.module.scss';

// Assets
import FlagIcon from '@/assets/icons/flag.svg?react';
import AddIcon from '@/assets/icons/add.svg?react';
import ShareIcon from '@/assets/icons/share-icon.svg?react';

// Components
import Typography from '../Typography';
import IconButton from '../IconButton';

// Hooks
import {useAuth} from '@/hooks/auth';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const {data} = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the click event for the main button.
   * Navigates the user to the '/vote' route with the current Unix date if the user has voted today,
   * otherwise navigates to the '/vote' route without a date.
   */
  const handleClickMain = useCallback(() => {
    const currentUnixDate = Math.floor(new Date().getTime() / 1000);
    navigate(data?.hasVotedToday ? `/vote/${currentUnixDate}` : '/vote');
  }, [data, navigate]);
  
  const handleClickHowToWorks = useCallback(() => {}, []);

  /**
   * Handles the click event for the user button.
   * Navigates the user to the '/profile' route.
   */
  const handleClickUser = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  return (
    <div className={classNames(styles.layout)}>
      <div className={styles.icon}>
        <IconButton variant={'secondary'} icon={<FlagIcon />} onClick={handleClickHowToWorks} />
      </div>
      <div className={styles.icon}>
        <IconButton variant={'primary'} icon={data?.hasVotedToday ? <ShareIcon /> : <AddIcon />} onClick={handleClickMain} />
      </div>
      <button className={classNames(styles.icon, styles.user)} onClick={handleClickUser}>
        <Typography weight={'regular'} size={14} lineHeight={18}>{data?.points}</Typography>
        <img className={styles.avatar} src={data?.photoUrl} width={32} height={32} />
      </button>
    </div>
  );
};

export default NavigationBar;
