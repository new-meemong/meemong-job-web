import { ErrorMessage } from "@/components/error-message";
import ArrowRightGreyIcon from "@/components/icons/arrow-right-grey-icon";
import EditResumeLabel from "@/app/resume/[id]/edit/components/edit-resume-label";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { siNmShort } from "@/types/location-type";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  padding-top: ${pxToVw(12)};

  gap: ${pxToVw(5)};
`;

const Location = styled.div<{ $hasError: boolean }>`
  ${fonts.blackNormal12}
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: ${pxToVw(220)};
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

const RegionsSelect = () => {
  const {
    _preferredStoreRegions,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    _preferredStoreRegions: state._preferredStoreRegions,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));

  const convertRegions = _preferredStoreRegions?.map((item) => {
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
  if (appliedRole === "디자이너") {
    hasError = !convertRegions.length && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !convertRegions.length && hasInternOptionNull;
  }

  return (
    <Container>
      <EditResumeLabel label={"지역*"} />
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
          href="/select-location?target=resumeEdit"
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

export default RegionsSelect;
