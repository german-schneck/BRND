// Dependencies
import React, {useCallback, useMemo} from 'react';
import {SignInButton, UseSignInData, useProfile} from '@farcaster/auth-kit';
import {motion} from 'framer-motion';

// Hooks
import {useLogIn} from '../../shared/hooks/auth';

// StyleSheet
import styles from './LoginPage.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

// Components
import Typography from '@/components/Typography';

export default function LoginPage(): React.ReactNode {
  const logIn = useLogIn();
  const {isAuthenticated} = useProfile();

  /**
   * Handles the successful sign-in event by mutating the login state with the received sign-in data.
   * 
   * @param {UseSignInData} data - The sign-in data received upon successful authentication.
   * @param {string} data.fid - The unique identifier for the user.
   * @param {string} data.signature - The cryptographic signature of the sign-in message.
   * @param {string} data.message - The message that was signed during authentication.
   * @param {string} data.nonce - A unique nonce used during the sign-in process.
   */
  const handleSignInSuccess = useCallback((data: UseSignInData) => {
    if (data && (data.fid && data.signature && data.message && data.username && data.pfpUrl)) {
      void logIn.mutate({
        fid: data.fid,
        signature: data.signature,
        domain: 'example.com',
        message: data.message,
        nonce: data.nonce,
        username: data.username,
        photoUrl: data.pfpUrl,
      });
    }
  }, []);

  /**
   * Renders a decorative grid of animated squares.
   * 
   * This component uses a useMemo hook to optimize performance by memoizing the rendered output.
   * It creates a grid of 14 squares, each with an animation that makes the square visible by changing
   * its opacity and vertical position. The animation for each square is staggered based on its index
   * to create a wave effect.
   * 
   * @returns A React component representing the decorative grid.
   */
  const renderDecoration = useMemo(() => (
    <div className={styles.decorator}>
      <div className={styles.squareGrid}>
        {Array.from({length: 14}).map((_, i) => (
          <div key={`--decoration-key-${i.toString()}`} className={styles.square}>
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
                    delay: i / 20,
                    type: 'spring', 
                    stiffness: 100
                  }
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ), []);

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
            <Typography weight={'bold'} className={styles.title} textAlign={'center'}>
              Discover, build, and sync your Farcaster Landscape
            </Typography>
          </div>  
        </motion.div>
        {!isAuthenticated && (
          <motion.div
            className={styles.footer} 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, delay: 0.5}}
          >
            <SignInButton hideSignOut={true} onSuccess={handleSignInSuccess} /> 
          </motion.div> 
        )}
      </div>
  
      {renderDecoration}
    </div>
  );
}
