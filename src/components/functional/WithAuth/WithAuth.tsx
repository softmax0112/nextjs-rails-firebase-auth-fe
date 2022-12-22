import { useAuth } from '@/globalStates/userState';
import { ReactElement } from 'react';

const WithAuth = (WrappedComponent: () => ReactElement) => {
  return () => {
    useAuth();

    return <WrappedComponent />;
  };
};

export default WithAuth;
