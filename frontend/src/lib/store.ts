import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "client" | "freelancer";

interface UserState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      role: "client",
      setRole: (role: UserRole) => set({ role }),
      toggleRole: () =>
        set((state) => ({
          role: state.role === "client" ? "freelancer" : "client",
        })),
    }),
    {
      name: "user-role-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
