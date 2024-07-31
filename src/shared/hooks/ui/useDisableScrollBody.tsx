import { useEffect } from 'react';

const useDisableScrollBody = () => {
  useEffect(() => {
    // Store the original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Set overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Reset overflow to its original value when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Add a resize event listener to ensure the style is applied even after window resizing
  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useDisableScrollBody;
