import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-left: ${pxToVw(4)};
`;

const Label = styled.div`
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
  flex-shrink: 0;
`;

const ContentLink = styled.div`
  ${fonts.greyTextSemi16};
  min-height: ${pxToVw(24)};
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  flex-grow: 1;
  overflow: hidden;
  text-decoration: underline;
`;

const ContentText = styled.div`
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
  url: string | null;
  source?: string;
}

const SingleInfoLinkItem = ({
  label,
  content,
  nullString = "상관없음",
  url,
  source
}: InfoItemProps) => {
  const displayContent =
    content === null
      ? nullString
      : typeof content === "boolean"
      ? content
        ? "있음"
        : "없음"
      : content;

  const extractUrl = (url: string | null) => {
    if (!url) return null;
    const urlStartIndex = url.search(/https?:\/\//);
    return urlStartIndex !== -1 ? url.slice(urlStartIndex) : null;
  };

  const validUrl = extractUrl(url);

  const handleClick = () => {
    if (!validUrl) return;

    if (source === "web") {
      window.open(validUrl, "_blank");
    }

    if (!source) {
      window.externalLink(validUrl);
    }
  };
  console.log("moonsae url", url);
  return (
    <Container>
      <Label>{label}</Label>
      {validUrl ? (
        <ContentLink onClick={handleClick}>{displayContent}</ContentLink>
      ) : (
        <ContentText>{""}</ContentText>
      )}
    </Container>
  );
};

export default SingleInfoLinkItem;
