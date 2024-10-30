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
  -webkit-tap-highlight-color: transparent;

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

const InfoTextContainer = styled.div`
  padding-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(4)};
`;

const InfoText = styled.div`
  ${fonts.redNormal14}
  white-space: pre-line;
`;

export default function SearchNaver() {
  const { searchQuery, searchResults, setSearchQuery, search } =
    useSearchNaverStore((state) => ({
      searchQuery: state.searchQuery,
      searchResults: state.searchResults,
      setSearchQuery: state.setSearchQuery,
      search: state.search
    }));
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
          placeholder="네이버에 등록된 정확한 매장명을 입력해야 검색됩니다."
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
      <InfoTextContainer>
        <InfoText>
          {`동일 브랜드 매장 검색시 정확한 지점명까지 기입하지 않으면 최대 5개 매장까지만 검색됩니다.`}
        </InfoText>
        <InfoText>{`ex) 00헤어 역삼동`}</InfoText>
      </InfoTextContainer>
      <SearchResultContainer>
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <SearchResultItem key={item.title} {...item} />
            ))
          : searchQuery && <p>검색 결과가 없습니다.</p>}
      </SearchResultContainer>
    </Container>
  );
}
