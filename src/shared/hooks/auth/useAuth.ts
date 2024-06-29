// Dependencies
import {useQuery} from '@tanstack/react-query';

// Services
import {getMe} from '@/services/auth';

/**
 * Custom hook to fetch and cache the authentication status and user information.
 * It uses the `useQuery` hook from `@tanstack/react-query` to fetch the data using `getMe` function.
 * 
 * @returns The query object containing the user data and status of the query.
 */
export const useAuth = () => { 
  return useQuery({
    queryKey: ['auth'], 
    queryFn: getMe, 
    retry: false,
    staleTime: 0,
    enabled: false,
  });
};
