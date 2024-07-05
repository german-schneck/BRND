// Types
import {BaseModalProps, ModalData, ModalsIds} from '../types';

// Modals
import {ErrorModal} from './ErrorModal';

/**
 * A record of modal components mapped by their respective modal IDs.
 *
 * @type {Record<ModalsIds, React.FC<BaseModalProps<ModalData[ModalsIds]>>>}
 */
export const modals: Record<ModalsIds, React.FC<BaseModalProps<ModalData[ModalsIds]>>> = {
  [ModalsIds.ERROR]: ErrorModal,
};

