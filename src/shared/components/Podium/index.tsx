// Dependencies
import {useCallback} from 'react';
import {motion} from 'framer-motion';

// StyleSheet
import styles from './Podium.module.scss';

// Components
import PodiumColumn from './partials/PodiumColumn';
import BrandSelector from '../BrandSelector';

// Hooks
import useBottomSheet from '@hooks/ui/useBottomSheet';

function Podium() {
  const {open} = useBottomSheet();

  /**
   * Array of animation delays for each podium column.
   * The delays are in seconds and correspond to the order of the columns.
   * @type {number[]}
   */
  const animDelays: number[] = [1.2, 1.6, 1];

  /**
   * Handles the click event on a podium column.
   * Opens the BrandSelector component using the bottom sheet modal.
   */
  const handleClickColumn = useCallback(() => {
    void open(<BrandSelector />);
  }, [open]);

  return (
    <div className={styles.body}>
      {Array.from({length: 3}).map((_, i) => (
        <motion.div
          key={`--podium-key-${i.toString()}`}
          className={styles.column}
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}          
          transition={{duration: 0.1, delay: animDelays[i] || 0, type: 'spring', stiffness: 100}}
        >
          <PodiumColumn
            variant={'secondary'}
            position={i === 0 ? 2 : (i === 1 ? 1 : 3)}
            onClick={handleClickColumn}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Podium;