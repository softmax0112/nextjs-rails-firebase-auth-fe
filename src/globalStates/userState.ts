import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import {
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateEmail,
  verifyPasswordResetCode,
} from 'firebase/auth';

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

// userStateのsetter
export const useUserStateMutators = () => {
  const setUserState = useSetRecoilState(userState);

  return { setUserState };
};
