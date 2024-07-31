// Dependencies
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

export const URL_HOW_IT_WORKS = import.meta.env.VITE_APP_HOW_IT_WORKS;

// // StyleSheet
import styles from './ProfilePage.module.scss';

// Components
import AppLayout from '@/shared/layouts/AppLayout';
import MyPodium from './partials/MyPodium';
import MyBrands from './partials/MyBrands';
import TabNavigator from '@/components/TabNavigator';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

// Assets
import PointBIcon from '@/assets/icons/point-b.svg?react';
import GoBackIcon from '@/assets/icons/go-back-icon.svg?react';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

// Hooks
import { useAuth } from '@/hooks/auth';

function ProfilePage(): React.ReactNode {
  const { data } = useAuth();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.left}>
            <IconButton
              variant={'solid'} 
              icon={<GoBackIcon />}
              onClick={() => navigate('/')} 
              className={styles.backBtn}
            />
          </div>
          <div className={styles.user}>
            <div className={styles.profile}>
              <div className={styles.image}>
                <img src={data?.photoUrl} width={40} height={40} alt={data?.username} />
              </div>
              <div className={styles.points}>
                <Typography variant={'geist'} weight={'bold'} size={32} lineHeight={40}>{data?.points}</Typography>
                <PointBIcon />
              </div>
            </div>
            <Typography variant={'geist'} weight={'regular'} size={15} textAlign={'center'} lineHeight={20}>Total BRND points earned for your contribution</Typography>
            <div className={styles.center}>
              <Button caption={'How it works'} variant={'primary'} onClick={() => {window.open(URL_HOW_IT_WORKS, '_blank');}} />
            </div>
          </div>
          <div className={styles.tabs}>
            <TabNavigator
              tabs={[
                {
                  label: 'Rank',
                  path: '/profile'
                },
                {
                  label: 'Podiums',
                  path: '/profile/podium'
                },
              ]}
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<MyBrands />} />
          <Route path="/podium" element={<MyPodium />} />
        </Routes>
      </div>
    </AppLayout>
  );
}

export default withProtectionRoute(ProfilePage, 'only-connected');