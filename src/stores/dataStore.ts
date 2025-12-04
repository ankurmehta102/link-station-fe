import { create } from 'zustand';
import type { Link } from '../lib/types';

type DataStore = {
  links: Link[];
  selectedLink: Link | null;

  setLinks: (links: Link[]) => void;
  addLink: (links: Link) => void;
  removeLink: (linkId: number) => void;
  editLink: (updatedLink: Link) => void;
  setSelectedLink: (link: Link | null) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  links: [],
  selectedLink: null,

  setLinks: (links) => set({ links: links }),

  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),

  removeLink: (linkId) =>
    set((state) => ({
      links: state.links.filter((link) => link.linkId !== linkId),
    })),

  editLink: (updatedLink) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.linkId === updatedLink.linkId ? updatedLink : link,
      ),
    })),

  setSelectedLink: (link) => set({ selectedLink: link }),
}));
