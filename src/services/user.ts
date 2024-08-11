// API Dependency
import {request} from './api';

// Configuration
import {USER_SERVICE} from '@/config/api';

// Types
import {User, UserVoteHistory, UserVote, UserBrand} from '../shared/hooks/user';

/**
 * Retrieves the vote history of a user from the user service.
 * 
 * @param id - The ID of the user whose vote history is being retrieved.
 * @param pageId - The page number for paginated vote history.
 * @returns A promise that resolves with an object containing the count of votes and the user's vote history data.
 */
export const getUserVotesHistory = async (id: User['id'], pageId: number) =>
  await request<{count: number, data: Record<string, UserVoteHistory>}>(`${USER_SERVICE}/user/${id}/vote-history`, {
    method: 'GET',
    params: {
      pageId: String(pageId),
      limit: String(3 * 10)
    }
  });

/**
 * Retrieves the user votes for a specific date.
 * 
 * @param unixDate - The Unix timestamp representing the date for which to retrieve the votes.
 * @returns A promise that resolves with an object containing the count of votes and the user's vote history data.
 */
export const getUserVotes = async (unixDate: number) =>
  await request<UserVote>(`${USER_SERVICE}/votes/${unixDate}`, {
    method: 'GET',
  });

export const getUserBrands = async () =>
  await request<UserBrand[]>(`${USER_SERVICE}/brands`, {
    method: 'GET',
  });

export const shareFrame = async (): Promise<boolean> =>
  await request(`${USER_SERVICE}/share-frame`, {
    method: 'POST',
  });