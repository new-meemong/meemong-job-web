import { apiFetch } from "@/apis/fetch";

/**
 * 안읽은 메시지 수 업데이트 API 응답 타입
 */
export interface UpdateChattingUnreadCountResponse {
  id: number;
  totalUnreadCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

/**
 * 안읽은 메시지 수 업데이트
 * @param userId - 업데이트할 사용자 ID
 * @param unreadCount - 변경될 값 (음수는 차감, 양수는 합)
 */
export const updateChattingUnreadCount = async (
  userId: number,
  unreadCount: number,
): Promise<{ data: UpdateChattingUnreadCountResponse }> => {
  try {
    const url = `/api/v1/chatting-unread-counts`;
    const body = {
      userId,
      unreadCount,
    };
    return await apiFetch(url, "POST", body);
  } catch (error) {
    console.error("[updateChattingUnreadCount] failed", error);
    throw error;
  }
};

/**
 * 안읽은 메시지 수 업데이트 Hook
 * React Query를 사용하지 않고 단순 함수로 제공
 */
export default function useUpdateChattingUnreadCount() {
  return {
    mutate: async (userId: number, unreadCount: number) => {
      try {
        return await updateChattingUnreadCount(userId, unreadCount);
      } catch (error) {
        console.error("Failed to update chatting unread count:", error);
        throw error;
      }
    },
    mutateAsync: async (userId: number, unreadCount: number) => {
      return await updateChattingUnreadCount(userId, unreadCount);
    },
    isPending: false,
    error: null,
    isSuccess: false,
  };
}
