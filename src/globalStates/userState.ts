import { atom, useRecoilValue } from 'recoil';

type UserState = {
  id: number;
  name: string;
  email: string;
  uid: string;
};

const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});

export const useUserState = () => {
  return useRecoilValue(userState);
};
