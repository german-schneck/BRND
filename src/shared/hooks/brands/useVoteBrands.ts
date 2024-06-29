// Dependencies
import {useMutation} from '@tanstack/react-query';

// Services
import {VoteBrandsParams, voteBrands} from '@/services/brands';

export const useVoteBrands = () => {

  return useMutation({
    mutationFn: ({ids}: VoteBrandsParams) => voteBrands({
      ids
    }),
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: (e) => {
      console.log(e);
      console.log('Error on voting');
    }
  }); 
};
