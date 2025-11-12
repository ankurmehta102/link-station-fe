import { api } from '../../../lib/api-client';
import type { EditProfileFormValues } from '../types/profile.type';

export const fetchProfileData = async (userId: number) => {
  const res = await api.get(`/users/profile/${userId}`);
  return res.data;
};

export const updateProfileData = (
  userId: number,
  data: EditProfileFormValues,
) => {
  return api.patch(`/users/profile/${userId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
