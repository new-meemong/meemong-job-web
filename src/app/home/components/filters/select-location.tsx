import ArrowRightPurpleIcon from "@/components/icons/arrow-right-purple-icon";
import CloseCircleGreyIcon from "@/components/icons/close-circle-grey-icon";
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
  padding: 12px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;
const Location = styled.div`
  ${fonts.purplePrimaryBold12}
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 194.5px;
  height: 38px;
  border: 1px solid ${colors.purplePrimary};
  border-radius: 5px;
  padding: 12px 6px;
`;

const LocationButton = styled(Link)`
  ${fonts.purplePrimaryBold12}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 115.5px;
  height: 38px;
  border: 1px solid ${colors.purplePrimary};
  border-radius: 5px;
  padding: 12px 6px;
`;

const CancelContainer = styled.div`
  display: flex;
  padding-top: 4px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CancelButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
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
        <LocationButton href={`home/select-location`}>
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
