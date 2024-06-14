// Dependencies
import classNames from 'clsx';

// StyleSheet
import styles from './PodiumColumn.module.scss';

// Components
import Typography from '@components/Typography';

// Assets
import AddIcon from '../../../../assets/icons/add.svg?react';

interface PodiumColumnProps {
  variant: 'primary' | 'secondary';
  position: number;
  onClick: () => void;
}

export default function PodiumColumn({variant, position, onClick}: PodiumColumnProps) {
  return (
    <div className={classNames(styles.body, styles[variant])}>
      <button className={styles.brand} onClick={onClick}>
        <AddIcon />
      </button>
      <Typography size={80} lineHeight={100} weight={'bold'} className={styles.number} textAlign={'center'}>{position}</Typography>
    </div>
  );
}