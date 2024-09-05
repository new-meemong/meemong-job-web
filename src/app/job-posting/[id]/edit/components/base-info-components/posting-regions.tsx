import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderLabel = styled.span``;

const HeaderSubLabel = styled.span``;

const ContentContainer = styled.div`
  display: flex;
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

const PostingRegions = () => {
  const selectedLicationList = ["서울 강남구", "서울 강동구", "서울 강북구"];
  return (
    <Container>
      <HeaderLabel>공고 노출 지역</HeaderLabel>
      <HeaderSubLabel>다른 지역도 모집 및 선택 가능합니다.</HeaderSubLabel>
      <ContentContainer>
        <Location>
          {selectedLicationList.map((label, index) => (
            <React.Fragment key={label}>
              {label}
              {index < selectedLicationList.length - 1 && ",\u00A0"}
            </React.Fragment>
          ))}
        </Location>
      </ContentContainer>
    </Container>
  );
};

export default PostingRegions;
