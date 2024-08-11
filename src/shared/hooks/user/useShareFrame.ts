// Dependencies
import {useMutation} from '@tanstack/react-query';

// Services
import {shareFrame} from '@/services/user';

export const useShareFrame = () => {

  return useMutation({
    mutationFn: () => shareFrame(),
    onSuccess: async (response: boolean) => {
      console.log('onSucess', response);
    },
    onError: (e) => {
      console.log('Error on sharing frame', e);
    }
  }); 
};
