import { webviewLogin } from "@/apis/auth";
import { UserModel } from "@/models/user-model";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthState = {
  jwt: string | null;
  userId: string | null;
};

export type AuthActions = {
  login: (userId: string) => Promise<void>;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
  jwt: null,
  userId: null
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...defaultAuthState,

      login: async (userId: string) => {
        if (!userId) {
          throw new Error("userId is required");
        }
        const { data }: { data: UserModel } = await webviewLogin(userId);

        if (data && data.token) {
          set({
            jwt: data.token, // JWT 토큰을 상태에 저장
            userId: String(data.id) // userId를 상태에 저장
          });
        } else {
          throw new Error("Invalid login data");
        }
      },
      logout: () => {
        set({ jwt: null, userId: null });
      }
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
