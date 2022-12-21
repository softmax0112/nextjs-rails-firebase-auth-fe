import Link from 'next/link';
import { ReactNode, FC } from 'react';

import GoogleIcon from '@/public/img/google-icon.svg';

type Props = {
  children: ReactNode;
};

export const GoogleSignInButton: FC<Props> = ({ children }) => {
  return (
    <Link
      href='/auth-redirect?redirect_uri=/'
      className='flex h-11 sm:h-14 w-full items-center justify-center rounded-full border border-indigo text-base font-semibold leading-none text-black'
    >
      <GoogleIcon className='fill-current transition-colors text-gray-700 hover:text-orange-500 h-6 w-6' />
      {children}
    </Link>
  );
};
