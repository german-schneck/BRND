// Dependencies
import {useMutation} from '@tanstack/react-query';

// Services
import {LogInParams, logIn} from '@/services/auth';

/**
 * Custom hook to perform a login operation.
 * 
 * This hook uses the `useMutation` hook from `react-query` to handle the login process.
 * It sends a POST request to the login endpoint with the login details provided.
 * 
 * @returns A mutation object that can be used to track the status of the login request.
 */
export const useLogIn = () => {

  return useMutation({
    /**
     * The function to be called to perform the login operation.
     * @param {LogInParams} params - The login parameters.
     */
    mutationFn: ({fid, signature, message, domain, nonce, username, photoUrl}: LogInParams) => logIn({
      fid,
      signature,
      message,
      domain,
      nonce,
      username,
      photoUrl
    }),
    onSuccess: async (response) => {
      if (response && response.data) {
        const {isCreated} = response.data;
        window.location.href = isCreated ? '/welcome' : '/'; // Using this because navigation() hook doesn't work
      } 
    },
    onError: (e) => {
      console.log(e);
      console.log('Error on login');
    }
  }); 
};
