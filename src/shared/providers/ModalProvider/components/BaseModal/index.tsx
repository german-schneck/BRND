// Dependencies
import React from 'react';

// StyleSheet
import styles from './BaseModal.module.scss';

// Components
import IconButton from '@/components/IconButton';

// Assets
import CloseIcon from '@/assets/icons/close-icon.svg?react';

interface BaseModalProps {
  readonly onClose?: () => void;
  readonly children: React.ReactNode;
}

export default function BaseModal({ children, onClose }: BaseModalProps) {
  return (
    <div className={styles.layout}>
      {onClose && (
        <IconButton variant={'solid'} icon={<CloseIcon />} onClick={onClose} className={styles.closeBtn} />
      )}
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}