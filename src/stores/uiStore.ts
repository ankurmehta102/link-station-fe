import { create } from 'zustand';
import { MODAL_KEYS } from '../lib/helper';

type AppStore = {
  errMsg: string;
  successMsg: string;
  isLoading: boolean;
  modalKey: number;

  setErrMsg: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
  setIsLoading: (value: boolean) => void;
  setModalKey: (key: number) => void;
  resetStore: () => void;
};

export const useUIStore = create<AppStore>((set) => ({
  errMsg: '',
  successMsg: '',
  isLoading: false,
  modalKey: MODAL_KEYS.CLOSE,

  setErrMsg: (msg) => set({ errMsg: msg }),
  setSuccessMsg: (msg) => set({ successMsg: msg }),
  setIsLoading: (value) => set({ isLoading: value }),
  setModalKey: (key) => set({ modalKey: key }),
  resetStore: () => set({ errMsg: '', successMsg: '', isLoading: false }),
}));
