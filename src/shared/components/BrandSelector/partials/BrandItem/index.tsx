// Dependencies
import classNames from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';

// StyleSheet
import styles from './BrandItem.module.scss';

// Components
import Typography from '../../../Typography';

interface BrandItemProps {
  name: string;
  photoUrl: string;
  orientation?: 'left' | 'center' | 'right';
  selected?: boolean;
  onSelect?: () => void;
}

export default function BrandItem({
  name,
  photoUrl,
  orientation = 'left',
  selected,
  onSelect,
}: BrandItemProps) {
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
        </div>
        <Typography as={'span'} size={12} lineHeight={14} weight={'semiBold'}>{name}</Typography>
      </div>
    </div>
  );
}