export const MODAL_KEYS = {
  CLOSE: 0,
  LINK_EDIT: 1,
  LINK_DELETE: 2,
};

export const STORAGE_KEYS = {
  PROFILE_PICTURE_URL: 'profilePictureURL',
} as const;

export const logout = () => {
  window.location.href = '/login';
};
