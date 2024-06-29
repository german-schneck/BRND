// Dependencies
import {useCallback} from 'react';
import {motion} from 'framer-motion';

// Hooks
import {Brand, useVoteBrands} from '@/hooks/brands';

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

// Types
import {VotingViewEnum, VotingViewProps} from '../../types';

// StyleSheet
import styles from './PodiumView.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

interface PodiumViewProps extends VotingViewProps {}

export default function PodiumView({navigateToView}: PodiumViewProps) {
  const voteBrands = useVoteBrands();

  /**
   * Handles the submission of votes for the selected brands.
   * 
   * @param {Brand[]} brands - An array of selected brands.
   */
  const handleSubmitVote = useCallback((brands: Brand[]) => {
    void voteBrands.mutate({
      ids: [
        brands[1].id,
        brands[0].id,
        brands[2].id
      ]
    }, {
      onSuccess: () => {
        navigateToView(VotingViewEnum.SHARE, brands);
      }
    });
  }, []);
  
  return (
    <div className={styles.body}>
      <motion.div 
        className={styles.container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1, delay: 0.5}}>
        <div className={styles.center}>
          <img src={Logo} className={styles.logo} alt="Logo" />
        </div>
        <Typography size={18} lineHeight={24} variant={'druk'} weight={'wide'}>Add your top brands on this podium</Typography>
        <div className={styles.actions}>
          <Button 
            variant={'underline'}
            className={styles.howToScore} 
            onClick={() => null} 
            caption={'How to score'}
          />
        </div>
      </motion.div>
      <Podium onVote={handleSubmitVote} />
    </div>
  );
}