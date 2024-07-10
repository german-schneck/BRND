// Dependencies
import classNames from 'clsx';

// StyleSheet
import styles from './PodiumColumn.module.scss';

// Components
import Typography from '@/components/Typography';

// Assets
import AddIcon from '@/assets/icons/add-solid.svg?react';
import BPointIcon from '@/assets/icons/point-b.svg?react';

// Hooks
import { Brand } from '@/hooks/brands';

interface PodiumColumnProps {
  variant: 'primary' | 'secondary';
  position: number;
  selected?: Brand;
  onClick?: () => void;
}

export default function PodiumColumn({ variant, selected, position, onClick }: Readonly<PodiumColumnProps>) {

  /**
   * A mapping of podium positions to their respective points.
   * @type {Record<number, string>}
   */
  const points: Record<number, string> = {
    1: '60',
    2: '30',
    3: '10'
  };

  return (
    <div className={classNames(styles.body, styles[variant], selected && styles.selected)}>
      {selected ? (
        <button className={styles.field} onClick={onClick}>
          <div className={styles.image}>
            <img src={selected.imageUrl} alt={selected.name} />
          </div>
          <Typography variant={'geist'} textAlign={'center'} className={styles.name} size={14} weight={'bold'}>{selected.name}</Typography>
        </button>
      ) : (
        <button className={styles.brand} onClick={onClick}>
          <AddIcon />
        </button>
      )}
      <div>
        <Typography size={64} variant={'druk'} lineHeight={80} weight={'wide'} className={styles.number} textAlign={'center'}>{position}</Typography>
        {selected && (
          <div className={styles.points}>
            <Typography size={16} lineHeight={20} weight={'bold'} textAlign={'center'}>{points[position]}</Typography>
            <BPointIcon width={14} height={14} />
          </div>
        )}
      </div>
    </div>
  );
}