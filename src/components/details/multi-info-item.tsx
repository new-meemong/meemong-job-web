import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-left: ${pxToVw(4)};
`;

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

interface InfoItemProps {
  label: string;
  content: string | null;
  nullString?: string;
}

const MultiInfoItem = ({
  label,
  content,
  nullString = "상관없음"
}: InfoItemProps) => {
  const displayContent = content === null ? [nullString] : content.split(",");

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
