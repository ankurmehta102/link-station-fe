import { create } from 'zustand';
import type { Link } from '../lib/types';

type DataStore = {
  links: Link[];

  setLinks: (links: Link[]) => void;
  addLink: (links: Link) => void;
  removeLink: (linkId: number) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  links: [],

  setLinks: (links) => set({ links: links }),
  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),
  removeLink: (linkId) =>
    set((state) => ({
      links: state.links.filter((link) => link.linkId !== linkId),
    })),
}));
