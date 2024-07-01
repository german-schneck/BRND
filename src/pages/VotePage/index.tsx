// Dependencies
import React, {useCallback, useState} from 'react';
import {Navigate} from 'react-router-dom';

// Components
import PodiumView from './partials/PodiumView';
import ShareView from './partials/ShareView';
import CongratsView from './partials/CongratsView';

// Types
import {VotingViewEnum} from './types';

// Hooks
import {Brand} from '@/hooks/brands';
import {useAuth} from '@/hooks/auth';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';

function VotePage(): React.ReactNode {
  const [view, setView] = useState<[VotingViewEnum, Brand[]]>([VotingViewEnum.PODIUM, []]);
  const {data} = useAuth();

  /**
   * Navigates to a different view based on the provided id and selection.
   *
   * @param {VotingViewEnum} id - The id of the view to navigate to.
   * @param {Brand[]} selection - The selection of brands for the view.
   */
  const navigateToView = useCallback((id: VotingViewEnum, selection: Brand[]) => setView([id, selection]), [setView]);

  /**
   * Object containing the properties to be passed to the child components.
   *
   * @property {Function} navigateToView - Function to navigate to a different view.
   * @property {VotingViewEnum} currentView - The current view being displayed.
   * @property {Brand[]} currentBrands - The current selection of brands.
   */
  const mapToProps = {
    navigateToView,
    currentView: view[0],
    currentBrands: view[1],
  };

  /**
   * Renders the appropriate view based on the current state.
   * 
   * @returns {React.ReactNode} The component to be rendered.
   */
  const renderView = (): React.ReactNode => {
    switch (view[0]) {
    case VotingViewEnum.PODIUM:
      return <PodiumView {...mapToProps} />;

    case VotingViewEnum.SHARE:
      return <ShareView {...mapToProps} />;

    case VotingViewEnum.CONGRATS:
      return <CongratsView />;
    }
  };

  if (data?.hasVotedToday) {
    return (<Navigate to={'/'} />);
  }

  return renderView();
}

export default withProtectionRoute(VotePage, 'only-connected');