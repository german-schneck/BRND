// Dependencies
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

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
  const navigate = useNavigate();
  
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
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      console.log('Error on login');
    }
  });
};

