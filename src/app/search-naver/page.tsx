"use client";

import { ChangeEvent, useState } from "react";

import IsOpeningSoon from "./components/IsOpeningSoon";
import SearchNaverHeader from "@/components/headers/search-naver-header";
import SearchResultAddressItem from "./components/SearchResultAddressItem";
import SearchResultNaverItem from "./components/SearchResultNaverItem";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useRouter } from "next/navigation";
import { useSearchAddressStore } from "@/stores/search-address-store";
import { useSearchNaverStore } from "@/stores/search-naver-store";

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

const DetailAddressInput = styled.input`
  ${fonts.blackNormal14}
  width: 100%;
  padding: ${pxToVw(12)};
  margin-top: ${pxToVw(8)};
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

const ConfirmButton = styled(SearchButton)`
  position: fixed;
  bottom: ${pxToVw(24)};
  left: ${pxToVw(24)};
  right: ${pxToVw(24)};
  width: auto;
`;

const SelectedAddress = styled.div`
  ${fonts.blackNormal14}
  padding: ${pxToVw(12)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  margin-bottom: ${pxToVw(8)};
`;

export default function SearchNaver() {
  const router = useRouter();
  const [isSelectedAddress, setIsSelectedAddress] = useState(false);
  const [selectedRoadAddr, setSelectedRoadAddr] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const { searchQuery, searchNaverResults, setSearchQuery, searchNaver } =
    useSearchNaverStore((state) => ({
      searchQuery: state.searchQuery,
      searchNaverResults: state.searchResults,
      setSearchQuery: state.setSearchQuery,
      searchNaver: state.search,
    }));

  const { searchAddress, searchAddressResults } = useSearchAddressStore(
    (state) => ({
      searchAddress: state.search,
      searchAddressResults: state.searchResults,
    }),
  );

  const { isOpeningSoon, setStoreRegionAddress } = useJobPostingEditStore(
    (state) => ({
      isOpeningSoon: state.isOpeningSoon,
      setStoreRegionAddress: state.setStoreRegionAddress,
    }),
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      if (isOpeningSoon) {
        await searchAddress(searchQuery || "");
      } else {
        await searchNaver(searchQuery || "");
      }
    } catch (e) {
      // 에러 처리 로직 (예: 사용자에게 알림)
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddressSelect = (roadAddr: string) => {
    setIsSelectedAddress(true);
    setSelectedRoadAddr(roadAddr);
  };

  const handleConfirm = () => {
    // TODO: 선택된 주소와 상세주소를 저장하는 로직 구현
    const fullAddress = `${selectedRoadAddr} ${detailAddress}`;
    setStoreRegionAddress({ roadAddr: fullAddress });
    router.back();
  };

  return (
    <Container>
      <SearchNaverHeader />
      <IsOpeningSoon />
      <InputContainer>
        <SearchInput
          type="text"
          placeholder={
            isOpeningSoon
              ? "오픈예정인 매장의 건물 주소지를 검색 등록해 주세요."
              : "네이버에 등록된 정확한 매장명을 입력해야 검색됩니다."
          }
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
      {!isOpeningSoon ? (
        <>
          <InfoTextContainer>
            <InfoText>
              {`동일 브랜드 매장 검색시 정확한 지점명까지 기입하지 않으면 최대 5개 매장까지만 검색됩니다.`}
            </InfoText>
            <InfoText>{`ex) 00헤어 역삼동`}</InfoText>
          </InfoTextContainer>
          <SearchResultContainer>
            {searchNaverResults.length > 0
              ? searchNaverResults.map((item) => (
                  <SearchResultNaverItem key={item.title} {...item} />
                ))
              : searchQuery && <p>검색 결과가 없습니다.</p>}
          </SearchResultContainer>
        </>
      ) : (
        <SearchResultContainer>
          {isSelectedAddress ? (
            <>
              <SelectedAddress>{selectedRoadAddr}</SelectedAddress>
              <DetailAddressInput
                type="text"
                placeholder="상세 주소를 입력해주세요"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
              <ConfirmButton onClick={handleConfirm}>
                주소 등록하기
              </ConfirmButton>
            </>
          ) : searchAddressResults.length > 0 ? (
            searchAddressResults.map((item) => (
              <SearchResultAddressItem
                key={item.roadAddr}
                {...item}
                onClick={() => handleAddressSelect(item.roadAddr)}
              />
            ))
          ) : (
            searchQuery && <p>검색 결과가 없습니다.</p>
          )}
        </SearchResultContainer>
      )}
    </Container>
  );
}
