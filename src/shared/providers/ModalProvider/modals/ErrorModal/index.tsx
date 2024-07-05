// Dependencies
import React from 'react';

// Types
import { BaseModalProps, ErrorModalData } from '../../types';

// StyleSheet
import styles from './ErrorModal.module.scss';

// Components
import BaseModal from '../../components/BaseModal';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

export const ErrorModal: React.FC<BaseModalProps<ErrorModalData>> = ({ title, message, onRetry, handleClose }) => {
  return (
    <div className={styles.layout}>
      <BaseModal>
        <div className={styles.container}>
          <Typography variant={'druk'} weight={'text-wide'} size={16} lineHeight={18}>{title}</Typography>
          <Typography variant={'geist'} size={14} lineHeight={18}>{message}</Typography>

          <div className={styles.actions}>
            <Button variant={onRetry ? 'underline' : 'primary'} caption={'Close'} onClick={handleClose} />
            {onRetry && (
              <Button variant={'primary'} caption={'Retry'} onClick={onRetry} />
            )}
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

