import { useAuth } from '@/globalStates/userState';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const WithAuth: FC<Props> = ({ children }) => {
  useAuth();

  return <>{children}</>;
};
