import type { NextPage } from 'next';
import { useUserState } from '@/globalStates/userState';
import { WithAuth } from '@/components/functional/WithAuth';

const Home: NextPage = () => {
  const currentUser = useUserState();

  return (
    <WithAuth>
      <div>
        <h1>top page</h1>
        <p>{currentUser?.name}</p>
      </div>
    </WithAuth>
  );
};

export default Home;
