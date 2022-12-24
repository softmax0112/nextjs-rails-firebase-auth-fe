import type { NextPage } from 'next';

import { WithAuth } from '@/components/functional/WithAuth';
import { useSignOut, useUserState } from '@/globalStates/userState';

const Home: NextPage = () => {
  const currentUser = useUserState();
  const { logout } = useSignOut();

  return (
    <WithAuth>
      <div>
        <h1>top page</h1>
        <p>{currentUser?.name}</p>
        <button onClick={logout}>ログアウトする</button>
      </div>
    </WithAuth>
  );
};

export default Home;
