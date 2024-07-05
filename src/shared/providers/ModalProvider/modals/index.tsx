// Types
import { ModalsIds } from '../types';

// Modals
import { ErrorModal } from './ErrorModal';
import { BottomAlertModal } from './BottomAlertModal';

export const modals = {
  [ModalsIds.ERROR]: ErrorModal,
  [ModalsIds.BOTTOM_ALERT]: BottomAlertModal
};

