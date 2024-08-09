// Dependencies
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Hooks
import { Brand, useVoteBrands } from '@/hooks/brands';

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

// Types
import { VotingViewEnum, VotingViewProps } from '../../types';

// StyleSheet
import styles from './PodiumView.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';
import GoBackIcon from '@/assets/icons/go-back-icon.svg?react';

// Hooks
import { ModalsIds, useModal } from '@/hooks/ui';

interface PodiumViewProps extends VotingViewProps {}

export default function PodiumView({ navigateToView }: PodiumViewProps) {
  const voteBrands = useVoteBrands();
  const navigate = useNavigate();
  const { openModal } = useModal();

  /**
   * Handles the submission of votes for the selected brands.
   * 
   * @param {Brand[]} brands - An array of selected brands.
   */
  const handleSubmitVote = useCallback((brands: Brand[]) => {
    voteBrands.mutate({
      ids: [
        brands[1].id,
        brands[0].id,
        brands[2].id
      ]
    }, {
      onSuccess: (response) => {
        navigateToView(VotingViewEnum.SHARE, brands, response.id);
      }
    });
  }, [voteBrands, navigateToView]);

  /**
   * Handles the click event for the "How to Score" button.
   * Opens a modal with instructions on how to score points for the podium brands.
   *
   * The modal provides a breakdown of the points distribution:
   * - 🥇 60 points for the first place
   * - 🥈 30 points for the second place
   * - 🥉 10 points for the third place
   */
  const handleClickHowToScore = useCallback(() => {
    openModal(ModalsIds.BOTTOM_ALERT, {
      title: 'How to score',
      content: (
        <div className={styles.list}>
          <Typography size={14} lineHeight={18}>You have 100 points to build your first podium brands:</Typography>
          <Typography size={16} weight={'regular'} lineHeight={20}>🥇 60</Typography>
          <Typography size={16} weight={'regular'} lineHeight={20}>🥈 30</Typography>
          <Typography size={16} weight={'regular'} lineHeight={20}>🥉 10</Typography>
        </div>
      )
    });
  }, [openModal]);
  
  return (
    <div className={styles.body}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <IconButton
          variant={'solid'} 
          icon={<GoBackIcon />}
          onClick={() => navigate('/')} 
          className={styles.backBtn}
        />
        <div className={styles.center}>
          <img src={Logo} className={styles.logo} alt="Logo" />
          <Typography size={18} lineHeight={24} variant={'druk'} weight={'text-wide'}>Add your top brands on this podium</Typography>
          <div className={styles.actions}>
            <Button 
              variant={'underline'}
              className={styles.howToScore} 
              onClick={handleClickHowToScore} 
              caption={'How to score'}
            />
          </div>
        </div>
      </motion.div>
      <Podium onVote={handleSubmitVote} />
    </div>
  );
}