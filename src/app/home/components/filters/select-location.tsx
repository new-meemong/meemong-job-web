import ArrowRightPurpleIcon from "@/components/icons/arrow-right-purple-icon";
import CloseCircleGreyIcon from "@/components/icons/close-circle-grey-icon";
import { convertToShortRegionFromQuery } from "@/lib/convert-region";
import pxToVw from "@/lib/dpi-converter";
import { useAppStateStore } from "@/stores/app-state-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { locationKeysAndShorts } from "@/types/location-type";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
`;

const Label = styled.span`
  ${fonts.purplePrimarySemi14}
  padding: ${pxToVw(12)} ${pxToVw(0)};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: ${pxToVw(8)};
`;
const Location = styled.div`
  ${fonts.purplePrimaryBold12}
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: ${pxToVw(194.5)};
  height: ${pxToVw(38)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  border-radius: ${pxToVw(5)};
  padding: ${pxToVw(12)} ${pxToVw(6)};
`;

const LocationButton = styled(Link)`
  ${fonts.purplePrimaryBold12}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${pxToVw(115.5)};
  height: ${pxToVw(38)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  border-radius: ${pxToVw(5)};
  padding: ${pxToVw(12)} ${pxToVw(6)};
`;

const CancelContainer = styled.div`
  display: flex;
  padding-top: ${pxToVw(4)};
  gap: ${pxToVw(12)};
  flex-wrap: wrap;
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToVw(2)};
`;

const CancelText = styled.span`
  ${fonts.purplePrimarySemi14}
`;

const SelectLocation = () => {
  // 매장 취업하기, 인재 찾아보기
  const { homeTopTab } = useAppStateStore((state) => ({
    homeTopTab: state.homeTopTab
  }));
  const { getResumeFilterQuery } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    resumeFilterQueries: state.resumeFilterQueries
  }));
  let selectedLocationList: string[] = [];
  const href =
    homeTopTab === "jobPosting"
      ? "/select-location?target=jobPostingList"
      : "/select-location?target=resumeList";

  if (homeTopTab === "resume") {
    selectedLocationList = convertToShortRegionFromQuery(
      getResumeFilterQuery("preferredStoreRegions"),
      getResumeFilterQuery("preferredStoreRegionSiNames")
    );
  }

  const handleCancelClick = (label: string) => {
    if (homeTopTab === "resume") {
      const {
        removeResumeFilterQuery,
        getResumeFilterQuery,
        addResumeFilterQuery
      } = useResumeListStore.getState();

      // 시를 삭제하는 경우
      if (label.includes("전체")) {
        const siQuery = getResumeFilterQuery("preferredStoreRegionSiNames");

        if (siQuery) {
          const siKeyList = siQuery.split(",");

          if (siKeyList.length === 1) {
            // siList가 1이면 preferredStoreRegionSiNames query 삭제
            removeResumeFilterQuery("preferredStoreRegionSiNames");
          } else {
            // siList가 1보다 크면 viewString이 label과 같은 항목을 제거하고 나머지 siKeyList를 다시 추가
            const updatedSiKeyList = siKeyList.filter(
              (siKey) =>
                !locationKeysAndShorts.find(
                  (location) =>
                    location.viewString === label && location.key === siKey
                )
            );

            addResumeFilterQuery(
              `preferredStoreRegionSiNames=${updatedSiKeyList.join(",")}`
            );
          }
        }
      }
      // 구를 삭제하는 경우
      else {
        const guQuery = getResumeFilterQuery("preferredStoreRegions");

        if (guQuery) {
          const guKeyList = guQuery.split(",");

          if (guKeyList.length === 1) {
            // guList가 1이면 preferredStoreRegions query 삭제
            removeResumeFilterQuery("preferredStoreRegions");
          } else {
            // guList가 1보다 크면 viewString이 label과 같은 항목을 제거하고 나머지 guKeyList를 다시 추가
            const updatedGuKeyList = guKeyList.filter(
              (guKey) =>
                !locationKeysAndShorts.find(
                  (location) =>
                    location.viewString === label && location.key === guKey
                )
            );

            addResumeFilterQuery(
              `preferredStoreRegions=${updatedGuKeyList.join(",")}`
            );
          }
        }
      }
    }
  };

  return (
    <Container>
      <Label>지역</Label>
      <ButtonContainer>
        <Location>
          {selectedLocationList.length === 0
            ? "전체"
            : selectedLocationList.map((label, index) => (
                <React.Fragment key={label}>
                  {label}
                  {index < selectedLocationList.length - 1 && ",\u00A0"}
                </React.Fragment>
              ))}
        </Location>
        <LocationButton href={href}>
          지역선택하기
          <ArrowRightPurpleIcon />
        </LocationButton>
      </ButtonContainer>
      <CancelContainer>
        {selectedLocationList.map((label, index) => (
          <CancelButton key={index} onClick={() => handleCancelClick(label)}>
            <CancelText>{label}</CancelText>
            <CloseCircleGreyIcon />
          </CancelButton>
        ))}
      </CancelContainer>
    </Container>
  );
};

export default SelectLocation;
