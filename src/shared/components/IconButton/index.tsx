// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './IconButton.module.scss';

interface IconButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'solid';
  icon: React.ReactNode,
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'primary',
  icon,
  onClick,
}) => {
  
  return (
    <button className={classNames(styles.layout, styles[variant])} onClick={onClick}>
      <div className={styles.container}>
        {variant === 'primary' && (
          <span className={styles.effect} />
        )}
        <div className={styles.icon}>
          {icon}
        </div>
      </div>
    </button>
  );
};

export default IconButton;
