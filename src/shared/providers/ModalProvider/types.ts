/**
 * Enum representing the different types of modal identifiers.
 */
export enum ModalsIds {
  ERROR = 'ERROR',
}

/**
 * Type representing the mapping of modal identifiers to their respective data structures.
 */
export type ModalData = {
  [ModalsIds.ERROR]: ErrorModalData;
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