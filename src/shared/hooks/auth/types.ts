export type User = {
  id: string;
  username: string;
  photoUrl: string;
  createdAt: Date;
  role: UserRoleEnum;
}

export enum UserRoleEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}