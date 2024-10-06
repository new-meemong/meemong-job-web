import { deleteResume, getResumes } from "@/apis/resumes";
import { ResponseResultType } from "@/types/response-result-type";
import { ResumeType } from "@/types/resume-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ResumeListState = {
  resumeList: ResumeType[];
  resumeListLoading: boolean;
};

export type ResumeListActions = {
  getResumeList: () => Promise<void>;
  updateResume: (updatedResume: ResumeType) => void;
  deleteResume: (id: string) => Promise<ResponseResultType>;
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
      }
    }),
    {
      name: "resume-list-store",
      getStorage: () => sessionStorage
    }
  )
);
