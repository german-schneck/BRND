// API Dependency
import {request} from './api';

// Configuration
import {AUTH_SERVICE} from '@/config/api';

// Types
import {User} from '../shared/hooks/user';

/* =======================================
   = = = = = = = = = = = = = = = = = = = =
   ======================================= */
/**
 * Parameters required for the logIn function.
 */
export interface LogInParams {
  fid: number;
  signature: `0x${string}`;
  message: string;
  nonce: string;
  domain: string;
  username: string;
  photoUrl: string;
}

/**
 * Represents the response structure for the login operation.
 * 
 * @property {boolean} isCreated - Indicates if a new user was created during the login process.
 * @property {boolean} hasVotedToday - Indicates if the user has voted today.
 * @property {User} user - Contains user-specific information.
 */
export interface LogInResponse {
  isCreated: boolean;
  hasVotedToday: boolean;
  user: User;
}

/**
 * Sends a login request to the authentication service.
 * 
 * @param body - The parameters required for logging in.
 * @returns A promise that resolves when the request is complete.
 */
export const logIn = async (body: LogInParams) =>
  await request<LogInResponse>(`${AUTH_SERVICE}/login`, {
    method: 'POST',
    body
  });

/* =======================================
   = = = = = = = = = = = = = = = = = = = =
   ======================================= */

/**
 * Retrieves the current user's information from the authentication service.
 * 
 * @returns A promise that resolves with the user's information.
 */
export const getMe = async () =>
  await request<User>(`${AUTH_SERVICE}/me`, {
    method: 'GET',
  });