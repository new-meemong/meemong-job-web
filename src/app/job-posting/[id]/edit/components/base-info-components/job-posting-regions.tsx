import ArrowRightGreyIcon from "@/components/icons/arrow-right-grey-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
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
  gap: ${pxToVw(5)};
`;

const Location = styled.div`
  ${fonts.blackNormal12}
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: ${pxToVw(206)};
  height: ${pxToVw(40)};
  border: ${pxToVw(1)} solid ${colors.grey};
  border-radius: ${pxToVw(5)};
  padding: ${pxToVw(12)} ${pxToVw(6)};
`;

const LocationPlaceHolder = styled.span`
  ${fonts.greyNormal12}
`;

const LocationButton = styled(Link)`
  ${fonts.greyNormal12}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${pxToVw(115)};
  height: ${pxToVw(40)};
  border: ${pxToVw(1)} solid ${colors.grey};
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

const JobPostingRegions = () => {
  // const selectedLicationList = ["서울 강남구", "서울 강동구", "서울 강북구"];
  const selectedLicationList: string[] = [];
  return (
    <Container>
      <HeaderLabel>공고 노출 지역</HeaderLabel>
      <HeaderSubLabel>다른 지역도 모집 및 선택 가능합니다.</HeaderSubLabel>
      <ContentContainer>
        <Location>
          {selectedLicationList.length === 0 ? (
            <LocationPlaceHolder>최소 1개 ~ 최대 3개 선택</LocationPlaceHolder>
          ) : (
            selectedLicationList.map((label, index) => (
              <React.Fragment key={label}>
                {label}
                {index < selectedLicationList.length - 1 && ",\u00A0"}
              </React.Fragment>
            ))
          )}
        </Location>
        <LocationButton href="">
          지역선택하기
          <ArrowRightGreyIcon />
        </LocationButton>
      </ContentContainer>
    </Container>
  );
};

export default JobPostingRegions;
