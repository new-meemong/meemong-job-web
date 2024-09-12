import ImageUploadIcon from "@/components/icons/image-upload-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div``;

const Label = styled.div`
  ${fonts.greyTextBold16}
`;
const ImageContainer = styled.div``;

const ImageUploadButton = styled.div`
  padding: ${pxToVw(10)} 0;
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
  return (
    <Container>
      <Label>매장 이미지 등록*</Label>
      <ImageContainer>
        <ImageUploadButton>
          <ImageUploadIcon />
        </ImageUploadButton>
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
