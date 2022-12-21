import axios from 'axios';
import { API_BASE_URL } from 'src/config';

export const verifyIdToken = async (token: string, name = '') => {
  const res = await axios.post(`${API_BASE_URL}/auth/users`, {
    token,
    user: {
      name,
    },
  });

  return res.data;
};
