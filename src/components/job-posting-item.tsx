import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { Content } from "next/font/google";
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
`;

const HeaderTitle = styled.span`
  ${fonts.greyTextBold16}
`;

const HeaderSubTitle = styled.span`
  ${fonts.greyNormal10}
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

const ViewCount = styled.span`
  ${fonts.greyNormal10}
  margin-top: ${pxToVw(6)};
`;

const ProfileImage = styled(Image)`
  width: ${pxToVw(91)};
  height: ${pxToVw(91)};
  object-fit: cover;
  background-color: ${colors.greyBacground4};
  border-radius: ${pxToVw(5)};
  border: 1px solid ${colors.greyBacground4};
`;

interface JobPostingItemProps {
  jobPosting: any;
}

const JobPostingItem = ({ jobPosting }: JobPostingItemProps) => {
  const [imgSrc, setImgSrc] = useState("/images/default_profile_image.jpg");
  const router = useRouter();

  const handleImageError = () => {
    setImgSrc("/images/default_profile_image.jpg"); // 이미지 로드 실패 시 대체 이미지 경로
  };

  const handleClick = () => {
    router.push(`/job-posting/${jobPosting.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <HeaderContainer>
        <HeaderTitle>{`준오헤어`}</HeaderTitle>
        <Divider />
        <HeaderSubTitle>{`00시 00시(군구)`}</HeaderSubTitle>
      </HeaderContainer>
      <ContentContainer>
        <ContentLeftContainer>
          <ContentTitle>{`수석 디자이너 경력 채용 공고 2줄을 쓰면 이렇게 됩니다! 이렇게 됩니다!`}</ContentTitle>
          <InfoTextContainer>
            <ProfileInfo>{`월 교육 2회 이상`}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`휴무 화, 금`}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`정착지원금 210만원 이상`}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`인센티브 1000/30%`}</ProfileInfo>
          </InfoTextContainer>
          <ViewCount>{`조회 234`}</ViewCount>
        </ContentLeftContainer>

        <ProfileImage
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
