"use client";

import SearchNaverHeader from "@/components/headers/search-naver-header";
import pxToVw from "@/lib/dpi-converter";
import { useSearchNaverStore } from "@/stores/search-naver-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import SearchResultItem from "./components/search-result-item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  width: 100%;
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const SearchInput = styled.input`
  ${fonts.blackNormal14}
  width: 100%;
  padding: ${pxToVw(12)};
  border: ${pxToVw(1)} solid #ccc;
  border-radius: ${pxToVw(4)};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #888;
  }

  &::placeholder {
    ${fonts.greyNormal14}
  }
`;

const SearchButton = styled.button`
  ${fonts.whiteNormal16}
  margin-top: ${pxToVw(12)};
  padding: ${pxToVw(12)};
  width: 100%;
  background-color: ${colors.purplePrimary}; /* 원하는 배경색 */
  color: white;
  border: none;
  border-radius: ${pxToVw(4)};

  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  padding-top: ${pxToVw(24)};
  gap: ${pxToVw(12)};
`;

export default function SearchNaver() {
  const { searchQuery, searchResults, setSearchQuery, search } =
    useSearchNaverStore();
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      await search(searchQuery || "");
    } catch (e) {
      // 에러 처리 로직 (예: 사용자에게 알림)
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Container>
      <SearchNaverHeader />
      <InputContainer>
        <SearchInput
          type="text"
          placeholder="매장명을 입력해주세요"
          value={searchQuery || ""}
          onChange={handleInputChange}
        />
        <SearchButton
          onClick={handleSearch}
          disabled={!searchQuery || isSearching}
        >
          {isSearching ? "검색 중..." : "검색하기"}
        </SearchButton>
      </InputContainer>
      <SearchResultContainer>
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <SearchResultItem key={item.link} {...item} />
            ))
          : searchQuery && <p>검색 결과가 없습니다.</p>}
      </SearchResultContainer>
    </Container>
  );
}
