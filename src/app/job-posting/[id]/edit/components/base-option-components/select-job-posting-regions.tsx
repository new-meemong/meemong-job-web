import { ErrorMessage } from "@/components/error-message";
import ArrowRightGreyIcon from "@/components/icons/arrow-right-grey-icon";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { siNmShort } from "@/types/location-type";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${pxToVw(12)};
  padding: ${pxToVw(8)};
`;

const HeaderLabel = styled.span`
  ${fonts.purplePrimarySemi14}
  padding: ${pxToVw(8)} 0;
`;

const HeaderSubLabel = styled.span`
  ${fonts.purplePrimarySemi12}
  padding-left: ${pxToVw(4)};
`;

const ContentContainer = styled.div`
  display: flex;
  padding-top: ${pxToVw(8)};
  padding-bottom: ${pxToVw(8)};
  gap: ${pxToVw(5)};
`;

const Location = styled.div<{ $hasError: boolean }>`
  ${fonts.blackNormal12}
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: ${pxToVw(206)};
  height: ${pxToVw(40)};
  border: ${pxToVw(1)} solid
    ${({ $hasError }) => ($hasError ? `${colors.red}` : `${colors.grey}`)};
  border-radius: ${pxToVw(5)};
  padding: ${pxToVw(12)} ${pxToVw(6)};
`;

const LocationPlaceHolder = styled.span`
  ${fonts.greyNormal12}
`;

const LocationButton = styled(Link)<{ $hasError: boolean }>`
  ${fonts.greyNormal12}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${pxToVw(115)};
  height: ${pxToVw(40)};
  border: ${pxToVw(1)} solid
    ${({ $hasError }) => ($hasError ? `${colors.red}` : `${colors.grey}`)};
  border-radius: ${pxToVw(5)};
  padding: ${pxToVw(12)} ${pxToVw(6)};
`;

// const CancelContainer = styled.div`
//   display: flex;
//   padding-top: ${pxToVw(4)};
//   gap: ${pxToVw(12)};
//   flex-wrap: wrap;
// `;

// const CancelButton = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${pxToVw(2)};
// `;

// const CancelText = styled.span`
//   ${fonts.purplePrimarySemi14}
// `;

const SelectJobPostingRegions = () => {
  const { _postingRegions, hasDesignerOptionNull, hasInternOptionNull, role } =
    useJobPostingEditStore((state) => ({
      _postingRegions: state._postingRegions,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull,
      role: state.role
    }));

  const convertRegions = _postingRegions?.map((item) => {
    if (item && item.key) {
      const siKey = item.key.split(" ")[0]; // 시/도를 추출
      const siName = siNmShort.find((si) => si.key === siKey)?.value;
      const district = item.value; // 구/군 이름

      return district.includes("전체")
        ? `${district}`
        : `${siName} ${district}`;
    }
    return "";
  });

  let hasError = false;
  if (role === "디자이너") {
    hasError = !convertRegions.length && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = !convertRegions.length && hasInternOptionNull;
  }

  return (
    <Container>
      <HeaderLabel>공고 노출 지역</HeaderLabel>
      <HeaderSubLabel>다른 지역도 모집 및 선택 가능합니다.</HeaderSubLabel>
      <ContentContainer>
        <Location $hasError={hasError}>
          {convertRegions.length === 0 ? (
            <LocationPlaceHolder>최소 1개 ~ 최대 3개 선택</LocationPlaceHolder>
          ) : (
            convertRegions.map((label, index) => (
              <React.Fragment key={label}>
                {label}
                {index < convertRegions.length - 1 && ",\u00A0"}
              </React.Fragment>
            ))
          )}
        </Location>
        <LocationButton
          href="/select-location?target=jobPostingEdit"
          $hasError={hasError}
        >
          지역선택하기
          <ArrowRightGreyIcon />
        </LocationButton>
      </ContentContainer>
      {hasError && <ErrorMessage>지역을 선택해주세요.</ErrorMessage>}
    </Container>
  );
};

export default SelectJobPostingRegions;
