export const MODAL_KEYS = {
  CLOSE: 0,
  EDIT_LINK: 1,
  DELETE_LINK: 2,
  ADD_LINK: 3,
};

export const STORAGE_KEYS = {
  PROFILE_PICTURE_URL: 'profilePictureURL',
  USER: 'user',
} as const;

export const logout = () => {
  window.location.href = '/login';
};

export const getUserFromLocalStorage = () => {
  try {
    const userString = localStorage.getItem(STORAGE_KEYS.USER);
    return userString ? JSON.parse(userString) : null;
  } catch (err) {
    console.error('Error parsing user data from localStorage', err);
    return null;
  }
};
