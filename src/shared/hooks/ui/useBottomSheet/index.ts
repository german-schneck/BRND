// Dependencies
import { create } from 'zustand';

interface UseBottomSheet {
  component: React.ReactNode | null;
  open: (component: React.ReactNode) => void;
  close: () => void;
}

/**
 * Custom hook for managing the visibility of a bottom sheet component.
 */
const useBottomSheet = create<UseBottomSheet>((set) => ({
  /**
   * The current component displayed in the bottom sheet.
   * @type {React.ReactNode | null}
   */
  component: null,

  /**
   * Opens the bottom sheet with the specified component.
   * @param {React.ReactNode} component - The React component to display.
   */
  open: (component: React.ReactNode) => set(() => ({ component })),

  /**
   * Closes the bottom sheet and clears the current component.
   */
  close: () => set(() => ({
    component: null
  }))
}));

export default useBottomSheet;

