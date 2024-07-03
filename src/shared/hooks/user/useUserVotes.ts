// Dependencies
import {useQuery} from '@tanstack/react-query';

// Services
import {getUserVotes} from '@/services/user';

export const useUserVotes = (unixDate?: number) => {
  return useQuery({
    queryKey: ['votesHistory', unixDate],
    queryFn: () => getUserVotes(unixDate!),
    retry: false,
    staleTime: 0,
    enabled: !!unixDate,
  });
};
