// Dependencies
import {useMutation} from '@tanstack/react-query';

// Services
import {VoteBrandsParams, VoteBrandsResponse, voteBrands} from '@/services/brands';

export const useVoteBrands = () => {

  return useMutation({
    mutationFn: ({ids}: VoteBrandsParams) => voteBrands({
      ids
    }),
    onSuccess: async (response: VoteBrandsResponse) => {
      console.log(response);
    },
    onError: (e) => {
      console.log('Error on voting', e);
    }
  }); 
};
