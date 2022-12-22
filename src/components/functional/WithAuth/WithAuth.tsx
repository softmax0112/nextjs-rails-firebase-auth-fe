import { useAuth } from '@/globalStates/userState';
import { NextComponentType, NextPageContext } from 'next';

const WithAuth = (WrappedComponent: NextComponentType<NextPageContext, any, {}>) => {
  return () => {
    useAuth();

    return <WrappedComponent />;
  };
};

export default WithAuth;
