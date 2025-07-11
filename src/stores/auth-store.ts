import { createJSONStorage, persist } from "zustand/middleware";

import { UserModel } from "@/models/user-model";
import { create } from "zustand";
import { webviewLogin } from "@/apis/auth";

export type AuthState = {
  jwt: string | null;
  userId: string | null;
  profileImageUri: string | null;
  sex: string | null;
  user: UserModel | null;
};

export type AuthActions = {
  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  setProfileImageUri: (profileImageUri: string) => void;
  setSex: (sex: string) => void;
  setJwt: (jwt: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
  jwt: null,
  userId: null,
  profileImageUri: null,
  sex: null,
  user: null,
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...defaultAuthState,
      login: async (userId: string) => {
        try {
          if (!userId) {
            throw new Error("userId is required");
          }

          const { data }: { data: UserModel } = await webviewLogin(userId);
          console.log("moonsae login data", data);
          if (data && data.token) {
            set({
              jwt: data.token, // JWT 토큰을 상태에 저장
              userId: String(data.id), // userId를 상태에 저장
              user: data,
            });

            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.error("[login] error", e);
          return false;
        }
      },
      logout: () => {
        set({ jwt: null, userId: null, user: null });
      },
      setProfileImageUri: (profileImageUri: string) => {
        set({ profileImageUri });
      },
      setSex: (sex: string) => {
        set({ sex });
      },
      setJwt: (jwt: string) => {
        const cleanJwt = jwt.replace(/^["']+|["']+$/g, "");
        set({ jwt: cleanJwt });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
