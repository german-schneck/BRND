import { useEffect } from 'react';

const useDisableScrollBody = () => {
  useEffect(() => {
    // Set overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Reset overflow to auto when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useDisableScrollBody;
