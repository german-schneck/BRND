// Dependencies
import {create} from 'zustand';
import {ModalData, ModalState, ModalsIds} from './types';

/**
 * The initial state for the modal.
 * 
 * @type {ModalState<ModalsIds>}
 * @property {ModalsIds | null} id - The identifier for the modal, initially set to null.
 * @property {ModalData[ModalsIds] | null} data - The data associated with the modal, initially set to null.
 */
const initialState: ModalState<ModalsIds> = {
  id: null,
  data: null,
};

/**
 * Custom hook for managing modals.

 * Provides functionality to open and close modals with associated data.
 * 
 * @returns {object} The modal state and control methods.
 */
const useModal = create((set) => ({
  id: null, // The current modal identifier, initially null.
  data: null, // The data associated with the current modal, initially null.

  /**
   * Opens a modal with specified identifier and data.
   * 
   * @param {K} id - The identifier of the modal to open.
   * @param {ModalData[K]} data - The data to associate with the modal.
   */
  openModal: <K extends ModalsIds>(id: K, data: ModalData[K]) => set(() => ({id, data})),

  /**
   * Closes the currently open modal and resets the state.
   */
  closeModal: () => set(() => ({...initialState}))
}));

export default useModal;

