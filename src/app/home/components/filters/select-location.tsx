import ArrowRightPurpleIcon from "@/components/icons/arrow-right-purple-icon";
import CloseCircleGreyIcon from "@/components/icons/close-circle-grey-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
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
  const selectedLocationList = ["서울 강남구", "서울 양천구"];

  return (
    <Container>
      <Label>지역</Label>
      <ButtonContainer>
        <Location>
          {selectedLocationList.map((label, index) => (
            <React.Fragment key={label}>
              {label}
              {index < selectedLocationList.length - 1 && ",\u00A0"}
            </React.Fragment>
          ))}
        </Location>
        <LocationButton href={`/home/select-location`}>
          지역선택하기
          <ArrowRightPurpleIcon />
        </LocationButton>
      </ButtonContainer>
      <CancelContainer>
        {selectedLocationList.map((label, index) => (
          <CancelButton key={index}>
            <CancelText>{label}</CancelText>
            <CloseCircleGreyIcon />
          </CancelButton>
        ))}
      </CancelContainer>
    </Container>
  );
};

export default SelectLocation;
