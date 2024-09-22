import { uploadJobPostingImage } from "@/apis/job-postings";
import ImageUploadIcon from "@/components/icons/image-upload-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.greyTextBold16}
`;
const ImageContainer = styled.div``;

const ImageUploadButton = styled.label`
  padding: ${pxToVw(10)} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const JobPostingEditStoreImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedImage(selectedFile);
      setUploadStatus("이미지 업로드 중...");

      try {
        // 서버에 이미지 업로드
        const response = await uploadJobPostingImage(selectedFile);
        console.log("Image uploaded:", response);
        setUploadStatus("이미지 업로드 성공");
      } catch (error) {
        console.error("Image upload failed:", error);
        setUploadStatus("이미지 업로드 실패");
      }
    }
  };
  return (
    <Container>
      <Label>매장 이미지 등록*</Label>
      <ImageContainer>
        <ImageUploadButton htmlFor="image-upload">
          <ImageUploadIcon />
        </ImageUploadButton>
        <HiddenFileInput
          id="image-upload"
          type="file"
          accept=".jpg,.png,.gif"
          onChange={handleFileChange}
        />
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
    </Container>
  );
};

export default JobPostingEditStoreImage;
