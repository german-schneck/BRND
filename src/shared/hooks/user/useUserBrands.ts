// Dependencies
import {useQuery} from '@tanstack/react-query';

// Services
import {getUserBrands} from '@/services/user';

// Types
import {User} from './types';

export const useUserBrands = (userId: User['id']) => {
  return useQuery({
    queryKey: ['userBrands', userId],
    queryFn: () => getUserBrands(),
  });
};
