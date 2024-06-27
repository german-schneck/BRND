// Dependencies
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

// Components
import SearchInput from './partials/SearchInput';
import BrandItem from './partials/BrandItem';
import Button from '@/components/Button';

// StyleSheet
import styles from './BrandSelector.module.scss';

// Assets
import SaveIcon from '@/assets/icons/save.svg?react';

// Hooks
import {useBrandList} from '../../hooks/brands';
import LoaderIndicator from '../LoaderIndicator';

interface BrandSelectorProps {
  readonly onSelect: (id: number) => void;
}

export default function BrandSelector({onSelect}: BrandSelectorProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {data, isLoading, isFetching} = useBrandList(searchQuery);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <SearchInput onChangeText={setSearchQuery} />
      </div>
      {!data || isLoading || isFetching ? (
        <div className={styles.loader}>
          <LoaderIndicator size={32} />
        </div>
      ) : (
        <div className={styles.scroll}>
          <ul className={styles.list}>
            {(data.brands).map((brand, index) => (
              <li key={`--brand-item-${index.toString()}`}>
                <BrandItem
                  photoUrl={brand.imageUrl}
                  name={brand.name}
                  orientation={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
                  selected={selected === brand.id}
                  onSelect={() => setSelected(selected === brand.id ? null : brand.id)}
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
              iconLeft={(<SaveIcon />)} 
              caption={'Save'} 
              onClick={() => onSelect(selected)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}