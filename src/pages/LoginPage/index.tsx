// Dependencies
import {useCallback, useMemo} from 'react';
import {SignInButton, UseSignInData, useProfile} from '@farcaster/auth-kit';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

// Hooks
import {useAuth, useLogIn} from '@/hooks/auth';

// StyleSheet
import styles from './LoginPage.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

// Components
import Typography from '@/components/Typography';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

function LoginPage() {
  const logIn = useLogIn();
  const navigate = useNavigate();
  const {isAuthenticated} = useProfile();
  const {refetch} = useAuth();

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
    if (data?.fid && data?.signature && data?.message && data?.username && data?.pfpUrl) {
      logIn.mutate({
        fid: data.fid,
        signature: data.signature,
        domain: 'example.com',
        message: data.message,
        nonce: data.nonce,
        username: data.username,
        photoUrl: data.pfpUrl,
      }, {
        onSuccess(data) {
          if (data) {
            refetch().then(() => {
              const {isCreated, hasVotedToday} = data;
              
              let navigatePath = '/';
              if (isCreated) {
                navigatePath = '/welcome';
              } else if (!hasVotedToday) {
                navigatePath = '/vote';
              }
              navigate(navigatePath);
            });
          }
        }
      });
    }
  }, [navigate]);

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
          <img src={Logo} className={styles.logo} alt={'BRND logotype'} />

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

export default withProtectionRoute(LoginPage, 'only-disconnected');
