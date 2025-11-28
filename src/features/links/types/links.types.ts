import type { Link } from '../../../lib/types';

export type AddLinkFormValues = Pick<Link, 'linkName' | 'linkUrl'> & {
  linkImage: File | null;
};
