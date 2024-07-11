// Dependencies
import React from 'react';

// Types
import { BaseModalProps, BottomAlertData } from '../../types';

// StyleSheet
import styles from './BottomAlertModal.module.scss';

// Components
import BaseModal from '../../components/BaseModal';
import Typography from '@/components/Typography';

export const BottomAlertModal: React.FC<BaseModalProps<BottomAlertData>> = ({ title, content, handleClose }) => {
  return (
    <div className={styles.layout}>
      <BaseModal onClose={handleClose}>
        <div className={styles.container}>
          <Typography variant={'druk'} weight={'text-wide'} size={16} lineHeight={18}>{title}</Typography>
          {content}
        </div>
      </BaseModal>
    </div>
  );
};

