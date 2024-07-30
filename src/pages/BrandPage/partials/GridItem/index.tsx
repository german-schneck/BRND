// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './GridItem.module.scss';

// Components
import Typography from '@/components/Typography';

interface GridItemProps {
  variant?: 'primary' | 'green' | 'red' | 'blue';
  title?: string;
  children: React.ReactNode;
  className?: string;
  rightElement?: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ variant = 'primary', children, className, rightElement, title }) => {
  return (
    <div className={classNames(styles.layout, styles[variant], className)}>
      <div className={styles.container}>
        <div className={styles.header}>
          {title && (
            <Typography as={'h5'} variant={'druk'} weight={'text-wide'} size={10} lineHeight={12} className={styles.title}>{title}</Typography>
          )}
          {rightElement && (
            <div className={styles.right}>
              {rightElement}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default GridItem;
