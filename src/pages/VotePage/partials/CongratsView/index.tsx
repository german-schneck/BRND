// Dependencies
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

// Components
import Typography from '@/components/Typography';
import Button from '@/components/Button';

// StyleSheet
import styles from './CongratsView.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

export default function CongratsView() {
  const navigate = useNavigate();

  /**
   * Handle click event for the continue button.
   * Logs a message to the console.
   */
  const handleClickContinue = useCallback(() => {
    navigate('/');
  }, []);
  
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.center}>
          <img src={Logo} className={styles.logo} alt="Logo" />
        </div>
      </div>
      <div className={styles.confirmation}>
        <Typography variant={'druk'} weight={'wide'} size={28} lineHeight={36} textAlign={'center'} className={styles.title}>
          Congrats! you have won X brnd points
        </Typography>
        <Button caption={'Discover new brands'} onClick={handleClickContinue} />
      </div>
    </div>
  );
}