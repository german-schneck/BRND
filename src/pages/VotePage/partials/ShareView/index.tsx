// Dependencies
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const FRAME_URL = import.meta.env.VITE_APP_FRAME_URL;

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

import { useShareFrame } from '@/hooks/user';

// Types
import { VotingViewProps } from '../../types';

// StyleSheet
import styles from './ShareView.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';
import ShareIcon from '@/assets/icons/share-icon.svg?react';

interface ShareViewProps extends VotingViewProps {}

export default function ShareView({ currentBrands, currentVoteId }: ShareViewProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const shareFrame = useShareFrame();
  
  /**
   * Handles the click event for the "Skip" button.
   * Navigates to the CONGRATS view with the current brands.
   */
  const handleClickSkip = useCallback(() => {
    currentVoteId === ''
      ? navigate(-1)
      : navigate('/');
  }, []);

  /**
   * Handles the click event for the "Share now" button.
   * Opens a new window with the specified URL.
   */
  const handleClickShare = useCallback(() => {
    const profile1 = currentBrands[1].profile ? currentBrands[1].profile : currentBrands[1].channel;
    const profile2 = currentBrands[0].profile ? currentBrands[0].profile : currentBrands[0].channel;
    const profile3 = currentBrands[2].profile ? currentBrands[2].profile : currentBrands[2].channel;

    window.open(`https://warpcast.com/~/compose?text=I%27ve%20just%20create%20my%20%2Fbrnd%20podium:%0A%0A%F0%9F%A5%87${currentBrands[1].name} - ${profile1}%0A%F0%9F%A5%88${currentBrands[0].name} - ${profile2}%0A%F0%9F%A5%89${currentBrands[2].name} - ${profile3}%0A&embeds[]=${FRAME_URL}/${currentVoteId}`, '_blank');

    shareFrame.mutate(undefined, {
      onSuccess: (result) => {
        if (result) {
          location.pathname === '/vote'
            ? navigate(`${location.pathname}/${Math.floor(Date.now()/1000)}?success`) 
            : navigate(location.pathname + '?success');
        }
      }
    });
  }, [shareFrame, currentBrands, navigate]);

  /**
   * Array of objects representing the podium places.
   * Each object contains an icon and the name of the brand.
   * The name is derived from the brand's profile or channel.
   *
   * @type {Array<{icon: string, name: string}>}
   */
  const places = [
    {
      icon: '🥇',
      name: currentBrands[1].profile || currentBrands[1].channel
    },
    {
      icon: '🥈',
      name: currentBrands[0].profile || currentBrands[0].channel
    },
    {
      icon: '🥉',
      name: currentBrands[2].profile || currentBrands[2].channel
    }
  ];
  
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.center}>
          <img src={Logo} className={styles.logo} alt="Logo" />
        </div>
        <Typography size={18} lineHeight={24} variant={'druk'} weight={'wide'} className={styles.title}>Share on frame</Typography>
      </div>
      <div className={styles.box}>
        <Typography variant={'geist'} weight={'regular'} size={16} lineHeight={20}>I’ve just create my podium of Brands with;</Typography>
        <div className={styles.places}>
          {places.map((place, index) => (
            <Typography key={`--place-${index.toString()}`} variant={'geist'} weight={'regular'} size={16} lineHeight={20}>{place.icon} {place.name}</Typography>
          ))}
        </div>

        <div className={styles.podium}>
          <Podium isAnimated={false} variant={'readonly'} initial={currentBrands} />

          <div className={styles.action}>
            <Typography variant={'geist'} weight={'semiBold'} textAlign={'center'} size={14} lineHeight={18}>
              You will earn 3 BRND points sharing your podium once a day
            </Typography>
            <Button caption={'Share now'} className={styles.button} iconLeft={(<ShareIcon />)} onClick={handleClickShare} />
          </div>
        </div>
      </div>
      <div className={styles.action}>
        <Button variant={'underline'} caption='Skip' onClick={handleClickSkip} />
      </div>
    </div>
  );
}