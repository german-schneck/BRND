// Dependencies
import React from 'react';

// StyleSheet
import styles from './BaseModal.module.scss';

interface BaseModalProps {
  readonly children: React.ReactNode;
}

export default function BaseModal({ children }: BaseModalProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}