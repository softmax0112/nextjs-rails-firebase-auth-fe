import type { NextPage } from 'next';
import Link from 'next/link';

const SignInPage: NextPage = () => {
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>会員登録</h2>
      <Link href='/signup'>会員登録がまだの方はこちら</Link>
    </div>
  );
};

export default SignInPage;
