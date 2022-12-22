import { FC, ReactNode } from 'react';
import { useAuth } from '@/globalStates/userState';

type Props = {
  children: ReactNode;
};

export const WithAuth: FC<Props> = ({ children }) => {
  useAuth();

  return <>{children}</>;
};
