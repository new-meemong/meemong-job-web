import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import Link from "next/link";
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

const Content = styled(Link)`
  ${fonts.greyTextSemi16};
  min-height: ${pxToVw(24)};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  flex-grow: 1;
  overflow: hidden;

  text-decoration: underline;
`;

interface InfoItemProps {
  label: string;
  content: string | boolean | null;
  nullString?: string;
}

const SingleInfoLinkItem = ({
  label,
  content,
  nullString = "상관없음"
}: InfoItemProps) => {
  const displayContent =
    content === null
      ? nullString
      : typeof content === "boolean"
      ? content
        ? "유"
        : "무"
      : content;

  return (
    <Container>
      <Label>{label}</Label>
      <Content href={displayContent} target="_blank" rel="noopener noreferrer">
        {displayContent}
      </Content>
    </Container>
  );
};

export default SingleInfoLinkItem;
