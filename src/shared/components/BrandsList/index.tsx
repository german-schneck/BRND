// Dependencies
import {useEffect, useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import classNames from 'clsx';

// Components
import SearchInput from '@/components/SearchInput';
import BrandCard from '@/components/cards/BrandCard';
import Button from '@/components/Button';
import LoaderIndicator from '../LoaderIndicator';

// StyleSheet
import styles from './BrandsList.module.scss';

// Assets
import CheckLabelIcon from '@/assets/icons/check-label-icon.svg?react';

// Hooks
import {Brand, useBrandList} from '@/hooks/brands';

// Utils
import {getBrandScoreVariation} from '@/utils/brand';

interface BrandsListProps {
  config?: {
    order: 'new' | 'trending' | 'all';
    limit: number;
  },
  className?: string;
  isFinderEnabled?: boolean;
  isSelectable?: boolean;
  onSelect?: (brand: Brand) => void;
}

export default function BrandsList({
  className = '', 
  onSelect, 
  config = {
    order: 'all', 
    limit: 27
  }, 
  isFinderEnabled = true, 
  isSelectable = false
}: BrandsListProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selected, setSelected] = useState<Brand | null>(null);
  const [pageId, setPageId] = useState<number>(1);
  
  const {data, isLoading, isFetching, refetch} = useBrandList(searchQuery, pageId, config.order, config.limit);

  /**
   * Memoized list of brands derived from the data object.
   * @returns {Brand[]} Array of brand objects.
   */
  const brands = useMemo(() => Object.values(data.brands), [data.brands]);

  /**
   * Handles the scroll event for the brand list.
   * If the user scrolls to the bottom of the list, it fetches the next page of brands.
   * @param {React.UIEvent<HTMLDivElement>} e - The scroll event.
   */
  const handleScrollList = (e: React.UIEvent<HTMLDivElement>) => {
    const {scrollTop, scrollHeight, clientHeight} = e.currentTarget;
    const calc = scrollTop + clientHeight + 50;
    if ((calc) >= scrollHeight && !isFetching) {
      if (Object.keys(data.brands).length < data.count) {
        setPageId(pageId + 1);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [pageId, searchQuery]);
  
  useEffect(() => {
    setPageId(1);
  }, [searchQuery]);

  return (
    <div className={styles.layout}>
      {isFinderEnabled && (
        <div className={styles.header}>
          <SearchInput onChangeText={setSearchQuery} />
        </div>
      )}
      {!data || isLoading ? (
        <div className={styles.loader}>
          <LoaderIndicator size={32} />
        </div>
      ) : (
        <div onScroll={handleScrollList} className={classNames(styles.scroll, className)}>
          <ul className={styles.list}>
            {brands.map((brand, index) => (
              <li key={`--brand-item-${index.toString()}`}>
                <BrandCard
                  name={brand.name}
                  photoUrl={brand.imageUrl}
                  orientation={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
                  score={brand.score}
                  variation={getBrandScoreVariation(brand.stateScore)}

                  {...(isSelectable && {
                    selected: selected?.id === brand.id,
                    onSelect: () => setSelected(selected?.id === brand.id ? null : brand)
                  })}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSelectable && (
        <AnimatePresence>
          {selected && (
            <motion.div 
              className={styles.footer}
              initial={{y: 300}}
              animate={{y: 0}}
              exit={{y: 300}}
              transition={{type: 'spring', stiffness: 300, damping: 20}}
            >
              <Button 
                iconLeft={(<CheckLabelIcon />)} 
                caption={'Confirm'} 
                onClick={() => onSelect?.(selected)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}