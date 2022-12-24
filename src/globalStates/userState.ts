import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { authenticateUser } from '@/lib/auth';
import { auth } from '@/lib/firebase';

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

  return setUserState;
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

        Cookies.set('isLoggedIn', 'true');
        const redirectUri = router.query['redirect_uri'] as string | undefined;
        router.push(redirectUri || '/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export const useSignOut = () => {
  const setUserState = useUserStateMutators();
  const router = useRouter();

  const logout = () => {
    try {
      signOut(auth).then(() => {
        setUserState(null);
        router.push('/signin');
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    logout,
  };
};

export const useAuth = () => {
  const router = useRouter();
  const setUserState = useUserStateMutators();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/signin');
        setUserState(null);
        Cookies.remove('isLoggedIn');
        return;
      }

      const token = await user.getIdToken();
      const res = await authenticateUser(token);
      const { email, id, name, uid } = res;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
