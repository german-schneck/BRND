// Dependencies
import React from 'react';

// StyleSheet
import styles from './LoaderIndicator.module.scss';

interface LoaderIndicatorProps {
  variant: 'default' | 'fullscreen';
}

const LoaderIndicator: React.FC<LoaderIndicatorProps> = ({variant = 'default'}) => {
  return (
    <div className={styles[variant]}>
      <div className={styles.loader} />
    </div>
  );
};

export default LoaderIndicator;
