import { api } from '../../../lib/api-client';

export const fetchUser = async (username: string) => {
  const res = await api.get(`/users/${username}`);
  return res.data;
};
