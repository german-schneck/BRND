// Dependencies
import {useQuery} from '@tanstack/react-query';

// Services
import {getBrandList} from '@/services/brands';

export const useBrandList = (searchQuery: string = '') => {
  return useQuery({
    queryKey: ['brands', searchQuery], 
    queryFn: () => getBrandList(searchQuery), 
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
