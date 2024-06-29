// Dependencies
import {useEffect, useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

// Components
import SearchInput from './partials/SearchInput';
import BrandItem from './partials/BrandItem';
import Button from '@/components/Button';
import LoaderIndicator from '../LoaderIndicator';

// StyleSheet
import styles from './BrandSelector.module.scss';

// Assets
import CheckLabelIcon from '@/assets/icons/check-label-icon.svg?react';

// Hooks
import {Brand, useBrandList} from '../../hooks/brands';

interface BrandSelectorProps {
  onSelect: (brand: Brand) => void;
}

export default function BrandSelector({onSelect}: BrandSelectorProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selected, setSelected] = useState<Brand | null>(null);
  const [pageId, setPageId] = useState<number>(1);
  
  const {data, isLoading, isFetching, refetch} = useBrandList(searchQuery, pageId);

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
      console.log('Scrolled to the bottom');
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
      <div className={styles.header}>
        <SearchInput onChangeText={setSearchQuery} />
      </div>
      {!data || isLoading ? (
        <div className={styles.loader}>
          <LoaderIndicator size={32} />
        </div>
      ) : (
        <div onScroll={handleScrollList} className={styles.scroll}>
          <ul className={styles.list}>
            {brands.map((brand, index) => (
              <li key={`--brand-item-${index.toString()}`}>
                <BrandItem
                  name={brand.name}
                  photoUrl={brand.imageUrl}
                  orientation={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
                  selected={selected?.id === brand.id}
                  onSelect={() => setSelected(selected?.id === brand.id ? null : brand)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
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
              onClick={() => onSelect(selected)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}