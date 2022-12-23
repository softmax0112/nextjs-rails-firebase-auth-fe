import type { NextPage } from 'next';
import { Form } from '@/components/functional/Form';
import { InputControl } from '@/components/functional/InputControl';
import { Button } from '@/components/ui/ui-elements/Button';
import { GoogleSignInButton } from '@/components/ui/ui-elements/GoogleSignInButton';
import { z } from 'zod';
import Link from 'next/link';

type SignUpFormValues = {
  email: string;
  emailVerification: string;
  password: string;
};

const SignInPage: NextPage = () => {
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>会員登録</h2>
      <Link href='/signup'>会員登録がまだの方はこちら</Link>
    </div>
  );
};

export default SignInPage;
