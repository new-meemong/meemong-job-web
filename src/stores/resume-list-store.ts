import {
  deleteResume,
  getResume,
  getResumeById,
  getResumes
} from "@/apis/resumes";
import { ResponseResultType } from "@/types/response-result-type";
import { ResumeType } from "@/types/resume-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ResumeListState = {
  resumeList: ResumeType[];
  resumeListLoading: boolean;
  resumeFilterQueries: string;

  // 선호 지역
  _preferredStoreRegions: { key: string; value: string }[];
  preferredStoreRegions: string | null;
  preferredStoreRegionSiNames: string | null;
};

export type ResumeListActions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkMyResumeExist: (userId: string) => Promise<ResponseResultType>;
  getResume: (userId: string) => Promise<ResponseResultType>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getResumeList: (queryParams?: Record<string, any>) => Promise<void>;
  updateResume: (updatedResume: ResumeType) => void;
  deleteResume: (id: string) => Promise<ResponseResultType>;
  getResumeFilterQuery: (key: string) => string | null;
  addResumeFilterQuery: (query: string) => void;
  removeResumeFilterQuery: (key: string) => void;
  setPreferredStoreRegions: (regions: { key: string; value: string }[]) => void;
  resetResumeFilterQueries: () => void;
};

export type ResumeListStore = ResumeListState & ResumeListActions;

export const defaultResumeListState: ResumeListState = {
  resumeList: [],
  resumeListLoading: false,
  resumeFilterQueries: "",
  _preferredStoreRegions: [],
  preferredStoreRegions: null,
  preferredStoreRegionSiNames: null
};

export const useResumeListStore = create(
  persist<ResumeListStore>(
    (set, get) => ({
      ...defaultResumeListState,
      checkMyResumeExist: async (userId: string) => {
        try {
          const res = await getResumeById(userId);
          const { dataList } = res;

          if (dataList) {
            return { status: true, data: dataList[0], message: "" };
          } else {
            return { status: false, message: "" };
          }
        } catch (e) {
          console.error("[checkMyResumeExist] failed", e);
          return { status: false, message: "" };
        }
      },
      getResume: async (userId) => {
        const res = await getResume(userId);
        const { data } = res;

        if (data) {
          return { status: true, data, message: "" };
        } else {
          return { status: false, message: "" };
        }
      },
      getResumeList: async (queryParams) => {
        set({ resumeListLoading: true });
        const _queryParams = {
          __cursorOrder: "createdAtDesc",
          ...queryParams
        };
        const res = await getResumes(_queryParams);
        const { dataList } = res;

        set({ resumeList: dataList as ResumeType[] });
        set({ resumeListLoading: false });
      },
      updateResume: (updatedResume) => {
        set((state) => ({
          resumeList: state.resumeList.map((resume) =>
            resume.id === updatedResume.id ? updatedResume : resume
          )
        }));
      },
      deleteResume: async (id: string) => {
        try {
          const res = await deleteResume(id);

          if (res) {
            set((state) => {
              const resumeList = state.resumeList.filter(
                (resume) => resume.id !== id
              );

              return { ...state, resumeList };
            });
            return { status: true, message: "해당 이려서가 삭제되었습니다." };
          }
          return { status: false, message: "삭제에 실패했습니다." };
        } catch (e) {
          console.error("[deleteResume] failed", e);
          return { status: false, message: "삭제에 실패했습니다." };
        }
      },
      getResumeFilterQuery: (key: string) => {
        const state = get();
        const currentQueries = new URLSearchParams(state.resumeFilterQueries);

        return currentQueries.get(key);
      },
      addResumeFilterQuery: (query) => {
        set((state) => {
          const currentQueries = new URLSearchParams(state.resumeFilterQueries);
          const [key, value] = query.split("=");

          currentQueries.set(key, value);

          return { resumeFilterQueries: `${currentQueries.toString()}` };
        });
      },
      removeResumeFilterQuery: (key) => {
        set((state) => {
          const currentQueries = new URLSearchParams(state.resumeFilterQueries);

          currentQueries.delete(key);

          return { resumeFilterQueries: `${currentQueries.toString()}` };
        });
      },
      setPreferredStoreRegions: (regions) => {
        // 모든 '시'만 추출 (state에 들어갈 시 목록)
        const allSiNames = regions.map((item) => item.key.split(" ")[0]);
        const uniqueSiNames = Array.from(new Set(allSiNames));

        // '전체'가 포함된 아이템을 제외하고 구/군 정보만 추출
        const preferredStoreRegions = regions
          .filter((item) => !item.value.includes("전체"))
          .map((item) => item.key)
          .join(",");

        // currentQueries에 포함될 preferredStoreRegionSiNames (preferredStoreRegions에 없는 '시'만 필터링)
        const preferredStoreRegionsSiNamesSet = new Set(
          preferredStoreRegions.split(",").map((region) => region.split(" ")[0])
        );
        const filteredSiNamesForQuery = uniqueSiNames
          .filter((siName) => !preferredStoreRegionsSiNamesSet.has(siName))
          .join(",");

        set(() => {
          // 쿼리에 preferredStoreRegions와 filteredSiNamesForQuery 추가 또는 삭제
          if (filteredSiNamesForQuery) {
            get().addResumeFilterQuery(
              `preferredStoreRegionSiNames=${filteredSiNamesForQuery}`
            );
          } else {
            get().removeResumeFilterQuery("preferredStoreRegionSiNames");
          }

          if (preferredStoreRegions) {
            get().addResumeFilterQuery(
              `preferredStoreRegions=${preferredStoreRegions}`
            );
          } else {
            get().removeResumeFilterQuery("preferredStoreRegions");
          }

          return {
            _preferredStoreRegions: regions,
            preferredStoreRegionSiNames: uniqueSiNames.join(","), // state에 모든 '시' 저장
            preferredStoreRegions: preferredStoreRegions // state에 모든 '구/군' 저장
          };
        });
      },
      resetResumeFilterQueries: () => {
        const appliedRole = get().getResumeFilterQuery("appliedRole");
        set({ resumeFilterQueries: `appliedRole=${appliedRole}` });
      }
    }),
    {
      name: "resume-list-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
