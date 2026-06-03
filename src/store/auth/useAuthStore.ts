import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  user_id: string;
  session_id: string;
  name: string;
  cpf: string;
  phone: string;
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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      isAuthenticated: false,

      signIn: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      signOut: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);