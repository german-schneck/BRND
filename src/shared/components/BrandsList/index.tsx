// Dependencies
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'clsx';
import { useNavigate } from 'react-router-dom';

// Components
import SearchInput from '@/components/SearchInput';
import BrandCard from '@/components/cards/BrandCard';
import Button from '@/components/Button';
import LoaderIndicator from '../LoaderIndicator';
import Typography from '../Typography';

// StyleSheet
import styles from './BrandsList.module.scss';

// Assets
import CheckLabelIcon from '@/assets/icons/check-label-icon.svg?react';

// Hooks
import { Brand, useClaimBrand, useBrandList } from '@/hooks/brands';
import useBottomSheet from '@/hooks/ui/useBottomSheet';

// Utils
import { getBrandScoreVariation } from '@/utils/brand';

interface BrandsListProps {
  readonly value?: Brand['id'][];
  readonly config?: {
    order: 'new' | 'top' | 'all';
    limit: number;
  },
  readonly className?: string;
  readonly isFinderEnabled?: boolean;
  readonly isSelectable?: boolean;
  readonly onSelect?: (brand: Brand) => void;
}

export default function BrandsList({
  value = [],
  className = '', 
  onSelect, 
  config = {
    order: 'all', 
    limit: 27
  }, 
  isFinderEnabled = true, 
  isSelectable = false
}: BrandsListProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selected, setSelected] = useState<Brand | null>(null);
  const [pageId, setPageId] = useState<number>(1);
  const claimBrand = useClaimBrand();
  const bottomSheet = useBottomSheet();
  
  const { data, isLoading, isFetching, refetch } = useBrandList(config.order, searchQuery, pageId, config.limit);

  /**
   * Handles the scroll event for the brand list.
   * If the user scrolls to the bottom of the list, it fetches the next page of brands.
   * @param {React.UIEvent<HTMLDivElement>} e - The scroll event.
   */
  const handleScrollList = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const calc = scrollTop + clientHeight + 50;
    if ((calc) >= scrollHeight && !isFetching) {
      if (data.brands.length < data.count) {
        setPageId(pageId + 1);
      }
    }
  };

  /**
   * Handles the click event for claiming a brand.
   * Initiates the claim brand mutation with the current search query.
   * 
   * @callback handleClickClaimBrand
   * @returns {void}
   */
  const handleClickClaimBrand = useCallback(() => {
    claimBrand.mutate({
      name: searchQuery
    }, {
      onSuccess: () => {
        bottomSheet.close();
        navigate('/claimed');
      },
      onError: (error) => {
        console.error('Error claiming brand:', error);
      }
    });
  }, [searchQuery, claimBrand]);

  useEffect(() => {
    refetch();
  }, [pageId, searchQuery]);
  
  useEffect(() => {
    setPageId(1);
    if (selected) {
      setSelected(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Disable scroll on body when component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll on body when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const renderList = () => (
    data.brands.length > 0 ? (
      <div onScroll={handleScrollList} className={classNames(styles.scroll, className)}>
        <ul className={styles.list}>
          {data.brands.map((brand, index) => (
            <li key={`--brand-item-${index.toString()}`}>
              <BrandCard
                name={brand.name}
                photoUrl={brand.imageUrl}
                orientation={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
                score={brand.score}
                variation={getBrandScoreVariation(brand.stateScore)}
                disabled={!!value.find(e => e === brand.id)}

                {...(isSelectable ? {
                  selected: selected?.id === brand.id,
                  onClick: () => setSelected(selected?.id === brand.id ? null : brand)
                } : {
                  onClick: () => navigate(`/brand/${brand.id}`)
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className={styles.empty}>
        <Typography variant={'geist'} as={'p'} size={18} lineHeight={22}>It is not in our database at the moment, would you like to add it?</Typography>
        <Button caption={'Claim brand'} onClick={handleClickClaimBrand} />
      </div>
    )
  );

  return (
    <div className={styles.layout}>
      {isFinderEnabled && (
        <div className={styles.header}>
          <SearchInput onChangeText={setSearchQuery} />
        </div>
      )}
      {isLoading ? (
        <div className={styles.loader}>
          <LoaderIndicator size={32} />
        </div>
      ) : (
        renderList()       
      )}
      {isSelectable && (
        <AnimatePresence>
          {selected && (
            <motion.div 
              className={styles.footer}
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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