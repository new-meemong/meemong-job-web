import { IMAGE_STORAGE_URL } from "@/apis/consts";
import { uploadJobPostingImage } from "@/apis/job-postings";
import { ErrorMessage } from "@/components/error-message";
import ImageUploadIcon from "@/components/icons/image-upload-icon";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.greyTextBold16}
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(10)};
  margin-top: ${pxToVw(8)};
  margin-bottom: ${pxToVw(8)};
`;

const UploadedImageWrapper = styled.div`
  position: relative;
  width: ${pxToVw(72)};
  height: ${pxToVw(72)};
  border-radius: ${pxToVw(4)};
  overflow: hidden;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageUploadButton = styled.label<{ $hasError: boolean }>`
  position: relative;
  padding: ${pxToVw(10)} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  width: ${pxToVw(72)}; /* 버튼의 고정 너비 */
  height: ${pxToVw(72)}; /* 버튼의 고정 높이 */
  border: ${(props) =>
    props.$hasError
      ? `1px solid ${colors.red}`
      : `1px solid ${colors.greyBacground4}`};
  border-radius: ${pxToVw(4)};
  overflow: hidden;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  ${fonts.greyText4Semi10}
`;

const DotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToVw(15)};
  height: ${pxToVw(10)};
  flex-shrink: 0;
`;
const InfoDot = styled.div`
  height: ${pxToVw(2)};
  width: ${pxToVw(2)};
  border-radius: 50%;
  background-color: ${colors.greyText4};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  position: absolute;
`;

const JobPostingEditStoreImage = () => {
  const {
    jobPostingsStoreImages,
    setJobPostingsStoreImages,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  let hasError = false;

  if (role === "디자이너") {
    hasError = jobPostingsStoreImages.length === 0 && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = jobPostingsStoreImages.length === 0 && hasInternOptionNull;
  }
  const [isUploading, setIsUploading] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null); // 롱클릭 타이머

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const selectedFile = files[0];

    if (jobPostingsStoreImages.length === 5) {
      alert("이미지는 최대 5장까지 가능합니다.");
      return;
    }

    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 10MB

    if (selectedFile.size > MAX_SIZE_BYTES) {
      alert(`이미지 용량이 너무 큽니다. (최대 ${MAX_SIZE_MB}MB)`);
      return;
    }

    setIsUploading(true);

    try {
      // 서버에 이미지 업로드
      const { data } = await uploadJobPostingImage(selectedFile);

      const uri = `${data?.imageFile?.fileuri}`;
      const thumbnailUri = `${data?.imageThumbnailFile?.fileuri}`;

      if (uri && thumbnailUri) {
        const newImage = { uri, thumbnailUri };
        const updatedImages = [...jobPostingsStoreImages, newImage];
        setJobPostingsStoreImages(updatedImages);
      }

      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
    }
  };

  const handleImageDelete = (index: number) => {
    // 삭제 여부 확인 팝업
    const confirmed = confirm("이미지 삭제하시겠습니까?");
    if (confirmed) {
      // 이미지를 삭제하고 상태 업데이트
      const updatedImages = jobPostingsStoreImages.filter(
        (_, i) => i !== index
      );
      setJobPostingsStoreImages(updatedImages);
    }
  };

  const handleMouseDown = (index: number) => {
    longPressTimer.current = setTimeout(() => {
      handleImageDelete(index); // 롱클릭시 이미지 삭제
    }, 800); // 800ms 이상 클릭 시 롱클릭으로 간주
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current); // 클릭을 짧게 했을 경우 타이머 초기화
    }
  };

  return (
    <Container>
      <Label>매장 이미지 등록*</Label>
      <ImageContainer>
        <ImageUploadButton htmlFor="image-upload" $hasError={hasError}>
          {isUploading ? (
            <SpinnerWrapper>
              <ClipLoader color={colors.purplePrimary} size={30} />
            </SpinnerWrapper>
          ) : (
            <ImageUploadIcon />
          )}
        </ImageUploadButton>
        <HiddenFileInput
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {jobPostingsStoreImages.map((image, index) => {
          const imageUri = `${IMAGE_STORAGE_URL}${image.thumbnailUri}`;
          return (
            <UploadedImageWrapper
              key={index}
              onMouseDown={() => handleMouseDown(index)} // 마우스 클릭 시작
              onMouseUp={handleMouseUp} // 마우스 클릭 해제
              onTouchStart={() => handleMouseDown(index)} // 모바일 터치 시작
              onTouchEnd={handleMouseUp} // 모바일 터치 종료
            >
              <StyledImage
                src={imageUri}
                alt="Uploaded"
                fill // layout="fill" 대신 사용
              />
            </UploadedImageWrapper>
          );
        })}
      </ImageContainer>
      <DescriptionContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <Description>
          용량 10MB 이하 / 형식 jpg, png, gif만 가능합니다.
        </Description>
      </DescriptionContainer>
      <DescriptionContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <Description>이미지는 최대 5장까지 가능합니다.</Description>
      </DescriptionContainer>
      {hasError && (
        <ErrorMessage>매장 이미지를 최소 1장 등록해주세요.</ErrorMessage>
      )}
    </Container>
  );
};

export default JobPostingEditStoreImage;
