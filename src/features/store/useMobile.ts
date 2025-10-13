import { create } from "zustand";

interface MobileState {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const useMobile = create<MobileState>((set) => ({
    isMenuOpen: false,
    setIsMenuOpen: (isMenuOpen: boolean) => set({ isMenuOpen }),
}));