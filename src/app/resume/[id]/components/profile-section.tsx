import { IMAGE_STORAGE_URL } from "@/apis/consts";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { ResumeType } from "@/types/resume-type";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div``;
interface ProfileSectionProps {
  resume: ResumeType;
}

const ProfileImage = styled(Image)`
  width: ${pxToVw(390)};
  height: ${pxToVw(360)};
  background-color: ${colors.greyBacground4};
  object-fit: cover;
`;

const ProfileSection = ({ resume }: ProfileSectionProps) => {
  const { profileImageUri } = resume;
  const imgSrc = profileImageUri
    ? `${IMAGE_STORAGE_URL}${profileImageUri}`
    : "/images/default-profile-image.png";
  return (
    <Container>
      <ProfileImage
        src={imgSrc}
        alt="Profile Image"
        width={80}
        height={80}
        priority
      />
    </Container>
  );
};

export default ProfileSection;
