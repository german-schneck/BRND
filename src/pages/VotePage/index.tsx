// Dependencies
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

// Components
import PodiumView from './partials/PodiumView';
import ShareView from './partials/ShareView';
import CongratsView from './partials/CongratsView';

// Types
import { VotingViewEnum } from './types';

// Hooks
import { Brand } from '@/hooks/brands';
import { useAuth } from '@/hooks/auth';
import { useUserVotes } from '@/hooks/user/useUserVotes';

// Hocs
import withProtectionRoute from '@/hocs/withProtectionRoute';
import LoaderIndicator from '../../shared/components/LoaderIndicator';

function VotePage(): React.ReactNode {
  const { unixDate } = useParams<{ unixDate?: string;}>();
  const { search } = useLocation();
  
  const { data: votes, isFetching } = useUserVotes(Number(unixDate));
  const { data: user } = useAuth();

  const [view, setView] = useState<[VotingViewEnum, Brand[], string]>([VotingViewEnum.PODIUM, [], '']);

  /**
   * Determines if the voting process was successful based on the URL search parameters.
   *
   * @returns {boolean} True if the 'success' parameter is present in the URL search parameters, otherwise false.
   */
  const isSuccess = useMemo<boolean>(() => new URLSearchParams(search).get('success') === '', [search]);

  /**
   * Navigates to a different view based on the provided id and selection.
   *
   * @param {VotingViewEnum} id - The id of the view to navigate to.
   * @param {Brand[]} selection - The selection of brands for the view.
   * @param {string} id - The id of the vote to share the podium.
   */
  const navigateToView = useCallback((id: VotingViewEnum, selection: Brand[], voteId: string) => setView([id, selection, voteId]), [setView]);

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
    currentVoteId: view[2]
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

  useEffect(() => { 
    if (unixDate && !isFetching && votes?.id) {
      navigateToView(isSuccess ? VotingViewEnum.CONGRATS : VotingViewEnum.SHARE, [votes.brand2, votes.brand1, votes.brand3], votes?.id);
    }
  }, [isFetching, votes, unixDate, isSuccess, navigateToView]);

  if ((user && user.hasVotedToday) && !unixDate || (unixDate && !isFetching && !votes?.id)) {
    return (<Navigate to={'/'} />);
  }

  return isFetching ? (
    <LoaderIndicator size={30} variant={'fullscreen'} />
  ) : renderView();
}

export default withProtectionRoute(VotePage, 'only-connected');