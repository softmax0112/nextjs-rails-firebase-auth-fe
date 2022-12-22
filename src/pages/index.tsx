import { useUserState } from '@/globalStates/userState';
import WithAuth from '@/components/functional/WithAuth/WithAuth';

const Home = () => {
  const currentUser = useUserState();

  return (
    <div>
      <h1>top page</h1>
      <p>{currentUser?.name}</p>
    </div>
  );
};

export default WithAuth(Home);
