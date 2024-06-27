// API Dependency
import {request} from './api';

// Configuration
import {BRAND_SERVICE} from '@/config/api';

// Types
import {Brand} from '../shared/hooks/brands';

/* =======================================
   = = = = = = = = = = = = = = = = = = = =
   ======================================= */
  
/**
 * Defines the structure of the response returned by the getMe API.
 * 
 * @property {User} data - Contains the user information retrieved.
 * @property {string} action - Describes the action performed.
 */
export interface GetBrandListResponse {
  brands: Brand[];
  count: number;
}

/**
 * Retrieves the current user's information from the authentication service.
 * 
 * @returns A promise that resolves with the user's information.
 */
export const getBrandList = async (searchQuery: string) =>
  await request<GetBrandListResponse>(`${BRAND_SERVICE}/list`, {
    method: 'GET',
    params: {
      search: searchQuery
    }
  });