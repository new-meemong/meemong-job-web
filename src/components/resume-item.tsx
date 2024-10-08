import { colors } from "@/styles/colors";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { useRouter } from "next/navigation";
import { ResumeType } from "@/types/resume-type";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  height: ${pxToVw(146)};
  display: flex;
  flex-direction: column;
  border: ${pxToVw(1)} solid ${colors.greyBacground4};
  border-radius: ${pxToVw(10)};
  padding: ${pxToVw(12)};
  margin-bottom: ${pxToVw(6)};
`;

const Location = styled.span`
  ${fonts.greyNormal10}
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: ${pxToVw(8)};
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${pxToVw(12)};
  width: ${pxToVw(212)};
`;

const Title = styled.span`
  ${fonts.greyTextBold16}
  margin-bottom: ${pxToVw(12)};
`;

const InfoTextContainer = styled.div`
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

const ProfileImage = styled(Image)`
  width: ${pxToVw(91)};
  height: ${pxToVw(91)};
  object-fit: cover;
  background-color: ${colors.greyBacground4};
  border-radius: ${pxToVw(5)};
  border: 1px solid ${colors.greyBacground4};
`;

const Divider = styled.div`
  height: ${pxToVw(6)};
  width: ${pxToVw(1)};
  margin: ${pxToVw(0)} ${pxToVw(4)};
  background-color: ${colors.greyBacground4};
`;

const ViewCount = styled.span`
  ${fonts.greyNormal10}
  margin-top: ${pxToVw(6)};
`;

interface ResumeItemProps {
  resume: ResumeType;
  viewCount: number;
}

const ResumeItem = ({ resume, viewCount }: ResumeItemProps) => {
  const [imgSrc, setImgSrc] = useState("/images/default_profile_image.jpg");
  const router = useRouter();

  const handleImageError = () => {
    setImgSrc("/images/default_profile_image.jpg"); // 이미지 로드 실패 시 대체 이미지 경로
  };

  const handleClick = () => {
    router.push(`/resume/${resume.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Location>{resume.preferredStoreRegions}</Location>
      <ContentContainer>
        <ProfileInfoContainer>
          <Title>{resume.shortDescription}</Title>
          <InfoTextContainer>
            <ProfileInfo>{resume.appliedRole}</ProfileInfo>
            <Divider />
            {/* <ProfileInfo>{`${resume.sex}`}</ProfileInfo> */}
            {/* <Divider /> */}
            <ProfileInfo>{`${moment()
              .diff(moment(resume.birthday, "YYYY-MM-DD"), "years")
              .toString()}세`}</ProfileInfo>
            <Divider />
            <ProfileInfo>
              {resume.designerLicenses ? "자격증 보유" : "자격증 미보유"}
            </ProfileInfo>
            <Divider />
            <ProfileInfo>
              {resume.appliedRole === "디자이너"
                ? resume.designerExperienceYearNumber
                : resume.internExperienceYearNumber}
            </ProfileInfo>
          </InfoTextContainer>
          <ViewCount>{`조회 ${viewCount}`}</ViewCount>
        </ProfileInfoContainer>
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

export default ResumeItem;
