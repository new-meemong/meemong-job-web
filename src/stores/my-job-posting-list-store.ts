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
  (set, get) => ({
    ...defaultMyJobPostingListState,
    getMyJobPostingList: async () => {
      // fetch job posting list
    }
  })
);
