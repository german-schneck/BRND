// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './Button.module.scss';
import Typography from '../Typography';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'underline';
  caption: string;
  iconLeft?: React.ReactNode,
  iconRight?: React.ReactNode,
  className?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  caption,
  iconLeft,
  iconRight,
  className = '',
  onClick,
}) => (
  <button className={classNames(styles.layout, styles[variant], className)} onClick={onClick}>
    <div className={styles.container}>
      {variant === 'primary' && (
        <span className={styles.effect} />
      )}
      {iconLeft && (
        <div className={styles.icon}>
          {iconLeft}
        </div>
      )}
      <div className={styles.caption}>
        <Typography variant={'geist'} weight={'medium'} size={16} lineHeight={20}>{caption}</Typography>
      </div>
      {iconRight && (
        <div className={styles.icon}>
          {iconRight}
        </div>
      )}
    </div>
  </button>
);

export default Button;
