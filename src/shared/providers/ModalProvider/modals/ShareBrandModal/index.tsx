// Dependencies
import React, { useCallback, useState } from 'react';

// Types
import { BaseModalProps, ShareBrandModalData } from '../../types';

// StyleSheet
import styles from './ShareBrandModal.module.scss';

// Components
import BaseModal from '../../components/BaseModal';
import Typography from '@/components/Typography';
import IconButton from '../../../../components/IconButton';

import { RiCheckLine, RiClipboardLine } from 'react-icons/ri';

export const ShareBrandModal: React.FC<BaseModalProps<ShareBrandModalData>> = ({ id, handleClose }) => {
  const [isLinkCopied, setLinkCopied] = useState<boolean>(false);

  const link = `${import.meta.env.VITE_APP_HOST}/brand/${id}`;

  const handleClickCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
    }).catch(err => {
      console.error('Failed to copy the link: ', err);
    });
  }, []);
  
  return (
    <div className={styles.layout}>
      <BaseModal onClose={handleClose}>
        <div className={styles.container}>
          <Typography variant={'druk'} weight={'text-wide'} size={16} lineHeight={18}>Share Brand</Typography>

          <div className={styles.link}>
            <div className={styles.field}>
              <Typography variant={'geist'} weight={'regular'} size={14} lineHeight={16}>{link}</Typography>
            </div>
            <IconButton className={styles.copyBtn} icon={isLinkCopied ? <RiCheckLine /> : <RiClipboardLine />} onClick={handleClickCopyToClipboard} />
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

