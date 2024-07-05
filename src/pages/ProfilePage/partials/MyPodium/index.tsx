// Dependencies
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';

// StyleSheet
import styles from './MyPodium.module.scss';

// Hooks
import { useVoteHistory } from '@/hooks/user';
import { useAuth } from '@/hooks/auth';

// Components
import BrandCard from '@/components/cards/BrandCard';
import Typography from '@/components/Typography';
import IconButton from '@/components/IconButton';

// Utils
import { getBrandScoreVariation } from '@/shared/utils/brand';

// Assets
import ShareIcon from '@/assets/icons/share-icon.svg?react';

function MyPodium() {
  const navigate = useNavigate();
  const [pageId, setPageId] = useState<number>(1);

  const { data: user } = useAuth();
  const { data: history, isFetching, refetch } = useVoteHistory(user?.id ?? '', pageId);

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id, pageId, refetch]);

  /**
   * Handles the scroll event of the list.
   * 
   * @param {React.UIEvent<HTMLDivElement>} e - The scroll event.
   */
  const handleScrollList = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const calc = scrollTop + clientHeight + 50;
    if ((calc) >= scrollHeight && !isFetching && history) {
      const totalItems = Object.keys(history.data).length;
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
                  <BrandCard
                    key={'--podium-key-1'}
                    score={history.data[date].brand1.score}
                    variation={getBrandScoreVariation(history.data[date].brand1.stateScore)}
                    name={history.data[date].brand1.name}
                    photoUrl={history.data[date].brand1.imageUrl}
                    onClick={() => navigate(`/brand/${history.data[date].brand1.id}`)}
                  />
                  <BrandCard
                    key={'--podium-key-2'}
                    score={history.data[date].brand2.score}
                    variation={getBrandScoreVariation(history.data[date].brand2.stateScore)}
                    name={history.data[date].brand2.name}
                    photoUrl={history.data[date].brand2.imageUrl}
                    onClick={() => navigate(`/brand/${history.data[date].brand2.id}`)}
                  />
                  <BrandCard
                    key={'--podium-key-3'}
                    score={history.data[date].brand3.score}
                    variation={getBrandScoreVariation(history.data[date].brand3.stateScore)}
                    name={history.data[date].brand3.name}
                    photoUrl={history.data[date].brand3.imageUrl}
                    onClick={() => navigate(`/brand/${history.data[date].brand3.id}`)}
                  />
                </div>
                <div className={styles.data}>
                  <Typography variant={'geist'} size={14} lineHeight={14} weight={'medium'}>
                    {formatDistanceToNow(new Date(date).getTime(), { addSuffix: true }).includes('hour') ? 'today' : formatDistanceToNow(new Date(date).getTime(), { addSuffix: true })}
                  </Typography>
                  <div className={styles.actions}>
                    <IconButton 
                      variant={'solid'} 
                      className={styles.action} 
                      icon={<ShareIcon />} 
                      onClick={() => navigate(`/vote/${new Date(history.data[date].date).getTime() / 1000}`)} 
                    />
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