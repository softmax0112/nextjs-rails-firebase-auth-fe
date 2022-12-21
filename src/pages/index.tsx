import type { NextPage } from 'next';
import { useAuth } from '@/globalStates/userState';

const Home: NextPage = () => {
  const { isLoading, currentUser } = useAuth();

  return (
    <div>
      <h1>top page</h1>
      {isLoading ? <p>Loading..</p> : <p>{currentUser?.name}</p>}
    </div>
  );
};

export default Home;
