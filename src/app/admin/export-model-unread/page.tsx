"use client";

import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { useCallback, useState } from "react";

import { db } from "@/lib/firebase";

type ChannelMetaDoc = {
  userId: string;
  unreadCount: number;
};

type CsvRow = {
  uid: string;
  가입일: string;
  최근접속일: string;
  이메일: string;
  전화번호: string;
};

type ExportResultRow = CsvRow & {
  안읽은채팅수: number;
};

const BATCH_SIZE = 1000;
const PARALLEL_SIZE = 50; // 병렬 처리 개수

export default function ExportModelUnreadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<ExportResultRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // CSV 파싱 함수
  const parseCsv = (csvText: string): CsvRow[] => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");
    const rows: CsvRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      rows.push({
        uid: values[0],
        가입일: values[1],
        최근접속일: values[2],
        이메일: values[3],
        전화번호: values[4] || "NULL",
      });
    }
    return rows;
  };

  // 특정 userId의 unreadCount 합계 조회
  const fetchUnreadForUser = async (userId: string): Promise<number> => {
    try {
      const channelsRef = collection(
        db,
        "users",
        userId,
        "userModelMatchingChatChannels",
      );
      const snap = await getDocs(query(channelsRef));

      let total = 0;
      snap.forEach((doc) => {
        const data = doc.data() as Partial<ChannelMetaDoc>;
        total += Number(data.unreadCount ?? 0);
      });
      return total;
    } catch (e) {
      console.error(`User ${userId} 조회 실패:`, e);
      return 0;
    }
  };

  const fetchUnreadByUser = useCallback(async () => {
    if (!csvFile) {
      setError("CSV 파일을 먼저 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress("");
    setTotalProcessed(0);
    setRows([]);

    try {
      // 1) CSV 파일 읽기
      setProgress("CSV 파일 읽는 중...");
      const csvText = await csvFile.text();
      const csvRows = parseCsv(csvText);

      setTotalUsers(csvRows.length);
      setProgress(`CSV 로드 완료: 총 ${csvRows.length}명`);

      const allResults: ExportResultRow[] = [];

      // 2) 1000명씩 배치 처리
      for (let batchIdx = 0; batchIdx < csvRows.length; batchIdx += BATCH_SIZE) {
        const batch = csvRows.slice(batchIdx, batchIdx + BATCH_SIZE);
        const batchNum = Math.floor(batchIdx / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(csvRows.length / BATCH_SIZE);

        setProgress(
          `배치 ${batchNum}/${totalBatches} 처리 중... (${batchIdx}/${csvRows.length}명)`,
        );

        // 3) 각 배치 내에서 병렬 처리 (50명씩)
        const batchResults: ExportResultRow[] = [];
        for (let i = 0; i < batch.length; i += PARALLEL_SIZE) {
          const parallel = batch.slice(i, i + PARALLEL_SIZE);

          const results = await Promise.all(
            parallel.map(async (row) => {
              const unreadCount = await fetchUnreadForUser(row.uid);
              return {
                ...row,
                안읽은채팅수: unreadCount,
              };
            }),
          );

          batchResults.push(...results);

          const processed = batchIdx + i + parallel.length;
          const percent = Math.round((processed / csvRows.length) * 100);
          setTotalProcessed(processed);
          setProgress(
            `배치 ${batchNum}/${totalBatches} 처리 중... (${processed}/${csvRows.length}명, ${percent}%)`,
          );

          // 과부하 방지 delay
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        allResults.push(...batchResults);
        setRows([...allResults]); // 중간 결과 표시
      }

      setProgress(`완료! 총 ${allResults.length}명 처리 완료`);
      setRows(allResults);
    } catch (e) {
      setError("데이터 수집 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [csvFile]);

  const toCsv = useCallback((items: ExportResultRow[]) => {
    const header = ["uid", "가입일", "최근접속일", "이메일", "전화번호", "안읽은채팅수"];
    const lines = [header.join(",")];
    for (const r of items) {
      lines.push(
        [
          r.uid,
          r.가입일,
          r.최근접속일,
          r.이메일,
          r.전화번호,
          String(r.안읽은채팅수),
        ].join(","),
      );
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
        모델 미읽은 채팅 수 집계 (CSV 기반)
      </h2>

      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 14, fontWeight: 500 }}>
          CSV 파일 선택:
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setCsvFile(file);
              setError(null);
            }
          }}
          disabled={isLoading}
        />
        {csvFile && (
          <div style={{ fontSize: 12, color: "#666" }}>
            선택된 파일: {csvFile.name} ({Math.round(csvFile.size / 1024)}KB)
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={fetchUnreadByUser} disabled={isLoading || !csvFile}>
          {isLoading ? "집계 중..." : "집계 실행"}
        </button>
        <button onClick={downloadCsv} disabled={isLoading || rows.length === 0}>
          CSV 다운로드
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {progress && (
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

      {totalUsers > 0 && (
        <div style={{ fontSize: 12, color: "#666" }}>
          진행률: {totalProcessed}/{totalUsers}명 (
          {Math.round((totalProcessed / totalUsers) * 100)}%)
        </div>
      )}

      {rows.length > 0 && (
        <div style={{ fontSize: 12, color: "#666" }}>
          {`결과: ${rows.length}명 (표시는 상위 20명)`}
        </div>
      )}

      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {rows.slice(0, 20).map((r) => (
          <li key={r.uid}>
            {r.uid} — {r.이메일} — 안읽은채팅: {r.안읽은채팅수}
          </li>
        ))}
      </ul>
    </div>
  );
}
