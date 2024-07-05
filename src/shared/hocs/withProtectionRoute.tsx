// Dependencies
import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

// Hooks
import {useAuth} from '@/hooks/auth';

// Components
import LoaderIndicator from '../components/LoaderIndicator';


const withProtectionRoute = (WrappedComponent: React.ComponentType, permission: 'always' | 'only-connected' | 'only-disconnected'): React.ComponentType => {
  return (props) => {
    const {isLoading, data, isPending, refetch} = useAuth();

    useEffect(() => {
      refetch();
    }, []);

    if (isLoading || isPending) {
      return <LoaderIndicator variant={'fullscreen'} />;
    }
    else { 
      if (!data && permission === 'only-connected') {
        return <Navigate to="/login" />;
      }
  
      if (data && permission === 'only-disconnected') {
        return <Navigate to={'/'} />;
      }
    }

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withProtectionRoute;
