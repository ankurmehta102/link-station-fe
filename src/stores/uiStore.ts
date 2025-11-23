import { create } from 'zustand';

type AppStore = {
  errMsg: string;
  successMsg: string;
  isLoading: boolean;

  setErrMsg: (msg: string) => void;
  setSuccessMsg: (msg: string) => void;
  setIsLoading: (value: boolean) => void;
  resetStore: () => void;
};

export const useUIStore = create<AppStore>((set) => ({
  errMsg: '',
  successMsg: '',
  isLoading: false,

  setErrMsg: (msg) => set({ errMsg: msg }),
  setSuccessMsg: (msg) => set({ successMsg: msg }),
  setIsLoading: (value) => set({ isLoading: value }),
  resetStore: () => set({ errMsg: '', successMsg: '', isLoading: false }),
}));
