// API Dependency
import {request} from './api';

// Configuration
import {AUTH_SERVICE} from '@/config';

// Types
import { User } from '../shared/hooks/auth';

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
 * Sends a login request to the authentication service.
 * 
 * @param body - The parameters required for logging in.
 * @returns A promise that resolves when the request is complete.
 */
export const logIn = async(body: LogInParams) =>
  await request<void>(`${AUTH_SERVICE}/login`, {
    method: 'POST',
    body
  });


export const getMe = async() =>
  await request<User>(`${AUTH_SERVICE}/me`, {
    method: 'GET',
  })