import { Brand } from '../../hooks/brands';

/**
 * Enum representing the different types of modal identifiers.
 */
export enum ModalsIds {
  ERROR = 'ERROR',
  BOTTOM_ALERT = 'BOTTOM_ALERT',
  SHARE_BRAND = 'SHARE_BRAND'
}

/**
 * Type representing the mapping of modal identifiers to their respective data structures.
 */
export type ModalData = {
  [ModalsIds.ERROR]: ErrorModalData;
  [ModalsIds.BOTTOM_ALERT]: BottomAlertData;
  [ModalsIds.SHARE_BRAND]: ShareBrandModalData;
};

/**
 * Type representing the base properties for a modal component.
 *
 * @template T - The type of additional properties for the modal.
 * @property {T} - The additional properties for the modal.
 * @property {() => void} handleClose - A function to handle the closing of the modal.
 */
export type BaseModalProps<T> = T & {
  handleClose: () => void;
};

/**
 * Interface representing the state of a modal.
 *
 * @template T - The type of modal identifier.
 * @property {T | null} id - The identifier of the modal, which can be null if no modal is active.
 * @property {ModalData[T] | null} data - The data associated with the modal, which can be null if no modal is active.
 */
export interface ModalState<T extends ModalsIds> {
  id: T | null;
  data: ModalData[T] | null;
}

/**
 * Type representing the data structure for an error modal.
 */
export type ErrorModalData = {
  title: string;
  message: string;
  onRetry?: () => void;
};

/**
 * Type representing the data structure for the share brand modal.
 *
 * @property {string} id - The unique identifier for the brand to be shared.
 */
export type ShareBrandModalData = {
  id: Brand['id'];
}

/**
 * Type representing the data structure for a bottom alert.
 *
 * @property {string} title - The title of the bottom alert.
 * @property {React.ReactNode[] | React.ReactNode} content - The content of the bottom alert, which can be a single React node or an array of React nodes.
 */
export type BottomAlertData = {
  title: string;
  content: React.ReactNode[] | React.ReactNode;
};