// Dependencies
import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// // StyleSheet
import styles from './ProfilePage.module.scss';

// Components
import AppLayout from '@/shared/layouts/AppLayout';
import MyPodium from './partials/MyPodium';
import TabNavigator from '@/components/TabNavigator';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

// Assets
import PointBIcon from '@/assets/icons/point-b.svg?react';
import GoBackIcon from '@/assets/icons/go-back-icon.svg?react';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

// Hooks
import {useAuth} from '@/hooks/auth';

function ProfilePage(): React.ReactNode {
  const {data} = useAuth();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Button
              variant={'underline'} 
              caption={'Go Back'} 
              iconLeft={<GoBackIcon />}
              onClick={() => navigate('/')} 
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
              <Button caption={'How it works'} variant={'primary'} onClick={() => {}} />
            </div>
          </div>
          <div className={styles.tabs}>
            <TabNavigator
              tabs={[
                {
                  label: 'Podiums',
                  path: '/profile'
                }
              ]}
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<MyPodium />} />
        </Routes>
      </div>
    </AppLayout>
  );
}

export default withProtectionRoute(ProfilePage, 'only-connected');