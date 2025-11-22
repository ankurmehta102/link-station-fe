import { api } from '../../../lib/api-client';

export const fetchLinks = async (userId: number) => {
  return (await api.get(`/users/${userId}/links`)).data;
};

export const deleteLink = async (userId: number, linkId: number) => {
  return (await api.delete(`/users/${userId}/links/${linkId}`)).data;
};
