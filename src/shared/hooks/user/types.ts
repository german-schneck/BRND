import {Brand} from '../brands';

export type User = {
  id: string;
  fid: number;
  username: string;
  photoUrl: string;
  createdAt: Date;
  role: UserRoleEnum;
  points: number;
  hasVotedToday: boolean;
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserVoteHistory {
  id: number;
  date: string;
  position: number;
  brand: Brand;
}

export interface UserVote {
  id: number;
  date: string;
  position: number;
  brand: Brand;
}