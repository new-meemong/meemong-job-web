import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-left: ${pxToVw(4)};
  /* min-height: ${pxToVw(100)}; */
`;

const Label = styled.div`
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${pxToVw(4)};
`;

const Content = styled.div`
  ${fonts.greyTextSemi16};
  min-height: ${pxToVw(24)};
  word-break: keep-all;
  white-space: pre-wrap;
`;

interface InfoItemProps {
  label: string;
  content: string | null;
  nullString?: string;
}

const MultiInfoItem = ({
  label,
  content,
  nullString = "상관없음",
}: InfoItemProps) => {
  const displayContent = content === null ? [nullString] : content.split(",");
  console.log("moonsae displayContent", displayContent);
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
