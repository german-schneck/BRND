// Dependencies
import React from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './Typography.module.scss';

// Types
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  as: Component = 'p', 
  variant = 'geist', 
  weight = variant === 'druk' ? 'wide' : 'regular',
  size = undefined,
  lineHeight = undefined,
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
