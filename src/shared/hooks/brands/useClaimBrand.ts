// Dependencies
import { useMutation } from '@tanstack/react-query';

// Services
import { ClaimBrandParams, claimBrand } from '@/services/brands';

export const useClaimBrand = () => {

  return useMutation({
    mutationFn: ({ name }: ClaimBrandParams) => claimBrand({
      name
    })
  }); 
};
