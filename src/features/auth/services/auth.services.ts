import { api } from '../../../lib/api-client';
import type { LoginFormValues } from '../types/auth.types';

export const login = (data: LoginFormValues) => {
  return api.post('/login', data);
};
