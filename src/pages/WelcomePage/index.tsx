// Dependencies
import React, {useCallback, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import classNames from 'clsx';

// StyleSheet
import styles from './WelcomePage.module.scss';

// Assets
import Logo from '@/assets/images/logo.svg';

// Components
import Typography from '@/components/Typography';
import Button from '@/shared/components/Button';
import IconButton from '@/components/IconButton';

// Assets
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

/**
 * An array of steps for the welcome page tutorial.
 * Each step is represented as a tuple containing:
 * - An array of strings for the title parts.
 * - A description string.
 * - A URL string for the image.
 */
const steps: Array<[string[], string, string]> = [
  [['Score', 'your favourite brands'], 'Build your daily podiums to rank and discover the Farcaster ecosystem brands.','https://dummyimage.com/200x200/000/fff'],
  [['Earn', 'brnd points'], 'Boost your top brands and win with them','https://dummyimage.com/200x200/000/fff'],
  [['Share', 'on frame'], 'Engage your close community by sharing your favorite brands from the ecosystem','https://dummyimage.com/200x200/000/fff']
];

function WelcomePage(): React.ReactNode {
  const [stepId, setStepId] = useState<number>(0);
  const navigate = useNavigate();

  /**
   * Handles the click event to skip the tutorial and navigate to the podium page.
   * 
   * @returns {void}
   */
  const handleClickSkipTutorial = useCallback((): void => {
    navigate('/vote');
  }, []);

  /**
   * Handles the click event to navigate to the next step in the tutorial.
   * If the current step is the last one, it navigates to the podium page.
   * 
   * @returns {void}
   */
  const handleClickNext = useCallback((): void => {
    if (stepId < steps.length - 1) {
      setStepId(stepId + 1);
    } else {
      navigate('/vote');
    }
  }, [stepId, navigate]);

  /**
   * Renders a slide row with a title, description, and image.
   * 
   * @param {string[]} text - An array containing the title parts.
   * @param {string} description - The description text.
   * @param {string} imageUrl - The URL of the image to be displayed.
   * @returns {JSX.Element} The rendered slide row component.
   */
  const renderSlideRow = useCallback((text: string[], description: string, imageUrl: string): JSX.Element => (
    <div className={styles.field}>
      <Typography variant={'druk'} size={28} lineHeight={34} weight={'wide'}>
        <span className={styles.title}>{text[0]}</span> {text.slice(1).join(' ')}
      </Typography>
      <Typography weight={'regular'} size={18} className={styles.grey}>
        {description}
      </Typography>
      <div className={styles.image}>
        <img src={imageUrl} alt={text.join(' ')} width={170} height={170} /> 
      </div>
    </div> 
  ), []);

  /**
   * Renders the step indicator component.
   * 
   * @returns {JSX.Element} The rendered step indicator component.
   */
  const renderStepIndicator = useMemo((): JSX.Element => (
    <div className={styles.steps}>
      {steps.map((_, index) => (
        <div key={index} className={classNames(styles.dot, {[styles.active]: index === stepId})} />
      ))}
    </div>
  ), [stepId]);
  
  return (
    <main className={styles.body}>
      <section className={styles.inner}>
        <div className={styles.container}>
          <img src={Logo} className={styles.logo} alt="Logo" />

          <div className={styles.slider}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={stepId}
                initial={{x: '100%', opacity: 0}}
                animate={{x: 0, opacity: 1, transition: {type: 'spring', stiffness: 100, damping: 20}}}
                exit={{x: '-100%', opacity: 0, transition: {type: 'spring', stiffness: 100, damping: 20}}}
              >
                {renderSlideRow(...steps[stepId])}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.actions}>
            <Button variant={'underline'} caption={'Skip'} onClick={handleClickSkipTutorial} />
            {renderStepIndicator}
            <IconButton variant={'solid'} icon={(<ArrowRightIcon />)} onClick={handleClickNext} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default withProtectionRoute(WelcomePage, 'only-connected');