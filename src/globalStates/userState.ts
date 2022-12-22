import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { authenticateUser } from '@/lib/auth';

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
  const { setUserState } = useUserStateMutators();

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
        const token = await result.user.getIdToken();
        const res = await authenticateUser(token);
        const { id, name, email, uid } = res;

        setUserState({
          id,
          name,
          email,
          uid,
        });

        const redirectUri = router.query['redirect_uri'] as string | undefined;
        router.push(redirectUri || '/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export const useAuth = () => {
  const router = useRouter();
  const { setUserState } = useUserStateMutators();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/signin');
        setUserState(null);
        return;
      }

      const token = await user.getIdToken();
      const res = await authenticateUser(token);
      const { id, name, email, uid } = res;

      setUserState({
        id,
        name,
        email,
        uid,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
};
