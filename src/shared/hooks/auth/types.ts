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