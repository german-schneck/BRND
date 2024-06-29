// Dependencies
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';

// Services
import {getBrandList} from '@/services/brands';

// Types
import {Brand} from './types';

// Utils
import {normalizeState} from '../../utils/state';

export const useBrandList = (searchQuery: string = '', pageId: number = 1) => {
  const brandsRef = useRef<Record<Brand['id'], Brand>>({});
  const countRef = useRef<number>(0);

  const result = useQuery({
    queryKey: ['brands', searchQuery, pageId], 
    queryFn: () => getBrandList(searchQuery, String(pageId)), 
    retry: false,
    staleTime: 0,
    enabled: false,
    placeholderData: (prev) => prev,
  });

  if (!result.isError) {
    const brands = result.data?.brands || [];

    const normalizedBrands = normalizeState(brands, 'id');
    if (searchQuery && pageId === 1) {
      brandsRef.current = normalizedBrands;
    } else {
      brandsRef.current = {
        ...brandsRef.current,
        ...normalizedBrands,
      };
    }
    countRef.current = result.data?.count || 0;
  }

  return {
    ...result,

    data: {
      brands: brandsRef.current,
      count: countRef.current
    },
  };
};
