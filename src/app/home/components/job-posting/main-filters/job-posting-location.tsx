import ArrowRightPurpleIcon from "@/components/icons/arrow-right-purple-icon";
import Link from "next/link";
import React from "react";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { siNmShort } from "@/types/location-type";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

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

const JobPostingLocation = () => {
  const { _postingRegions } = useJobPostingListStore((state) => ({
    _postingRegions: state._postingRegions,
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

  return (
    <Container>
      <Label>지역</Label>
      <ButtonContainer>
        <Location>
          {convertRegions.length === 0
            ? "전체"
            : convertRegions.map((label, index) => (
                <React.Fragment key={label}>
                  {label}
                  {index < convertRegions.length - 1 && ",\u00A0"}
                </React.Fragment>
              ))}
        </Location>
        <LocationButton href={"/select-location?target=jobPostingList"}>
          지역선택하기
          <ArrowRightPurpleIcon />
        </LocationButton>
      </ButtonContainer>
      {/* <CancelContainer>
        {convertRegions.map((label, index) => (
          <CancelButton key={index} onClick={() => {}}>
            <CancelText>{label}</CancelText>
            <CloseCircleGreyIcon />
          </CancelButton>
        ))}
      </CancelContainer> */}
    </Container>
  );
};

export default JobPostingLocation;
