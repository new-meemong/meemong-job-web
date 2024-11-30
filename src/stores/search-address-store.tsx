import { create } from "zustand";
import { searchAddress } from "@/apis/search-address";

export interface SearchAddressResultItemType {
  roadAddr: string; // 도로명 주소
  jibunAddr: string; // 지번 주소
  engAddr: string; // 영문 주소
  zipNo: string; // 우편번호
  bdNm: string; // 건물명
  roadAddrPart1: string; // 도로명 주소 1
  roadAddrPart2: string; // 도로명 주소 2
}

export interface SearchAddressResponse {
  results: {
    common: {
      errorMessage: string;
      countPerPage: string;
      totalCount: string;
      errorCode: string;
      currentPage: string;
    };
    juso: SearchAddressResultItemType[];
  };
}

export type SearchAddressState = {
  searchQuery: string | null;
  searchResults: SearchAddressResultItemType[];
};

export type SearchAddressActions = {
  search: (query: string) => Promise<void>;
  clear: () => void;
};

export type SearchAddressStore = SearchAddressState & SearchAddressActions;

export const defaultSearchAddressState: SearchAddressState = {
  searchQuery: null,
  searchResults: [],
};

export const useSearchAddressStore = create<SearchAddressStore>((set) => ({
  ...defaultSearchAddressState,
  search: async (query: string) => {
    const res = await searchAddress(query);

    if (!res.results?.juso) {
      set({ searchResults: [] });
      return;
    }

    console.log("moonsae res", res.results.juso);
    set({ searchResults: res.results.juso });
  },
  clear: () => set(defaultSearchAddressState),
}));
