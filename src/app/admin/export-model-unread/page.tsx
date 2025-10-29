"use client";

import {
  DocumentSnapshot,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collectionGroup,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
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
  const [progress, setProgress] = useState<string>("");

  const selectedCollections = useMemo(() => {
    const list: string[] = [];
    if (includeModelMatching) list.push(chatMetaCollections.modelMatching);
    if (includeJobPosting) list.push(chatMetaCollections.jobPosting);
    return list;
  }, [includeModelMatching, includeJobPosting]);

  const fetchUnreadByUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setProgress("");
    try {
      // 1) 컬렉션 그룹에서 모든 메타 문서를 조회하여 사용자별 미읽음 합계 계산
      const userIdToUnreadSum = new Map<string, number>();

      for (let collIdx = 0; collIdx < selectedCollections.length; collIdx++) {
        const collName = selectedCollections[collIdx];
        setProgress(
          `[1/2] Firestore 조회 중... (${collIdx + 1}/${
            selectedCollections.length
          }) - ${collName}`,
        );
        let lastDoc: DocumentSnapshot | null = null;
        let totalFetched = 0;
        const PAGE_SIZE = 500;

        // 페이지네이션으로 데이터 가져오기
        while (true) {
          try {
            const q: Query = lastDoc
              ? query(
                  collectionGroup(db, collName),
                  limit(PAGE_SIZE),
                  startAfter(lastDoc),
                )
              : query(collectionGroup(db, collName), limit(PAGE_SIZE));

            const snap: QuerySnapshot = await getDocs(q);

            if (snap.empty) break;

            snap.forEach((doc: QueryDocumentSnapshot) => {
              const data = doc.data() as Partial<ChannelMetaDoc>;
              const userId = String(data.userId ?? "");
              if (!userId) return;
              const unread = Number(data.unreadCount ?? 0);
              userIdToUnreadSum.set(
                userId,
                (userIdToUnreadSum.get(userId) || 0) + unread,
              );
            });

            totalFetched += snap.size;
            lastDoc = snap.docs[snap.docs.length - 1];

            setProgress(
              `[1/2] Firestore 조회 중... (${collIdx + 1}/${
                selectedCollections.length
              }) - ${collName}: ${totalFetched}개 문서`,
            );

            // 마지막 페이지인 경우 종료
            if (snap.size < PAGE_SIZE) break;

            // 타임아웃 방지를 위해 잠시 대기
            await new Promise((resolve) => setTimeout(resolve, 100));
          } catch (e) {
            console.error(`컬렉션 ${collName} 조회 중 오류:`, e);
            throw e;
          }
        }
      }

      if (userIdToUnreadSum.size === 0) {
        setRows([]);
        setProgress("데이터가 없습니다.");
        setIsLoading(false);
        return;
      }

      // 2) 백엔드 API로 Role 확인 후 Role=1(모델)만 필터링
      const userIds = Array.from(userIdToUnreadSum.keys());
      const totalUsers = userIds.length;

      setProgress(
        `[2/2] Role 확인 중... (0/${totalUsers}) - 총 ${totalUsers}명의 사용자`,
      );

      // 병렬로 조회하되, 과도한 동시요청 방지를 위해 배치 처리
      const batchSize = 25;
      const resultRows: ExportResultRow[] = [];
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        const processed = Math.min(i + batch.length, totalUsers);
        const progressPercent = Math.round((processed / totalUsers) * 100);

        setProgress(
          `[2/2] Role 확인 중... (${processed}/${totalUsers}, ${progressPercent}%) - 모델 ${resultRows.length}명 발견`,
        );
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

      setProgress(`완료! 총 ${resultRows.length}명의 모델 발견`);
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

      {isLoading && progress && (
        <div
          style={{
            padding: 12,
            backgroundColor: "#f5f5f5",
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          {progress}
        </div>
      )}

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
