import { searchNaver } from "@/apis/search-naver";
import { create } from "zustand";

export interface SearchResultItemType {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
}

export type SearchNaverState = {
  searchQuery: string | null;
  searchResults: SearchResultItemType[];
};

export type SearchNaverActions = {
  setSearchQuery: (query: string) => void;
  search: (searchQuery: string) => void;
  clear: () => void;
};

export type SearchNaverStore = SearchNaverState & SearchNaverActions;

export const defaultSearchNaverState: SearchNaverState = {
  searchQuery: null,
  searchResults: []
};

export const useSearchNaverStore = create<SearchNaverStore>((set) => ({
  ...defaultSearchNaverState,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  search: async (searchQuery: string) => {
    if (!searchQuery) {
      throw new Error("searchQuery is required");
    }

    const res = await searchNaver(`${searchQuery}`);

    const { items } = res;
    const cleanedItems = items.map((item: SearchResultItemType) => ({
      ...item,
      title: item.title.replace(/<\/?[^>]+(>|$)/g, "") // 모든 HTML 태그를 제거
    }));

    set({ searchResults: cleanedItems });
  },

  clear: () => {
    set({ searchQuery: null, searchResults: [] });
  }
}));
