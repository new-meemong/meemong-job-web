import { IMAGE_STORAGE_URL } from "@/apis/consts";
import ShareButton from "@/components/buttons/share-button";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { ResumeType } from "@/types/resume-type";
import Head from "next/head";
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
      <Head>
        <meta
          property="og:title"
          content={`이력서 - ${resume.User.DisplayName || resume.userName}`}
        />
        <meta property="og:description" content={resume.shortDescription} />
        <meta property="og:image" content={resume.profileImageUri} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Head>
      <ProfileImage
        src={imgSrc}
        alt="Profile Image"
        width={390}
        height={360}
        priority
      />
      <ShareButton />
    </Container>
  );
};

export default ProfileSection;
