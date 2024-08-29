import ArrowRightPurpleIcon from "@/components/icons/arrow-right-purple-icon";
import CloseCircleGreyIcon from "@/components/icons/close-circle-grey-icon";
import TextPrimaryBold12 from "@/components/texts/text-primary-bold-12";
import TextPrimarySemi14 from "@/components/texts/text-primary-semi-14";
import { colors } from "@/styles/colors";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
`;

const Label = styled(TextPrimarySemi14)`
  padding: 12px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;
const Location = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 115.5px;
  height: 38px;
  border: 1px solid ${colors.purplePrimary};
  border-radius: 5px;
  padding: 12px 6px;
`;

const LocationText = styled(TextPrimaryBold12)``;

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

const CancelText = styled(TextPrimarySemi14)``;

const SelectLocation = () => {
  const selectedLocationList = ["서울 강남구", "서울 양천구"];

  return (
    <Container>
      <Label>지역</Label>
      <ButtonContainer>
        <Location>
          {selectedLocationList.map((label, index) => (
            <React.Fragment key={label}>
              <LocationText>{label}</LocationText>
              {index < selectedLocationList.length - 1 && (
                <LocationText>,&nbsp;</LocationText>
              )}
            </React.Fragment>
          ))}
        </Location>
        <LocationButton href={`home/select-location`}>
          <LocationText>지역선택하기</LocationText>
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
