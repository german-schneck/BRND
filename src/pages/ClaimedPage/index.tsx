// Dependencies
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// StyleSheet
import styles from './ClaimedPage.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';
import GoBackIcon from '@/assets/icons/go-back-icon.svg?react';

// Components
import Typography from '@/components/Typography';
import Button from '@/shared/components/Button';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

function ClaimedPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.inner}>
        <motion.div 
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <img src={Logo} className={styles.logo} alt={'BRND logotype'} />

          <div className={styles.field}>
            <Typography size={40} lineHeight={50} weight={'bold'} textAlign={'center'}>
              😄😄😄
            </Typography>
            <Typography variant={'druk'} size={24} lineHeight={30} weight={'text-wide'} className={styles.title} textAlign={'center'}>
            Your brand has been claimed. You will soon hear from our side
            </Typography>

            <Button variant={'underline'} iconLeft={<GoBackIcon />} onClick={() => navigate('/vote')} caption={'Go back to the Podium'} />
          </div>  
        </motion.div>
      </div>

    </div>
  );
}

export default withProtectionRoute(ClaimedPage, 'only-connected');
