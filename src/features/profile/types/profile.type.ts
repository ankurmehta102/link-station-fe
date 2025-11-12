import type { User } from '../../../lib/types';

export type EditProfileFormValues = Pick<
  User,
  'firstName' | 'lastName' | 'displayEmail' | 'bio'
> & {
  profilePicture: File | null;
};
