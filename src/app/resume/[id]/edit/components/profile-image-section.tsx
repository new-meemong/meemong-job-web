import { IMAGE_STORAGE_URL } from "@/apis/consts";
import { uploadResumeProfileImage } from "@/apis/resumes";
import CameraFillIcon from "@/components/icons/camera-fill-icon";
import pxToVw from "@/lib/dpi-converter";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import Image from "next/image";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${pxToVw(24)};
`;

const ProfileImageContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: ${pxToVw(8)};
`;

const ProfileImage = styled(Image)`
  width: ${pxToVw(80)};
  height: ${pxToVw(80)};
  background-color: ${colors.greyBacground4};
  border-radius: ${pxToVw(40)};
  border: 1px solid ${colors.greyBacground4};
  object-fit: cover;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const InfoText = styled.div<{ $hasError: boolean }>`
  ${({ $hasError }) => ($hasError ? fonts.redNormal12 : fonts.blackBold12)}
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SpinnerWrapper = styled.div`
  width: ${pxToVw(80)};
  height: ${pxToVw(80)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImageSection = () => {
  const {
    profileImageThumbnailUri,
    setProfileImageThumbnailUri,
    setProfileImageUri,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useResumeEditStore((state) => ({
    setProfileImageThumbnailUri: state.setProfileImageThumbnailUri,
    setProfileImageUri: state.setProfileImageUri,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    profileImageThumbnailUri: state.profileImageThumbnailUri
  }));
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = hasInternOptionNull;
  }
  const profileImage = profileImageThumbnailUri
    ? `${IMAGE_STORAGE_URL}${profileImageThumbnailUri}`
    : "/images/default_profile_image.jpg";
  const [imgSrc, setImgSrc] = useState<string>(profileImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    try {
      const { data } = await uploadResumeProfileImage(file);
      const uri = `${data?.imageFile?.fileuri}`;
      const thumbnailUri = `${data?.imageThumbnailFile?.fileuri}`;

      if (uri && thumbnailUri) {
        setProfileImageUri(uri);
        setProfileImageThumbnailUri(thumbnailUri);
      }

      const imageUri = `${IMAGE_STORAGE_URL}${thumbnailUri}`;
      setImgSrc(imageUri);
      setIsUploading(false);
    } catch (e) {
      console.error("Image upload failed:", e);
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      <ProfileImageContainer onClick={handleImageClick}>
        <ProfileImage
          src={imgSrc}
          alt="Profile Image"
          width={80}
          height={80}
          priority
        />
        {isUploading && (
          <SpinnerWrapper>
            <ClipLoader color={colors.purplePrimary} size={30} />
          </SpinnerWrapper>
        )}
        <IconContainer>
          <CameraFillIcon />
        </IconContainer>
      </ProfileImageContainer>
      <HiddenFileInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {!profileImageThumbnailUri && (
        <InfoText $hasError={hasError}>이력서 사진을 추가해 주세요.</InfoText>
      )}
    </Container>
  );
};

export default ProfileImageSection;
