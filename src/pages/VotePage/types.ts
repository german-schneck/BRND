import {Brand} from '@/hooks/brands';

export enum VotingViewEnum {
  PODIUM = 'podium',
  SHARE = 'share',
  CONGRATS = 'congrats'
}

export interface VotingViewProps {
  navigateToView: (view: VotingViewEnum, brands: Brand[], voteId: string) => void;
  currentBrands: Brand[];
  currentVoteId: string;
  currentView: VotingViewEnum;
}