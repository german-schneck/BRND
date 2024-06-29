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
 * Retrieves the list of brands from the brand service.
 * 
 * @param {string} searchQuery - The search query to filter the brands.
 * @param {string} pageId - The ID of the page to retrieve.
 * @returns {Promise<GetBrandListResponse>} A promise that resolves with the list of brands and the count.
 */
export const getBrandList = async (searchQuery: string, pageId: string): Promise<GetBrandListResponse> =>
  await request<GetBrandListResponse>(`${BRAND_SERVICE}/list`, {
    method: 'GET',
    params: {
      search: searchQuery,
      pageId,
      limit: '27'
    }
  });

/* =======================================
   = = = = = = = = = = = = = = = = = = = =
   ======================================= */

/**
 * Represents the parameters required for voting on brands.
 * 
 * @property {number[]} ids - An array of brand IDs to vote for.
 */
export interface VoteBrandsParams {
  ids: number[];
}

/**
 * Represents the response structure for the vote brands operation.
 * 
 * @property {object} data - Contains the response data.
 */
export type VoteBrandsResponse = & {
  id: number;
  date: string;
  position: number;
  brand: {
    id: number;
    name: string;
    imageUrl: string;
  };
}[];

/**
 * Sends a vote request to the brand service.
 * 
 * @param {VoteBrandsParams} body - The parameters required for voting on brands.
 * @returns {Promise<VoteBrandsResponse>} A promise that resolves when the request is complete.
 */
export const voteBrands = async (body: VoteBrandsParams) =>
  await request<VoteBrandsResponse>(`${BRAND_SERVICE}/vote`, {
    method: 'POST',
    body
  });