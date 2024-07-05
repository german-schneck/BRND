// Dependecies
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Types
import { BaseModalProps, ModalData, ModalsIds } from './types';

// Hooks
import { useModal } from '@/hooks/ui/useModal';

// Modals
import { modals } from './modals';

// StyleSheet
import styles from './ModalProvider.module.scss';

// * * * * * * * * * * * * *

/**
 * Properties for the ModalLayout component.
 *
 * @interface ModalLayoutProps
 * @property {React.ReactNode} children - The child components to be rendered within the ModalLayout.
 */
interface ModalLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * ModalProvider component that provides modal functionality to its children.
 *
 * @param {ModalLayoutProps} props - The properties for the ModalProvider component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the ModalProvider.
 * @returns {JSX.Element} The rendered ModalProvider component.
 */
export const ModalProvider: React.FC<ModalLayoutProps> = ({ children }) => {
  const { id, data, closeModal: handleClose } = useModal();

  /**
   * Determines the modal content based on the current modal id.
   * If no modal id is present, it returns null.
   *
   * @constant
   * @type {(React.FC<BaseModalProps<ModalData[ModalsIds]>> | null)}
   */
  const ModalContent = id ? (modals as Record<ModalsIds, React.FC<BaseModalProps<ModalData[ModalsIds]>>>)[id] : null;

  return (
    <>
      <AnimatePresence>
        {id && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <div className={styles.container}>
              {ModalContent && id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.25 }}>
                  <ModalContent {...(data as BaseModalProps<ModalData[typeof id]>)} handleClose={handleClose} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

