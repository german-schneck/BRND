// Dependencies
import {Outlet} from 'react-router-dom';

// Providers
import {BottomSheetProvider} from './BottomSheetProvider';
import {ModalProvider} from './ModalProvider';

/**
 * AppProvider component that wraps the application with necessary providers.
 *
 * @returns {JSX.Element} The wrapped child components with BottomSheetProvider and ModalProvider.
 */
export function AppProvider(): JSX.Element {
  return (
    <BottomSheetProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </BottomSheetProvider>
  );
}