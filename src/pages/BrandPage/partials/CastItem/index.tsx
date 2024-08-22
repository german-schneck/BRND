// Dependencies
import React, { useCallback, useMemo } from 'react';
import classNames from 'clsx';

// StyleSheet
import styles from './CastItem.module.scss';

// Components
import Typography from '@/components/Typography';

// Assets
import CastImage from '@/assets/images/cast-image.png';
import ExternalLinkIcon from '@/assets/icons/external-link-icon.svg?react';

// Utils
import IconButton from '../../../../shared/components/IconButton';

interface CastItemProps {
  user: {
    username: string;
    photoUrl: string;
  };
  url: string;
  message: string;
  attach?: {
    type: 'image' | 'video';
    src: string;
  };
  className?: string;
}

const CastItem: React.FC<CastItemProps> = ({ user, url, message, attach, className }) => {
  const renderAttach = useMemo(() => {
    if (!attach)
      return null;

    switch (attach.type) {
      case 'video':
      case 'image':
      default:
        return (
          <img src={attach.src} className={styles.image} alt={`${attach.src}`} />
        ); 
    }

  }, [attach]);
  
  /**
   * Opens the provided URL in a new tab.
   *
   * @callback handleClickExternalLink
   */
  const handleClickExternalLink = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return (
    <div className={classNames(styles.layout, className)}>
      <div className={styles.header}>
        <img src={user.photoUrl} alt={user.username} width={40} height={40} className={styles.avatar} />
        <Typography as={'h2'} variant={'geist'} weight={'bold'} size={14} lineHeight={18} className={styles.title}>
          <span>
            {user.username}
          </span>
          <img src={CastImage} alt={'brand verified'} width={12} height={12} />
        </Typography>
        <IconButton variant={'solid'} className={styles.external} icon={<ExternalLinkIcon />} onClick={handleClickExternalLink} />
      </div>
      <div className={styles.body}>
        <Typography as={'p'} variant={'geist'} weight={'regular'} size={14} lineHeight={18}>{message}</Typography>

        {renderAttach}
      </div>
    </div>
  );
};

export default CastItem;
