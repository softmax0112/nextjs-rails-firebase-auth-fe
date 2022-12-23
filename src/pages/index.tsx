import { useSignOut, useUserState } from '@/globalStates/userState';
import { WithAuth } from '@/components/functional/WithAuth';
import { NextPage } from 'next';

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
