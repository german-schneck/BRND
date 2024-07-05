// Dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { LogInParams, logIn } from '@/services/auth';

// Hooks
import { ModalsIds, useModal } from '../ui/useModal';

/**
 * Custom hook to perform a login operation.
 * 
 * This hook uses the `useMutation` hook from `react-query` to handle the login process.
 * It sends a POST request to the login endpoint with the login details provided.
 * 
 * @returns A mutation object that can be used to track the status of the login request.
 */
export const useLogIn = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    /**
     * The function to be called to perform the login operation.
     * @param {LogInParams} params - The login parameters.
     */
    mutationFn: ({ fid, signature, message, domain, nonce, username, photoUrl }: LogInParams) => logIn({
      fid,
      signature,
      message,
      domain,
      nonce,
      username,
      photoUrl
    }),
    onSuccess(data) {
      if (data) {
        const { user } = data;
        queryClient.setQueryData(['auth'], user);
      }
    },
    onError: () => {
      openModal(ModalsIds.ERROR, {
        title: 'Unable to connect to the platform.',
        message: 'The service is probably down, try again later.',
      });
    }
  }); 
};
