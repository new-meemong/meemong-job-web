import { deleteResume, getResumes } from "@/apis/resumes";
import { ResumeType } from "@/types/resume-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ResumeListState = {
  resumeList: ResumeType[];
  resumeListLoading: boolean;
};

export type ResumeListActions = {
  getResumeList: () => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
};

export type ResumeListStore = ResumeListState & ResumeListActions;

export const defaultResumeListState: ResumeListState = {
  resumeList: [],
  resumeListLoading: false
};

export const useResumeListStore = create(
  persist<ResumeListStore>(
    (set) => ({
      ...defaultResumeListState,
      getResumeList: async () => {
        set({ resumeListLoading: true });
        const res = await getResumes();
        const { dataList } = res;

        set({ resumeList: dataList as ResumeType[] });
        set({ resumeListLoading: false });
      },
      deleteResume: async (id: string) => {
        try {
          await deleteResume(id);
          set((state) => {
            const resumeList = state.resumeList.filter(
              (resume) => resume.id !== id
            );

            return { ...state, resumeList };
          });
        } catch (e) {
          console.error("[deleteResume] failed", e);
        }
      }
    }),
    {
      name: "resume-list-store",
      getStorage: () => sessionStorage
    }
  )
);
