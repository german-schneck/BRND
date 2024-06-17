// Dependencies
import React from 'react';
import {motion} from 'framer-motion';

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';

// StyleSheet
import styles from './PodiumPage.module.scss';

export default function PodiumPage(): React.ReactNode {
  return (
    <div className={styles.body}>
      <motion.div 
        className={styles.container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1, delay: 0.5}}
      >
        <Typography size={19} weight={'bold'}>Welcome! 👋 Create your Farcaster Landscape Brand Podium</Typography>
        <Typography size={18} weight={'light'} className={styles.grey}>Add your favourite brands on this podium</Typography>
      </motion.div>
      <Podium />
    </div>
  );
}

