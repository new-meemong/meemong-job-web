import { colors } from "@/styles/colors";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { fonts } from "@/styles/fonts";

const Container = styled.div`
  width: 100%;
  /* width: 340px; */
  height: 146px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.greyBacground4};
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 6px;
`;

const Location = styled.span`
  ${fonts.greyNormal10}
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const Title = styled.span`
  ${fonts.greyTextBold16}
  margin-bottom: 12px;
`;

const InfoTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > * {
    margin-bottom: 4px; /* 각 줄 사이에 4px 간격 추가 */
  }

  & > *:nth-child(even) {
    margin-bottom: 0; /* 마지막 줄의 Divider는 간격을 없애기 위해 수정 */
  }
`;

const ProfileInfo = styled.span`
  ${fonts.greyText2Normal10}
`;

const ProfileImageContainer = styled.div`
  width: 91px;
  height: 91px;
  border-radius: 5px;
  background-color: ${colors.greyBacground4};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const ProfileImage = styled(Image)`
  width: 91px;
  height: 91px;
  object-fit: cover;
  background-color: ${colors.greyBacground4};
  border-radius: 5px;
`;

const Divider = styled.div`
  height: 6px;
  width: 1px;
  margin: 0 4px;
  background-color: ${colors.greyBacground4};
`;

const ViewCount = styled.span`
  ${fonts.greyNormal10}
  margin-top: 6px;
`;

interface ResumeItemProps {
  resume: {
    location: string;
    title: string;
    type: string;
    gender: string;
    age: string;
    certificate: boolean;
    workExperience: string;
  };
  viewCount: number;
}

const ResumeItem = ({ resume, viewCount }: ResumeItemProps) => {
  const [imgSrc, setImgSrc] = useState("/images/default_profile_image.jpg");

  const handleImageError = () => {
    setImgSrc("/images/default_profile_image.jpg"); // 이미지 로드 실패 시 대체 이미지 경로
  };

  return (
    <Container>
      <Location>{resume.location}</Location>
      <ContentContainer>
        <ProfileInfoContainer>
          <Title>{resume.title}</Title>
          <InfoTextContainer>
            <ProfileInfo>{resume.type}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`${resume.gender}`}</ProfileInfo>
            <Divider />
            <ProfileInfo>{`${resume.age}세`}</ProfileInfo>
            <Divider />
            <ProfileInfo>
              {resume.certificate ? "자격증 보유" : "자격증 미보유"}
            </ProfileInfo>
            <Divider />
            <ProfileInfo>{resume.workExperience}</ProfileInfo>
          </InfoTextContainer>
          <ViewCount>{`조회 ${viewCount}`}</ViewCount>
        </ProfileInfoContainer>
        <ProfileImageContainer>
          <ProfileImage
            src={imgSrc}
            alt="profile Image"
            width={91}
            height={91}
            onError={handleImageError}
          />
        </ProfileImageContainer>
      </ContentContainer>
    </Container>
  );
};

export default ResumeItem;
