import { setItem } from "@/helpers/persistanceStore";
import { create } from "zustand";

interface User {
  user: any;
  id: string;
  login: string;
  name: string;
  token: string;
}

interface AuthStore {
  isLoading: boolean;
  loggedIn: boolean;
  error: string | null;
  user: User | null;

  signUserStart: () => void;
  signUsersSuccess: (user: User) => void;
  signUsersFailure: (error: string) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,

  signUserStart: () => set({ isLoading: true }),
  signUsersSuccess: (user: User) => {
    set({ isLoading: false, loggedIn: true, user });
    setItem("token", user.token);
  },
  signUsersFailure: (error: string) => set({ isLoading: false, error }),
  logoutUser: () => set({ loggedIn: false, user: null }),
}));

export default useAuthStore;
