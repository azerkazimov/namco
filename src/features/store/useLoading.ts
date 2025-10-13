import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingComplete: boolean;
  setLoadingComplete: (complete: boolean) => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  loadingComplete: false,
  setLoadingComplete: (complete: boolean) => set({ loadingComplete: complete }),
}));
