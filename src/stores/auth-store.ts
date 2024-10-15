import { webviewLogin } from "@/apis/auth";
import { UserModel } from "@/models/user-model";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthState = {
  jwt: string | null;
  userId: string | null;
  UserID: string | null;
  profileImageUri: string | null;
  sex: string | null;
};

export type AuthActions = {
  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  setProfileImageUri: (profileImageUri: string) => void;
  setSex: (sex: string) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
  jwt: null,
  userId: null,
  UserID: null,
  profileImageUri: null,
  sex: null
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

          if (data && data.token) {
            set({
              jwt: data.token, // JWT 토큰을 상태에 저장
              userId: String(data.id) // userId를 상태에 저장
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
        set({ jwt: null, userId: null });
      },
      setProfileImageUri: (profileImageUri: string) => {
        set({ profileImageUri });
      },
      setSex: (sex: string) => {
        set({ sex });
      }
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
