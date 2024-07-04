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
  id: string;
  date: string;
  brand1: Brand;
  brand2: Brand;
  brand3: Brand;
}

export interface UserVote {
  id: string;
  date: string;
  brand1: Brand;
  brand2: Brand;
  brand3: Brand;
}