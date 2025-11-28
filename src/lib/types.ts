export type User = {
  userId: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string | null;
  displayEmail: string | null;
  bio: string | null;
  profilePictureUrl: string | null;
  userRole: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
};

export type Link = {
  linkName: string;
  displayOrder: number;
  linkUrl: string;
  userId: number;
  linkImageUrl: string | null;
  linkId: number;
  createdAt: string;
  updatedAt: string;
};
