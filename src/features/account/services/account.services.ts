import { api } from '../../../lib/api-client';

export const changePassword = async (userId: number, password: string) => {
  return api.patch(`/users/password/${userId}`, { password });
};
export const changeUsername = async (userId: number, username: string) => {
  return api.patch(`/users/username/${userId}`, { username });
};
export const changeEmail = async (userId: number, email: string) => {
  return api.patch(`/users/email/${userId}`, { email });
};
