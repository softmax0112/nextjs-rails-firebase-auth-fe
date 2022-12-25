import {
  createUserWithEmailAndPassword,
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

export const useSignUp = () => {
  const router = useRouter();

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    if (!user) {
      return;
    }

    Cookies.set('isLoggedIn', 'true', { secure: true });
    router.push('/');
  };

  return { signUpWithEmailAndPassword };
};

// signInWithRedirectによるsignup, signin
export const useSignInWithGoogle = () => {
  const router = useRouter();
  const setUserState = useUserStateMutators();

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
        const { email, id, name, uid } = res;
        const repositoryUser = {
          id,
          name,
          email,
          uid,
        };
        setUserState(repositoryUser);
        Cookies.set('isLoggedIn', 'true', { secure: true });
        localStorage.setItem('currentUser', JSON.stringify(repositoryUser));

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
      // 未ログインの場合
      if (!user) {
        router.push('/signin');
        setUserState(null);
        localStorage.removeItem('currentUser');
        Cookies.remove('isLoggedIn');
        return;
      }

      // 一度ログインに成功している場合は、localStorageにcurrentUserをsetし、その値をsetUserStateする
      if (localStorage.getItem('currentUser')) {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser') as string);
        setUserState(loggedInUser);
        return;
      }

      // firebaseでログインが成功したら、以下の処理を行う
      // 1. APIでfirebaseから返却されるtokenを検証
      // 2. tokenの検証が成功したらDBにuserを保存し、APIがuserを返却してくれるので、resをsetUserStateする
      // 3. ページリロードするたびに上記のAPIコールの処理が走ってしまうので、ログインに成功したら無駄なAPIコールを防ぐためresをlocalStorageにsetItemする → localStorageにcurrentUserがあればそれをsetUserStateすればよくなる
      // 4. APIでfirebaseのtoken検証が失敗したらerrorに入るので、userStateを初期値に戻す、localStorageからcurrentUserをremoveする、cookieを削除する
      try {
        const token = await user.getIdToken();
        const res = await authenticateUser(token);
        const { email, id, name, uid } = res;
        const repositoryUser = {
          id,
          name,
          email,
          uid,
        };

        setUserState(repositoryUser);
        localStorage.setItem('currentUser', JSON.stringify(repositoryUser));
      } catch (err) {
        console.error(err);
        router.push('/signin');
        setUserState(null);
        localStorage.removeItem('currentUser');
        Cookies.remove('isLoggedIn');
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
