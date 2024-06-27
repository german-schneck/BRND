// Dependencies
import React from 'react';
import {motion} from 'framer-motion';

// Components
import Podium from '@/components/Podium';
import Typography from '@/components/Typography';

// StyleSheet
import styles from './VotePage.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

export default function VotePage(): React.ReactNode {
  return (
    <div className={styles.body}>
      <motion.div 
        className={styles.container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1, delay: 0.5}}
      >
        <div className={styles.center}>
          <img src={Logo} className={styles.logo} alt="Logo" />
        </div>
        <Typography size={18} lineHeight={24} variant={'druk'} weight={'wide'}>Add your top brands on this podium</Typography>
      </motion.div>
      <Podium />
    </div>
  );
}

