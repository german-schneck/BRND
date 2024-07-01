// Dependencies
import React from 'react';
import classNames from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';

// StyleSheet
import styles from './BrandCard.module.scss';

// Components
import Typography from '../../Typography';

// Assets
import ScoreUpDownIcon from '@/assets/icons/score-updown-icon.svg?react';
import ScoreEqualIcon from '@/assets/icons/score-equal-icon.svg?react';

interface BrandCardProps {
  name: string;
  photoUrl: string;
  orientation?: 'left' | 'center' | 'right';
  selected?: boolean;
  onSelect?: () => void;
  score: number;
  variation: 'equal' | 'up' | 'down';
}

export default function BrandCard({
  name,
  photoUrl,
  orientation = 'left',
  score,
  variation = 'equal',
  selected,
  onSelect,
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

  return (
    <div className={classNames(styles.item, selected && styles.selected)} onClick={() => onSelect?.()}>
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
      <div className={styles.container}>
        <div className={styles.top}>
          <img src={photoUrl} width={28} height={28} alt={`${name} logo`} />

          <div className={styles.score}>
            <Typography weight={'regular'} variant={'geist'} size={12} lineHeight={12} textAlign={'center'}>{score}</Typography>
            {renderVariation(variation)}
          </div>
        </div>
        <Typography as={'p'} size={12} lineHeight={14} weight={'semiBold'}>{name}</Typography>
      </div>
    </div>
  );
}