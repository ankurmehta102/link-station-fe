export const MODAL_KEYS = {
  CLOSE: 0,
  EDIT_LINK: 1,
  DELETE_LINK: 2,
  ADD_LINK: 3,
};

export const STORAGE_KEYS = {
  PROFILE_PICTURE_URL: 'profilePictureURL',
} as const;

export const logout = () => {
  window.location.href = '/login';
};
