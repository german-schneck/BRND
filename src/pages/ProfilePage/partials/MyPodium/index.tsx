// Dependencies
import {useEffect, useState} from 'react';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';

// StyleSheet
import styles from './MyPodium.module.scss';

// Hooks
import {useVoteHistory} from '@/hooks/user';
import {useAuth} from '@/hooks/auth';

// Components
import BrandCard from '@/components/cards/BrandCard';
import Typography from '@/components/Typography';
import IconButton from '@/components/IconButton';

// Utils
import {getBrandScoreVariation} from '@/shared/utils/brand';

// Assets
import ShareIcon from '@/assets/icons/share-icon.svg?react';

function MyPodium() {
  const [pageId, setPageId] = useState<number>(1);

  const {data: user} = useAuth();
  const {data: history, isFetching, refetch} = useVoteHistory(user && user.id || '', pageId);

  useEffect(() => {
    if (user && user.id) {
      refetch();
    }
  }, [user?.id, pageId]);

  const handleScrollList = (e: React.UIEvent<HTMLDivElement>) => {
    const {scrollTop, scrollHeight, clientHeight} = e.currentTarget;
    const calc = scrollTop + clientHeight + 50;
    if ((calc) >= scrollHeight && !isFetching && history) {
      const totalItems = Object.values(history.data).reduce((acc, curr) => acc + curr.length, 0);
      if (totalItems < history.count) {
        setPageId(pageId + 1);
      }
    }
  };
  
  return (
    <div className={styles.layout}>
      {history && (
        <div className={styles.view} onScroll={handleScrollList}>
          <ul className={styles.list}>
            {Object.keys(history.data).map((date, index) => (
              <li key={`--podium-key-${index.toString()}`} className={styles.item}>
                <div className={styles.brands}>
                  {history.data[date].map((vote, i) => (
                    <BrandCard
                      key={`--podium-key-${i.toString()}`}
                      score={vote.brand.score}
                      variation={getBrandScoreVariation(vote.brand.stateScore)}
                      name={vote.brand.name}
                      photoUrl={vote.brand.imageUrl}
                    />
                  ))}
                </div>
                <div className={styles.data}>
                  <Typography variant={'geist'} size={14} lineHeight={14} weight={'medium'}>
                    {formatDistanceToNow(new Date(date).getTime(), {addSuffix: true}).includes('hour') ? 'today' : formatDistanceToNow(new Date(date).getTime(), {addSuffix: true})}
                  </Typography>
                  <div className={styles.actions}>
                    <IconButton variant={'solid'} className={styles.action} icon={<ShareIcon />} onClick={() => {}}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyPodium;