import { deleteResume, getResumes } from "@/apis/resumes";
import { ResponseResultType } from "@/types/response-result-type";
import { ResumeType } from "@/types/resume-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  getResumeList: () => Promise<void>;
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
  resumeFilterQueries: "?",
  _preferredStoreRegions: [],
  preferredStoreRegions: null,
  preferredStoreRegionSiNames: null
};

export const useResumeListStore = create(
  persist<ResumeListStore>(
    (set, get) => ({
      ...defaultResumeListState,
      getResumeList: async () => {
        set({ resumeListLoading: true });
        const res = await getResumes();
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

          return { resumeFilterQueries: `?${currentQueries.toString()}` };
        });
      },
      removeResumeFilterQuery: (key) => {
        set((state) => {
          const currentQueries = new URLSearchParams(state.resumeFilterQueries);

          currentQueries.delete(key);

          return { resumeFilterQueries: `?${currentQueries.toString()}` };
        });
      },
      setPreferredStoreRegions: (regions) => {
        const preferredStoreRegionSiNames = Array.from(
          new Set(regions.map((item) => item.key.split(" ")[0]))
        ).join(",");
        const preferredStoreRegions = regions
          .filter((item) => !item.value.includes("전체"))
          .map((item) => item.key)
          .join(",");

        set((state) => {
          // 현재의 resumeFilterQueries를 가져와 URLSearchParams로 처리
          const currentQueries = new URLSearchParams(state.resumeFilterQueries);

          // 쿼리에 preferredStoreRegions와 preferredStoreRegionSiNames를 추가
          if (preferredStoreRegionSiNames) {
            currentQueries.set(
              "preferredStoreRegionSiNames",
              preferredStoreRegionSiNames
            );
          } else {
            currentQueries.delete("preferredStoreRegionSiNames");
          }
          if (preferredStoreRegions) {
            currentQueries.set("preferredStoreRegions", preferredStoreRegions);
          } else {
            currentQueries.delete("preferredStoreRegions");
          }

          return {
            _preferredStoreRegions: regions,
            preferredStoreRegionSiNames,
            preferredStoreRegions: preferredStoreRegions,
            resumeFilterQueries: `?${currentQueries.toString()}` // 변경된 쿼리 문자열 업데이트
          };
        });
      },
      resetResumeFilterQueries: () => {
        const appliedRole = get().getResumeFilterQuery("appliedRole");
        set({ resumeFilterQueries: `?appliedRole=${appliedRole}` });
      }
    }),
    {
      name: "resume-list-store",
      getStorage: () => sessionStorage
    }
  )
);
