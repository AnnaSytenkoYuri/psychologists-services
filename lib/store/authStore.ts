import { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  loading: true,
  user: null,
  setLoading: (value) => set({ loading: value }),
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true, loading: false }));
  },
  clearIsAuthenticated: () =>
    set(() => ({ user: null, isAuthenticated: false, loading: false })),
}));
