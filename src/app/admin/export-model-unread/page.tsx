"use client";

import { collectionGroup, getDocs } from "firebase/firestore";
import { useCallback, useMemo, useState } from "react";

import { db } from "@/lib/firebase";
import { getUser } from "@/apis/user";

type ChannelMetaDoc = {
  userId: string;
  unreadCount: number;
};

type ExportResultRow = {
  userId: string;
  totalUnreadCount: number;
};

const chatMetaCollections = {
  modelMatching: "userModelMatchingChatChannels",
  jobPosting: "userJobPostingChatChannels",
} as const;

export default function ExportModelUnreadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [includeModelMatching, setIncludeModelMatching] = useState(true);
  const [includeJobPosting, setIncludeJobPosting] = useState(false);
  const [rows, setRows] = useState<ExportResultRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const selectedCollections = useMemo(() => {
    const list: string[] = [];
    if (includeModelMatching) list.push(chatMetaCollections.modelMatching);
    if (includeJobPosting) list.push(chatMetaCollections.jobPosting);
    return list;
  }, [includeModelMatching, includeJobPosting]);

  const fetchUnreadByUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1) 컬렉션 그룹에서 모든 메타 문서를 조회하여 사용자별 미읽음 합계 계산
      const userIdToUnreadSum = new Map<string, number>();

      for (const collName of selectedCollections) {
        const snap = await getDocs(collectionGroup(db, collName));
        snap.forEach((doc) => {
          const data = doc.data() as Partial<ChannelMetaDoc>;
          const userId = String(data.userId ?? "");
          if (!userId) return;
          const unread = Number(data.unreadCount ?? 0);
          userIdToUnreadSum.set(
            userId,
            (userIdToUnreadSum.get(userId) || 0) + unread,
          );
        });
      }

      if (userIdToUnreadSum.size === 0) {
        setRows([]);
        setIsLoading(false);
        return;
      }

      // 2) 백엔드 API로 Role 확인 후 Role=1(모델)만 필터링
      const userIds = Array.from(userIdToUnreadSum.keys());

      // 병렬로 조회하되, 과도한 동시요청 방지를 위해 배치 처리
      const batchSize = 25;
      const resultRows: ExportResultRow[] = [];
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        const responses = await Promise.all(
          batch.map(async (uid) => {
            try {
              const res = await getUser(uid);
              return { uid, res } as const;
            } catch (e) {
              return { uid, res: { error: true } } as const;
            }
          }),
        );

        for (const { uid, res } of responses) {
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          if ((res as any)?.error) continue;
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          const data = (res as any).data;
          // 백엔드 모델에서 Role은 string | null로 정의됨. "1"이 모델, "2"가 디자이너
          const roleStr = (data?.Role ?? null) as string | null;
          const roleNum = roleStr != null ? Number(roleStr) : NaN;
          if (roleNum === 1) {
            resultRows.push({
              userId: uid,
              totalUnreadCount: userIdToUnreadSum.get(uid) || 0,
            });
          }
        }
      }

      // 3) 정렬: 미읽음 내림차순, 동일하면 userId 오름차순
      resultRows.sort((a, b) => {
        if (b.totalUnreadCount !== a.totalUnreadCount) {
          return b.totalUnreadCount - a.totalUnreadCount;
        }
        return a.userId.localeCompare(b.userId);
      });

      setRows(resultRows);
    } catch (e) {
      setError("데이터 수집 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCollections]);

  const toCsv = useCallback((items: ExportResultRow[]) => {
    const header = ["userId", "totalUnreadCount"];
    const lines = [header.join(",")];
    for (const r of items) {
      lines.push([r.userId, String(r.totalUnreadCount)].join(","));
    }
    return lines.join("\n");
  }, []);

  const downloadCsv = useCallback(() => {
    const csv = toCsv(rows);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `models-unread-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [rows, toCsv]);

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>
        모델(ROLE=1) 미읽음 합계 CSV 내보내기
      </h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={includeModelMatching}
            onChange={(e) => setIncludeModelMatching(e.target.checked)}
          />
          modelMatching 포함
        </label>
        <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={includeJobPosting}
            onChange={(e) => setIncludeJobPosting(e.target.checked)}
          />
          jobPosting 포함
        </label>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={fetchUnreadByUser} disabled={isLoading}>
          {isLoading ? "집계 중..." : "집계 실행"}
        </button>
        <button onClick={downloadCsv} disabled={isLoading || rows.length === 0}>
          CSV 다운로드
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {rows.length > 0 && (
        <div style={{ fontSize: 12, color: "#666" }}>
          {`결과: ${rows.length}명 (표시는 상위 20명)`}
        </div>
      )}

      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {rows.slice(0, 20).map((r) => (
          <li key={r.userId}>
            {r.userId} — {r.totalUnreadCount}
          </li>
        ))}
      </ul>
    </div>
  );
}
