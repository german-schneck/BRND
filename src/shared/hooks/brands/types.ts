export type Brand = {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  channel: string;
  profile: string;
  stateScore: number;
  score: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  followerCount: number;
  warpcastUrl: string;
}

export type ListBrandTypes = 'all' | 'new' | 'trending';

export type BrandStateScoreType = 'up' | 'equal' | 'down';