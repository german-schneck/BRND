// Dependencies
import {useQuery} from '@tanstack/react-query';

// Services
import {getBrandById} from '@/services/brands';

// Types
import {Brand} from './types';

export const useBrand = (id: Brand['id']) => {
  return useQuery({
    queryKey: ['brand', id], 
    queryFn: () => getBrandById(id!), 
  });
};
