import { getMyJobPostings } from "@/apis/job-postings";
import { JobPostingType } from "@/types/job-posting-type";
import { create } from "zustand";

type MyJobPostingListState = {
  myJobPostingList: JobPostingType[];
};

type MyJobPostingListActions = {
  getMyJobPostingList: () => Promise<void>;
};

type MyJobPostingListStore = MyJobPostingListState & MyJobPostingListActions;

const defaultMyJobPostingListState: MyJobPostingListState = {
  myJobPostingList: []
};

export const useMyJobPostingListStore = create<MyJobPostingListStore>(
  (set) => ({
    ...defaultMyJobPostingListState,
    getMyJobPostingList: async () => {
      const _queryParams = {
        // __cursorOrder: "createdAtDesc"
      };

      const res = await getMyJobPostings(_queryParams);
      const { dataList } = res;

      if (dataList) {
        set({ myJobPostingList: dataList });
      }
    }
  })
);
