// API Dependency
import {request} from './api';

// Configuration
import {AUTH_SERVICE} from '@/config';

// Types
import {User} from '../shared/hooks/auth';

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
 * @extends {Response} The standard response object.
 * @property {boolean} isCreated - Indicates if a new user was created during the login process.
 * @property {Object} user - Contains user-specific information.
 * @property {number} user.fid - The unique identifier of the user.
 * @property {string} user.username - The username of the user.
 * @property {string} user.photoUrl - The URL of the user's profile photo.
 */
export interface LogInResponse {
  isCreated: boolean;
  user: {
    fid: User['fid'];
    username: User['username'];
    photoUrl: User['photoUrl'];
  };
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
 * Defines the structure of the response returned by the getMe API.
 * 
 * @property {User} data - Contains the user information retrieved.
 * @property {string} action - Describes the action performed.
 */
export interface GetMeResponse {
  data: User;
  action: string;
}
/**
 * Retrieves the current user's information from the authentication service.
 * 
 * @returns A promise that resolves with the user's information.
 */
export const getMe = async () =>
  await request<GetMeResponse>(`${AUTH_SERVICE}/me`, {
    method: 'GET',
  });