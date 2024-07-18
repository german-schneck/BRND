export type Brand = {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  channel: string;
  profile: string;
  stateScore: number;
  score: number;
  ranking: string;
  stateScoreWeek: number;
  scoreWeek: number;
  rankingWeek: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  followerCount: number;
  warpcastUrl: string;
  category: Category;
  banned: number;
}

export type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ListBrandTypes = 'all' | 'new' | 'top';

export type BrandStateScoreType = 'up' | 'equal' | 'down';

export type BrandCast = {
  creator: string;
  creatorPfp: string;
  creatorPowerBadge: boolean;
  text: string;
  image?: string;
  warpcastUrl: string;
};

