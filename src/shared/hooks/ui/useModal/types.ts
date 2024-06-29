/**
 * Enum representing the different types of modal identifiers.
 */
export enum ModalsIds {
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

/**
 * Type representing the data structure for an error modal.
 */
type ErrorModalData = {
  title: string;
  message: string;
}

/**
 * Type representing the data structure for a warning modal.
 */
type WarningModalData = {
  title: string;
  message: string;
}

/**
 * Type representing the mapping of modal identifiers to their respective data structures.
 */
export type ModalData = {
  [ModalsIds.ERROR]: ErrorModalData;
  [ModalsIds.WARNING]: WarningModalData;
}

export interface ModalState<T extends ModalsIds> {
  id: T | null;
  data: ModalData[T] | null;
}