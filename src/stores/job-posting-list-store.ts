import { deleteJobPosting, getJobPostings } from "@/apis/job-postings";
import { parseQueryString } from "@/lib/parse-query-string";
import { JobPostingType } from "@/types/job-posting-type";
import { ResponseResultType } from "@/types/response-result-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type JobPostingListState = {
  jobPostingList: JobPostingType[];
  jobPostingListLoading: boolean;
  jobPostingFilterQueries: string;

  // 선호 지역
  _postingRegions: { key: string; value: string }[];
  postingRegions: string | null;
  postingRegionSiNames: string | null;
};

export type JobPostingListActions = {
  getJobPostingList: (queryParams?: Record<string, any>) => Promise<void>;
  deleteJobPosting: (id: string) => Promise<ResponseResultType>;
  updateJobPosting: (updatedJobPosting: JobPostingType) => void;
  getJobPostingFilterQuery: (key: string) => string | null;
  addJobPostingFilterQuery: (query: string) => void;
  removeJobPostingFilterQuery: (key: string) => void;
  setPostingRegions: (regions: { key: string; value: string }[]) => void;
  resetJobPostingFilterQueries: () => void;
};

export type JobPostingListStore = JobPostingListState & JobPostingListActions;

export const defaultJobPostingListState: JobPostingListState = {
  jobPostingList: [],
  jobPostingListLoading: false,
  jobPostingFilterQueries: "",
  _postingRegions: [],
  postingRegions: null,
  postingRegionSiNames: null
};

export const useJobPostingListStore = create(
  persist<JobPostingListStore>(
    (set, get) => ({
      ...defaultJobPostingListState,
      getJobPostingList: async (queryParams) => {
        set({ jobPostingListLoading: true });
        const _queryParams = {
          __cursorOrder: "createdAtDesc",
          ...queryParams
        };
        const res = await getJobPostings(_queryParams);
        const { dataList } = res;

        set({ jobPostingList: dataList as JobPostingType[] });
        set({ jobPostingListLoading: false });
      },
      updateJobPosting: (updatedJobPosting) => {
        set((state) => ({
          jobPostingList: state.jobPostingList.map((jobPosting) =>
            jobPosting.id === updatedJobPosting.id
              ? updatedJobPosting
              : jobPosting
          )
        }));
      },
      deleteJobPosting: async (id: string) => {
        try {
          const res = await deleteJobPosting(id);

          if (res) {
            set((state) => {
              const jobPostingList = state.jobPostingList.filter(
                (jobPosting) => jobPosting.id !== id
              );

              return { ...state, jobPostingList };
            });
            return { status: true, message: "해당 공고가 삭제되었습니다." };
          }
          return { status: false, message: "삭제에 실패했습니다." };
        } catch (e) {
          console.error("[deleteJobPosting] failed", e);
          return { status: false, message: "삭제에 실패했습니다." };
        }
      },
      getJobPostingFilterQuery: (key: string) => {
        const state = get();
        const currentQueries = new URLSearchParams(
          state.jobPostingFilterQueries
        );

        return currentQueries.get(key);
      },
      addJobPostingFilterQuery: (query) => {
        set((state) => {
          const currentQueries = new URLSearchParams(
            state.jobPostingFilterQueries
          );
          const [key, value] = query.split("=");

          currentQueries.set(key, value);

          return { jobPostingFilterQueries: `${currentQueries.toString()}` };
        });
      },
      removeJobPostingFilterQuery: (key) => {
        set((state) => {
          const currentQueries = new URLSearchParams(
            state.jobPostingFilterQueries
          );

          currentQueries.delete(key);

          return { jobPostingFilterQueries: `${currentQueries.toString()}` };
        });
      },
      setPostingRegions: (regions) => {
        // 모든 '시'만 추출 (state에 들어갈 시 목록)
        const allSiNames = regions.map((item) => item.key.split(" ")[0]);
        const uniqueSiNames = Array.from(new Set(allSiNames));

        const postingRegions = regions
          .filter((item) => !item.value.includes("전체"))
          .map((item) => item.key)
          .join(",");

        // currentQueries에 포함될 postingRegionSiNames (postingRegions에 없는 '시'만 필터링)
        const postingRegionsSiNamesSet = new Set(
          postingRegions.split(",").map((region) => region.split(" ")[0])
        );
        const filteredSiNamesForQuery = uniqueSiNames
          .filter((siName) => !postingRegionsSiNamesSet.has(siName))
          .join(",");

        set((state) => {
          // currentQueries에 postingRegions와 filteredSiNamesForQuery 추가 또는 삭제
          if (filteredSiNamesForQuery) {
            get().addJobPostingFilterQuery(
              `postingRegionSiNames=${filteredSiNamesForQuery}`
            );
          } else {
            get().removeJobPostingFilterQuery("postingRegionSiNames");
          }
          if (postingRegions) {
            get().addJobPostingFilterQuery(`postingRegions=${postingRegions}`);
          } else {
            get().removeJobPostingFilterQuery("postingRegions");
          }

          return {
            _postingRegions: regions,
            postingRegionSiNames: uniqueSiNames.join(","), // state에 모든 '시' 저장
            postingRegions: postingRegions // state에 모든 '구/군' 저장
          };
        });
      },
      resetJobPostingFilterQueries: () => {
        const role = get().getJobPostingFilterQuery("role");
        set({
          postingRegions: null,
          postingRegionSiNames: null,
          _postingRegions: [],
          jobPostingFilterQueries: `role=${role}`
        });
      }
    }),
    {
      name: "job-posting-list-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
