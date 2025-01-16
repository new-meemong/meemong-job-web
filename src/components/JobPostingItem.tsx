import { useRouter, useSearchParams } from "next/navigation";

import { IMAGE_STORAGE_URL } from "@/apis/consts";
import Image from "next/image";
import { JobPostingType } from "@/types/job-posting-type";
import { colors } from "@/styles/colors";
import { convertToShortRegionFromQuery } from "@/lib/convert-region";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  padding: ${pxToVw(12)};
  border-radius: ${pxToVw(10)};
  width: ${pxToVw(340)};
  min-height: ${pxToVw(145)};
  flex: 0 0 auto;
  background-color: ${colors.white};
  border: 1px solid ${colors.greyBacground4};
  margin-bottom: ${pxToVw(6)};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const HeaderTitle = styled.span`
  ${fonts.greyTextBold14}
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 부호 표시 */
`;

const DesignerRole = styled.span`
  ${fonts.purplePrimaryBold10}
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 부호 표시 */
`;

const InternRole = styled.span`
  ${fonts.naverGreenBold10}
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 부호 표시 */
`;

const HeaderSubTitle = styled.span`
  ${fonts.greyNormal10}
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 부호 표시 */
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: ${pxToVw(8)};
  gap: ${pxToVw(12)};
`;

const ContentLeftContainer = styled.div`
  width: ${pxToVw(212)};
`;

const ContentTitle = styled.span`
  ${fonts.greyTextBold16}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Divider = styled.div`
  height: ${pxToVw(6)};
  width: ${pxToVw(1)};
  margin: ${pxToVw(0)} ${pxToVw(4)};
  background-color: ${colors.greyBacground4};
`;

const InfoTextContainer = styled.div`
  margin-top: ${pxToVw(12)};
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > * {
    margin-bottom: ${pxToVw(4)}; /* 각 줄 사이에 4px 간격 추가 */
  }

  & > *:nth-child(even) {
    margin-bottom: ${pxToVw(
      0,
    )}; /* 마지막 줄의 Divider는 간격을 없애기 위해 수정 */
  }
`;

const ProfileInfo = styled.span`
  ${fonts.greyText2Normal10}
`;

const ViewCount = styled.span`
  ${fonts.greyNormal10}
  margin-top: ${pxToVw(2)};
`;

const StoreImage = styled(Image)`
  width: ${pxToVw(91)};
  height: ${pxToVw(91)};
  object-fit: cover;
  background-color: ${colors.greyBacground4};
  border-radius: ${pxToVw(5)};
  border: 1px solid ${colors.greyBacground4};
`;

const infoByRole = (jobPosting: JobPostingType) => {
  const {
    role,
    monthlyEducationCount,
    availableOffDays,
    settlementAllowance,
    incentive,
    educationCost,
    internSalary,
  } = jobPosting;
  if (role === "디자이너") {
    return (
      <InfoTextContainer>
        {/* <ProfileInfo>{role}</ProfileInfo>
        <Divider /> */}
        <ProfileInfo>{`교육 ${monthlyEducationCount}`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`휴무 ${availableOffDays} 가능`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`정착지원금 ${settlementAllowance}`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`인센티브 1000/${incentive}`}</ProfileInfo>
      </InfoTextContainer>
    );
  } else if (role === "인턴") {
    return (
      <InfoTextContainer>
        {/* <ProfileInfo>{role}</ProfileInfo>
        <Divider /> */}
        <ProfileInfo>{`교육 ${monthlyEducationCount}`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`교육비 ${educationCost}`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`휴무 ${availableOffDays} 가능`}</ProfileInfo>
        <Divider />
        <ProfileInfo>{`급여 ${internSalary}`}</ProfileInfo>
      </InfoTextContainer>
    );
  }
};

interface JobPostingItemProps {
  jobPosting: JobPostingType;
}

const JobPostingItem = ({ jobPosting }: JobPostingItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "app";

  const {
    id,
    storeName,
    storeRegion,
    storeRegionSiName,
    postingTitle,
    JobPostingsStoreImages,
    isOpeningSoon,
    viewCount,
  } = jobPosting;

  const initialImage = JobPostingsStoreImages?.[0]?.thumbnailUri
    ? `${IMAGE_STORAGE_URL}${JobPostingsStoreImages[0].thumbnailUri}`
    : "/images/default_profile_image.jpg";

  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  const shortRegion = convertToShortRegionFromQuery(
    storeRegion,
    storeRegionSiName,
  )[0];

  const handleImageError = () => {
    setImgSrc("/images/default_profile_image.jpg"); // 이미지 로드 실패 시 대체 이미지 경로
  };

  const handleClick = () => {
    console.log("moonsae source", source);
    router.push(`/job-posting/${id}?source=${source}`);
  };

  return (
    <Container onClick={handleClick}>
      <HeaderContainer>
        <HeaderTitle>{`${
          isOpeningSoon ? "오픈예정 매장" : storeName
        }`}</HeaderTitle>
        <Divider />
        {jobPosting.role === "디자이너" && (
          <DesignerRole>{jobPosting.role}</DesignerRole>
        )}
        {jobPosting.role === "인턴" && (
          <InternRole>{jobPosting.role}</InternRole>
        )}
        <Divider />
        <HeaderSubTitle>{shortRegion}</HeaderSubTitle>
      </HeaderContainer>
      <ContentContainer>
        <ContentLeftContainer>
          <ContentTitle>{`${postingTitle}`}</ContentTitle>
          {infoByRole(jobPosting)}
          {/* <ViewCount>{`조회 0`}</ViewCount> */}
        </ContentLeftContainer>

        <StoreImage
          src={imgSrc}
          alt="profile Image"
          width={91}
          height={91}
          onError={handleImageError}
        />
      </ContentContainer>
      <ViewCount>{`조회 ${viewCount}`}</ViewCount>
    </Container>
  );
};

export default JobPostingItem;
