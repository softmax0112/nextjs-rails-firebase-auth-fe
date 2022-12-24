import clsx from 'clsx';
import Link from 'next/link';
import type { FC,ReactNode } from 'react';

import GoogleIcon from '@/public/img/google-icon.svg';

const variants = {
  primary: 'bg-blue-600 text-white',
  inverse: 'bg-white text-blue-600',
  danger: 'bg-red-600 text-white',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type Props = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const GoogleSignInButton: FC<Props> = ({
  children,
  className = '',
  size = 'md',
  variant = 'primary',
}) => {
  return (
    <Link
      href='/auth-redirect?redirect_uri=/'
      className={clsx(
        'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <GoogleIcon className='fill-current transition-colors text-gray-700 hover:text-orange-500 h-6 w-6 mr-2' />
      {children}
    </Link>
  );
};
