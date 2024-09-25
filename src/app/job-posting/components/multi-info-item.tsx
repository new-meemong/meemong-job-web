import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

interface InfoItemProps {
  label: string;
  content: string | null;
}

const Label = styled.div`
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
`;
const ContentContainer = styled.div``;

const Content = styled.div`
  ${fonts.greyTextSemi16};
  height: ${pxToVw(24)};
`;

const MultiInfoItem = ({ label, content }: InfoItemProps) => {
  const displayContent = content === null ? ["상관없음"] : content.split(",");

  return (
    <Container>
      <Label>{label}</Label>
      <ContentContainer>
        {displayContent.map((item, index) => (
          <Content key={index}>{item}</Content>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default MultiInfoItem;
