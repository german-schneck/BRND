// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './Typography.module.scss';

interface TypographyProps {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'geist';
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold';
  children: React.ReactNode | string;
  size?: number;
  lineHeight?: number;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const Typography: React.FC<TypographyProps> = ({
  as: Component = 'p', 
  variant = 'geist', 
  weight = 'regular',
  size,
  lineHeight,
  children,
  className = '',
  textAlign = 'left',
}) => (
  <Component 
    className={classNames(styles[variant], styles[weight], styles[textAlign], className)}
    style={{
      ...(size && ({
        fontSize: `${size}px`,
      })),
      ...(lineHeight && ({
        lineHeight: `${lineHeight}px`,
      })),
    }}>
    {children}
  </Component>
);

export default Typography;
