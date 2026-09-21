import { api } from '../../../lib/api-client';
import type { LoginFormValues, SignupFormValues } from '../types/auth.types';

export const login = (data: LoginFormValues) => {
  return api.post('/login', data);
};

export const signup = (data: SignupFormValues) => {
  return api.post('/users/signup', data);
};
