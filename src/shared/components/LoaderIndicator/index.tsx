// Dependencies
import React from 'react';

// StyleSheet
import styles from './LoaderIndicator.module.scss';

interface LoaderIndicatorProps {
  variant?: 'default' | 'fullscreen';
  size?: number;
}

const LoaderIndicator: React.FC<LoaderIndicatorProps> = ({variant = 'default', size = 48}) => {
  return (
    <div className={styles[variant]}>
      <div className={styles.loader} style={{width: `${size}px`, height: `${size}px`}} />
    </div>
  );
};

export default LoaderIndicator;
