export const STORAGE_KEYS = {
  PROFILE_PICTURE_URL: 'profilePictureURL',
} as const;

export const logout = () => {
  window.location.href = '/login';
};
