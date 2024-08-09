// Dependencies
import classNames from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

// StyleSheet
import styles from './BrandCard.module.scss';

// Components
import Typography from '../../Typography';

// Hooks
import { BrandStateScoreType } from '@/hooks/brands';

// Assets
import ScoreUpDownIcon from '@/assets/icons/score-updown-icon.svg?react';
import ScoreEqualIcon from '@/assets/icons/score-equal-icon.svg?react';

// Utils
import { shortenNumber } from '@/utils/number';

interface BrandCardProps {
  readonly name: string;
  readonly photoUrl: string;
  readonly size?: 'm' | 'l';
  readonly orientation?: 'left' | 'center' | 'right';
  readonly selected?: boolean;
  readonly onClick: () => void;
  readonly score: number;
  readonly variation: BrandStateScoreType;
  readonly className?: string;
  readonly disabled?: boolean;
}

export default function BrandCard({
  name,
  photoUrl,
  score,
  size = 'm',
  orientation = 'left',
  variation = 'equal',
  selected,
  onClick,
  className = '',
  disabled = false
}: BrandCardProps) {

  /**
   * Renders the variation icon based on the provided variation type.
   * @param {BrandCardProps['variation']} variation - The variation type ('equal', 'up', 'down').
   * @returns {JSX.Element} The rendered variation icon.
   */
  const renderVariation = (variation: BrandCardProps['variation']): JSX.Element => {
    const iconClass = styles[variation];
    const IconComponent = variation === 'equal' ? ScoreEqualIcon : ScoreUpDownIcon;

    return (
      <div className={iconClass}>
        <IconComponent />
      </div>
    );
  };

  const sizes = {
    m: {
      image: 22,
      title: {
        size: 12,
        lineHeight: 14
      },
      score: {
        size: 10,
        lineHeight: 10
      }
    },
    l: {
      image: 32,
      title: {
        size: 22,
        lineHeight: 26
      },
      score: {
        size: 12,
        lineHeight: 12
      }
    }
  };
  
  /**
   * Gets the initial position for the animation based on the orientation.
   * @param {string} orientation - The orientation of the animation ('left', 'center', or any other value).
   * @returns {Object} The initial position with x and y coordinates.
   */
  const getInitialPosition = (orientation: string) => {
    switch (orientation) {
      case 'left':
        return { x: '-100%', y: '-100%' };
      case 'center':
        return { y: '-100%' };
      default:
        return { x: '100%', y: '-100%' };
    }
  };

  /**
   * Gets the exit position for the animation based on the orientation.
   * @param {string} orientation - The orientation of the animation ('left', 'center', or any other value).
   * @returns {Object} The exit position with x and y coordinates.
   */
  const getExitPosition = (orientation: string) => {
    switch (orientation) {
      case 'left':
        return { x: '100%', y: '100%' };
      case 'center':
        return { y: '100%' };
      default:
        return { x: '-100%', y: '100%' };
    }
  };

  return (
    <button disabled={disabled} className={classNames(styles.item, (selected && styles.selected), (disabled && styles.disabled), className)} onClick={onClick}>
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.effect}
            initial={getInitialPosition(orientation)}
            animate={{ x: 0, y: 0 }}
            exit={getExitPosition(orientation)}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
      <div data-id="container" className={styles.container}>
        <div className={styles.top}>
          <img src={photoUrl} width={sizes[size].image} height={sizes[size].image} alt={`${name} logo`} />

          <div className={styles.score}>
            <Typography weight={'regular'} variant={'geist'} size={sizes[size].score.size} lineHeight={sizes[size].score.lineHeight} textAlign={'center'}>{shortenNumber(score)}</Typography>
            {renderVariation(variation)}
          </div>
        </div>
        <Typography as={'p'} size={sizes[size].title.size} lineHeight={sizes[size].title.lineHeight} weight={'semiBold'}>{name}</Typography>
      </div>
    </button>
  );
}