import { Spinner } from '@/components/ui/ui-elements/Spinner';
import type { NextPage } from 'next';
import { useSignInWithGoogle } from '@/globalStates/userState';

const AuthRedirectPage: NextPage = () => {
  useSignInWithGoogle();

  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>認証中です。もうしばらくお待ち下さい。</h2>
      <div className='flex justify-center my-8'>
        <Spinner size='md' />
      </div>
    </div>
  );
};

export default AuthRedirectPage;
