import { create } from "zustand";

interface User {
  user_id: string;
  session_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthStore {
  user: User | null;

  isAuthenticated: boolean;

  signIn: (user: User) => void;

  signOut: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    isAuthenticated: false,

    signIn: (user) =>
      set({
        user,
        isAuthenticated: true,
      }),

    signOut: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),
  }));