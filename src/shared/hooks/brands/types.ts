export type Brand = {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  channel: string;
  profile: string;
  stateScore: number;
  score: number;
}

export type ListBrandTypes = 'all' | 'new' | 'trending';