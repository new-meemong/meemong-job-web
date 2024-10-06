import { deleteResume, getResumes } from "@/apis/resumes";
import { ResponseResultType } from "@/types/response-result-type";
import { ResumeType } from "@/types/resume-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ResumeListState = {
  resumeList: ResumeType[];
  resumeListLoading: boolean;
  resumeFilterQueries: string;
};

export type ResumeListActions = {
  getResumeList: () => Promise<void>;
  updateResume: (updatedResume: ResumeType) => void;
  deleteResume: (id: string) => Promise<ResponseResultType>;
  getResumeFilterQuery: (key: string) => string | null;
  addResumeFilterQuery: (query: string) => void;
  removeResumeFilterQuery: (key: string) => void;
};

export type ResumeListStore = ResumeListState & ResumeListActions;

export const defaultResumeListState: ResumeListState = {
  resumeList: [],
  resumeListLoading: false,
  resumeFilterQueries: "?"
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
      }
    }),
    {
      name: "resume-list-store",
      getStorage: () => sessionStorage
    }
  )
);
