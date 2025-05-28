import { create } from "zustand";

interface GoogleStore {
  isGoogleSignIn: boolean;
  setIsGoogleSignIn: (isGoogleSignIn: boolean) => void;
}

export const useGoogleStore = create<GoogleStore>((set) => ({
  isGoogleSignIn: false,
  setIsGoogleSignIn: (isGoogleSignIn) => set({ isGoogleSignIn }),
}));
