// Dependencies
import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// StyleSheet
import styles from './Podium.module.scss';

// Components
import PodiumColumn from './partials/PodiumColumn';
import BrandsList from '../BrandsList';
import Button from '../Button';

// Hooks
import useBottomSheet from '@/hooks/ui/useBottomSheet';
import { Brand } from '@/hooks/brands';

// Assets
import SquareArrowRightIcon from '@/assets/icons/square-arrow-right.svg?react';

interface PodiumProps {
  variant?: 'readonly' | 'selection';
  onVote?: (selected: Brand[]) => void;
  initial?: Brand[];
  isAnimated?: boolean;
}

function Podium({ isAnimated = true, initial = [], onVote, variant = 'selection' }: PodiumProps) {
  const [selected, setSelected] = useState<Brand[]>(initial);
  const { open, close } = useBottomSheet();

  /**
   * Array of animation delays for each podium column.
   * The delays are in seconds and correspond to the order of the columns.
   * @type {number[]}
   */
  const animDelays: number[] = [1.2, 1.6, 1];

  /**
   * Handles the selection of a brand.
   *
   * @param {Brand} brand - The selected brand.
   * @param {number} index - The index of the podium column.
   * @returns {void}
   */
  const handleSelectBrand = useCallback((brand: Brand, index: number): void => {
    setSelected((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = brand;
      return newSelected;
    });
    close();
  }, [close]);

  return (
    <div className={styles.body}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`--podium-key-${i.toString()}`}
          className={styles.column}
          initial={isAnimated ? { opacity: 0, y: 50 } : {}}
          animate={isAnimated ? { opacity: 1, y: 0 } : {}}
          transition={isAnimated ? { duration: 0.1, delay: animDelays[i] || 0, type: 'spring', stiffness: 100 } : {}}
        >
          <PodiumColumn
            variant={'secondary'}
            selected={selected[i]}
            position={i === 0 ? 2 : (i === 1 ? 1 : 3)}
            {...(variant === 'selection' ? {
              onClick: () => {
                open(
                  <div className={styles.selector}>
                    <BrandsList 
                      value={selected.map((brand) => brand?.id)}
                      isSelectable={true}
                      isFinderEnabled={true}
                      config={{
                        limit: 27,
                        order: 'all'
                      }}
                      className={styles.list}
                      onSelect={(brand) => handleSelectBrand(brand, i)}
                    />
                  </div>
                );
              }
            } : {})}
          />
        </motion.div>
      ))}

      {variant === 'selection' && (
        <AnimatePresence>
          {(selected.length === 3) && (
            <motion.div 
              className={styles.footer}
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button 
                iconLeft={(<SquareArrowRightIcon />)} 
                caption={'Let’s go!'} 
                onClick={() => onVote?.(selected)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default Podium;