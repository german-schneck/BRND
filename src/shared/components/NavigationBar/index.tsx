// Dependencies
import React, { useCallback } from 'react';
import classNames from 'clsx';
import { useNavigate } from 'react-router-dom';

// StyleSheet
import styles from './NavigationBar.module.scss';

// Assets
import HomeIcon from '@/assets/icons/home.svg?react';
import AddIcon from '@/assets/icons/add.svg?react';
import ShareIcon from '@/assets/icons/share-icon.svg?react';
//import ExportAppIcon from '@/assets/icons/export-app-icon.svg?react';
import BPointIcon from '@/assets/icons/point-b.svg?react';

// Components
import Typography from '../Typography';
import IconButton from '../IconButton';

// Hooks
import { useAuth } from '@/hooks/auth';
//import { ModalsIds, useModal } from '@/hooks/ui';

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const { data } = useAuth();
  //const { openModal } = useModal();
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
  
  /**
   * Handles the click event for the "How It Works" button.
   * Opens a modal with instructions on how to add the app to the home screen.
   */
  /*
  const handleClickHowToWorks = useCallback(() => {
    openModal(ModalsIds.BOTTOM_ALERT, {
      title: 'Add BRND to your home screen',
      content: (
        <div className={styles.list}>
          <Typography size={14} weight={'regular'} lineHeight={18}>1. Tap the <span><ExportAppIcon /></span> share icon at the bottom of the screen</Typography>
          <Typography size={14} weight={'regular'} lineHeight={18}>2. Select add to home screen</Typography>
          <Typography size={14} weight={'regular'} lineHeight={18}>3. Let's go play!</Typography>
        </div>
      )
    });
  }, [openModal]);
  */

  const handleClickGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

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
        <IconButton variant={'secondary'} icon={<HomeIcon />} onClick={handleClickGoHome} />
      </div>
      <div className={styles.icon}>
        <IconButton variant={'primary'} icon={data?.hasVotedToday ? <ShareIcon /> : <AddIcon />} onClick={handleClickMain} />
      </div>
      <button className={classNames(styles.icon, styles.user)} onClick={handleClickUser}>
        <div className={styles.points}>
          <Typography weight={'regular'} size={14} lineHeight={18}>{data?.points}</Typography>
          <BPointIcon width={15} height={12} />
        </div>
        <img alt={data?.username} className={styles.avatar} src={data?.photoUrl} width={32} height={32} />
      </button>
    </div>
  );
};

export default NavigationBar;
