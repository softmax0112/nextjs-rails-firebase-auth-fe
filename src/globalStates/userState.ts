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
import { useEffect, useState } from 'react';
import { verifyIdToken } from '@/lib/auth';
import { recoilPersist } from 'recoil-persist';

type UserState = {
  id: number;
  name: string;
  email: string;
  uid: string;
};

const { persistAtom } = recoilPersist();
const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// userStateのgetter
export const useUserState = () => {
  return useRecoilValue(userState);
};

// userStateのsetter
export const useUserStateMutators = () => {
  const setUserState = useSetRecoilState(userState);

  return { setUserState };
};

export const useSignInWithGoogle = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    (async () => {
      const result = await getRedirectResult(auth)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.error(err);
        });
      if (result == null) {
        // result がない時は認証前
        // `auth/redirect-cancelled-by-user` 等のエラー検証が必要だが、ここでは省略
        await signInWithRedirect(auth, new GoogleAuthProvider());
      } else {
        // result がある時は認証済み
        // オープンリダイレクタ等を回避するために検証が必要だが、ここでは省略
        const redirectUri = router.query['redirect_uri'] as string | undefined;
        router.push(redirectUri || '/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUserState } = useUserStateMutators();
  const currentUser = useUserState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) return;

      const token = await user.getIdToken();
      const res = await verifyIdToken(token);
      const { id, name, email, uid } = res;

      setUserState({
        id,
        name,
        email,
        uid,
      });
    });
    setIsLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isLoading,
    currentUser,
  };
};
