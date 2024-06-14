// Dependencies
import {useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useClickAway} from 'react-use';

// Hooks
import useBottomSheet from '@hooks/ui/useBottomSheet';

// StyleSheet
import styles from './BottomSheetManager.module.scss';

export default function BottomSheetManager() {
  const componentRef = useRef<HTMLDivElement>(null);
  const {component, close} = useBottomSheet();

  useClickAway(componentRef, () => {
    void close();
  });

  return (
    <AnimatePresence>
      {component && (
        <motion.div className={styles.backdrop} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <motion.div
            ref={componentRef}
            initial={{opacity: 0, y: 300}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 300}}
            drag="y"
            dragConstraints={{top: 0, bottom: 0}}
            onDragEnd={(_, info) => {
              if (info.offset.y > 200)
                void close();
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
