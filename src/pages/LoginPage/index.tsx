// Dependencies
import React, {useCallback} from 'react';
import {SignInButton, UseSignInData} from '@farcaster/auth-kit';
import {motion} from 'framer-motion';

// StyleSheet
import styles from './LoginPage.module.scss';

// Assets
import Logo from '../../shared/assets/images/logo.svg';
import MockLogo from '../../shared/assets/images/mock/landscape-logo.svg';

// Components
import Typography from '../../shared/components/Typography';

export default function LoginPage(): React.ReactNode {

  /**
   * Callback function to handle the successful sign-in event.
   * @param e - The sign-in data received upon successful authentication.
   */
  const handleSignInSuccess = useCallback((e: UseSignInData) => {
    console.log(e);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.inner}>
        <motion.div 
          className={styles.container}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.2}}>
          <img src={Logo} className={styles.logo} />

          <div className={styles.field}>
            <img src={MockLogo} className={styles.brand} />
        
            <Typography weight={'bold'} className={styles.title} textAlign={'center'}>
            Discover, build, and sync your Farcaster Landscape
            </Typography>
          </div>  
        </motion.div>
        <motion.div
          className={styles.footer} 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.5}}
        >
          <SignInButton hideSignOut={true} onSuccess={handleSignInSuccess} /> 
        </motion.div> 
      </div>
  
      <div className={styles.decorator}>
        <div className={styles.squareGrid}>
          {Array.from({length: 14}).map((_, i) => (
            <div key={i} className={styles.square}>
              <motion.div
                className={styles.box}
                initial="hidden"
                animate="visible"
                viewport={{once: true}}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 300,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: i / 20
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
