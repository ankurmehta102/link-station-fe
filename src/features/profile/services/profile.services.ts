import { api } from '../../../lib/api-client';

export const fetchProfileData = async (userId: number) => {
  const res = await api.get(`/users/profile/${userId}`);
  return res.data;
};

export const updateProfileData = (userId: number, data: any) => {
  return api.patch(`/users/profile/${userId}`, data);
};
