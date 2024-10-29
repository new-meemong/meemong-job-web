import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Label = styled.div`
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
  flex-shrink: 0;
`;

const Content = styled.div`
  ${fonts.greyTextSemi16};
  min-height: ${pxToVw(24)};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  flex-grow: 1;
  overflow: hidden;
`;

interface InfoItemProps {
  label: string;
  content: string | boolean | null;
  nullString?: string;
}

const SingleInfoItem = ({
  label,
  content,
  nullString = "상관없음"
}: InfoItemProps) => {
  const displayContent =
    content === null
      ? nullString
      : typeof content === "boolean"
      ? content
        ? "있음"
        : "없음"
      : content;

  return (
    <Container>
      <Label>{label}</Label>
      <Content>{displayContent}</Content>
    </Container>
  );
};

export default SingleInfoItem;
