// Dependencies
import classNames from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';

// StyleSheet
import styles from './BrandCard.module.scss';

// Components
import Typography from '../../Typography';

// Hooks
import {BrandStateScoreType} from '@/hooks/brands';

// Assets
import ScoreUpDownIcon from '@/assets/icons/score-updown-icon.svg?react';
import ScoreEqualIcon from '@/assets/icons/score-equal-icon.svg?react';

interface BrandCardProps {
  name: string;
  photoUrl: string;
  size?: 'm' | 'l';
  orientation?: 'left' | 'center' | 'right';
  selected?: boolean;
  onSelect?: () => void;
  score: number;
  variation: BrandStateScoreType;
  className?: string;
}

export default function BrandCard({
  name,
  photoUrl,
  score,
  size = 'm',
  orientation = 'left',
  variation = 'equal',
  selected,
  onSelect,
  className = ''
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
      image: 28,
      title: {
        size: 12,
        lineHeight: 14
      }
    },
    l: {
      image: 32,
      title: {
        size: 22,
        lineHeight: 26
      }
    }
  };

  return (
    <div className={classNames(styles.item, selected && styles.selected, className)} onClick={() => onSelect?.()}>
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.effect}
            initial={orientation === 'left' ? {x: '-100%', y: '-100%'} : orientation === 'center' ? {y: '-100%'} : {x: '100%', y: '-100%'}}
            animate={{x: 0, y: 0}}
            exit={orientation === 'left' ? {x: '100%', y: '100%'} : orientation === 'center' ? {y: '100%'} : {x: '-100%', y: '100%'}}
            transition={{duration: 0.25, ease: 'easeInOut'}}
          />
        )}
      </AnimatePresence>
      <div data-id="container" className={styles.container}>
        <div className={styles.top}>
          <img src={photoUrl} width={sizes[size].image} height={sizes[size].image} alt={`${name} logo`} />

          <div className={styles.score}>
            <Typography weight={'regular'} variant={'geist'} size={12} lineHeight={12} textAlign={'center'}>{score}</Typography>
            {renderVariation(variation)}
          </div>
        </div>
        <Typography as={'p'} size={sizes[size].title.size} lineHeight={sizes[size].title.lineHeight} weight={'semiBold'}>{name}</Typography>
      </div>
    </div>
  );
}