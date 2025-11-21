import { api } from '../../../lib/api-client';

export const fetchLinks = async (userId: number) => {
  return (await api.get(`/users/${userId}/links`)).data;
};
