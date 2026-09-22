import { create } from 'zustand';
import { MODAL_KEYS } from '../lib/helper';

type AppStore = {
  isLoading: boolean;
  modalKey: number;

  setIsLoading: (value: boolean) => void;
  setModalKey: (key: number) => void;
  resetStore: () => void;
};

export const useUIStore = create<AppStore>((set) => ({
  isLoading: false,
  modalKey: MODAL_KEYS.CLOSE,

  setIsLoading: (value) => set({ isLoading: value }),
  setModalKey: (key) => set({ modalKey: key }),
  resetStore: () => set({ isLoading: false }),
}));
