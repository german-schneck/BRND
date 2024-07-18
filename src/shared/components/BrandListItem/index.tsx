import React from 'react';
import classNames from 'clsx';

interface BrandListItem {
  name: string;
  photoUrl: string;
  score: number;
  position: number;
  variation: 'up' | 'down' | 'equal';
  onClick: () => void;
}

// StyleSheet
import styles from './BrandListItem.module.scss';

// Components
import Typography from '../Typography';

// Assets
import ScoreUpDownIcon from '@/assets/icons/score-updown-icon.svg?react';
import ScoreEqualIcon from '@/assets/icons/score-equal-icon.svg?react';

export const BrandListItem: React.FC<BrandListItem> = ({ name, photoUrl, position, score, variation, onClick }) => {
  /**
   * Renders the variation icon based on the provided variation type.
   * @param {BrandCardProps['variation']} variation - The variation type ('equal', 'up', 'down').
   * @returns {JSX.Element} The rendered variation icon.
   */
  const renderVariation = (variation: BrandListItem['variation']): JSX.Element => {
    const iconClass = styles[variation];
    const IconComponent = variation === 'equal' ? ScoreEqualIcon : ScoreUpDownIcon;
  
    return (
      <div className={iconClass}>
        <IconComponent />
      </div>
    );
  };

  return (
    <button onClick={onClick} className={styles.layout}>
      <Typography size={14} lineHeight={14} className={styles.position}>{position}</Typography>
      <div className={styles.row}>
        <img className={styles.img} src={photoUrl} width={32} height={32} />
        <Typography size={14} lineHeight={18}>{name}</Typography>
      </div>
      <div className={classNames(styles.row, styles.score)}>
        <Typography size={14} lineHeight={14}>{score}</Typography>
        {renderVariation(variation)}
      </div>
    </button>
  );
};
