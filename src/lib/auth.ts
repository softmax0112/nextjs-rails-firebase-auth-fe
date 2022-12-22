import axios from 'axios';
import { API_BASE_URL } from 'src/config';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const authenticateUser = async (token: string, name = '') => {
  const res = await axios.post(`${API_BASE_URL}/auth/users`, {
    token,
    user: {
      name,
    },
  });

  return res.data;
};

export const initAuthState = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
    });

    return unsubscribe();
  });
};
