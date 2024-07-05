// Dependencies
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

// Types
import {VotingViewProps} from '../../types';

// StyleSheet
import styles from './ShareView.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';
import ShareIcon from '@/assets/icons/share-icon.svg?react';

interface ShareViewProps extends VotingViewProps {}

export default function ShareView({currentBrands}: ShareViewProps) {
  const navigate = useNavigate();
  
  /**
   * Handles the click event for the "Skip" button.
   * Navigates to the CONGRATS view with the current brands.
   */
  const handleClickSkip = useCallback(() => {
    navigate('/');
  }, []);

  /**
   * Handles the click event for the "Share now" button.
   * Opens a new window with the specified URL.
   */
  const handleClickShare = useCallback(() => {
    window.open('https://example.com', '_blank');
  }, []);

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
              You will earn X BRND points sharing on frame your first podium
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