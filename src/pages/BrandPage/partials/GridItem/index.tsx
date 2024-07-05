// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './GridItem.module.scss';

// Components
import Typography from '@/components/Typography';

interface GridItemProps {
  variant?: 'primary' | 'green';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ variant = 'primary', children, className, title }) => {
  return (
    <div className={classNames(styles.layout, styles[variant], className)}>
      <div className={styles.container}>
        {title && (
          <Typography as={'h5'} variant={'druk'} weight={'text-wide'} size={10} lineHeight={12} className={styles.title}>{title}</Typography>
        )}
        {children}
      </div>
    </div>
  );
};

export default GridItem;
