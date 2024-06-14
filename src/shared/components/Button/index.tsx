// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './Button.module.scss';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  caption: string;
  iconLeft?: React.ReactNode,
  iconRight?: React.ReactNode,
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  caption,
  iconLeft,
  iconRight,
  onClick,
}) => (
  <button className={classNames(styles.layout, styles[variant])} onClick={onClick}>
    {iconLeft && (
      <div className={styles.icon}>
        {iconLeft}
      </div>
    )}
    <div className={styles.caption}>
      {caption}
    </div>
    {iconRight && (
      <div className={styles.icon}>
        {iconRight}
      </div>
    )}
  </button>
);

export default Button;
