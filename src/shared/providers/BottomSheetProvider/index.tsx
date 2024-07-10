// Dependencies
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';

// Hooks
import useBottomSheet from '@/hooks/ui/useBottomSheet';

// StyleSheet
import styles from './BottomSheetProvider.module.scss';

interface BottomSheetProviderProps {
  readonly children: React.ReactElement;
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { component, close } = useBottomSheet();

  useClickAway(componentRef, () => {
    close();
  });

  return (
    <>
      <AnimatePresence>
        {component && (
          <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              ref={componentRef}
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 300 }}
              className={styles.container}
            >
              {component}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

