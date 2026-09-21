import { api } from '../../../lib/api-client';
import type { Link } from '../../../lib/types';
import type { LinkFormValues } from '../types/links.types';

export const fetchLinks = async (userId: number) => {
  return (await api.get(`/users/${userId}/links`)).data;
};

export const deleteLink = async (userId: number, linkId: number) => {
  return (await api.delete(`/users/${userId}/links/${linkId}`)).data;
};

export const createLink = async (userId: number, data: LinkFormValues) => {
  return (
    await api.post(`users/${userId}/links`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
};

export const updateLink = async (
  userId: number,
  linkId: number,
  data: LinkFormValues,
): Promise<Link> => {
  return (
    await api.patch(`/users/${userId}/links/${linkId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
};
