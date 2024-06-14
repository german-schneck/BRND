// Dependencies
import {motion, AnimatePresence} from 'framer-motion';

// Hooks
import useBottomSheet from '@hooks/ui/useBottomSheet';

// StyleSheet
import styles from './BottomSheetManager.module.scss';

export default function BottomSheetManager() {
  const {component, close} = useBottomSheet();

  return (
    <AnimatePresence>
      {component && (
        <motion.div className={styles.backdrop} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <motion.div
            initial={{opacity: 0, y: 300}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 300}}
            drag="y"
            dragConstraints={{top: 0, bottom: 50}}
            onDragEnd={(_, info) => {
              if (info.offset.y > 0) {
                void close();
              }
            }}
            className={styles.container}
          >
            {component}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
