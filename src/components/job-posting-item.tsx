import { IMAGE_STORAGE_URL } from "@/apis/consts";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { JobPostingType } from "@/types/job-posting-type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${pxToVw(12)};
  border-radius: ${pxToVw(10)};
  width: ${pxToVw(340)};
  height: ${pxToVw(145)};
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
  ${fonts.greyTextBold16}
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
      0
    )}; /* 마지막 줄의 Divider는 간격을 없애기 위해 수정 */
  }
`;

const ProfileInfo = styled.span`
  ${fonts.greyText2Normal10}
`;

// const ViewCount = styled.span`
//   ${fonts.greyNormal10}
//   margin-top: ${pxToVw(6)};
// `;

const StoreImage = styled(Image)`
  width: ${pxToVw(91)};
  height: ${pxToVw(91)};
  object-fit: cover;
  background-color: ${colors.greyBacground4};
  border-radius: ${pxToVw(5)};
  border: 1px solid ${colors.greyBacground4};
`;

type JobPostingItemProps = Pick<
  JobPostingType,
  | "id"
  | "storeName"
  | "storeRegion"
  | "postingTitle"
  | "monthlyEducationCount"
  | "availableOffDays"
  | "settlementAllowance"
  | "incentive"
  | "JobPostingsStoreImages"
>;

const JobPostingItem = ({
  id,
  storeName,
  storeRegion,
  postingTitle,
  monthlyEducationCount,
  availableOffDays,
  settlementAllowance,
  incentive,
  JobPostingsStoreImages
}: JobPostingItemProps) => {
  const router = useRouter();

  const initialImage = JobPostingsStoreImages?.[0]?.thumbnailUri
    ? `${IMAGE_STORAGE_URL}${JobPostingsStoreImages[0].thumbnailUri}`
    : "/images/default_profile_image.jpg";

  const [imgSrc, setImgSrc] = useState<string>(initialImage);

  const handleImageError = () => {
    setImgSrc("/images/default_profile_image.jpg"); // 이미지 로드 실패 시 대체 이미지 경로
  };

  const handleClick = () => {
    router.push(`/job-posting/${id}`);
  };
  return (
    <Container onClick={handleClick}>
      <HeaderContainer>
        <HeaderTitle>{storeName}</HeaderTitle>
        <Divider />
        <HeaderSubTitle>{storeRegion}</HeaderSubTitle>
      </HeaderContainer>
      <ContentContainer>
        <ContentLeftContainer>
          <ContentTitle>{postingTitle}</ContentTitle>
          <InfoTextContainer>
            <ProfileInfo>{monthlyEducationCount}</ProfileInfo>
            <Divider />
            <ProfileInfo>{availableOffDays}</ProfileInfo>
            <Divider />
            <ProfileInfo>{settlementAllowance}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`인센티브 ${incentive}`}</ProfileInfo>
          </InfoTextContainer>
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
    </Container>
  );
};

export default JobPostingItem;
