import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

interface InfoItemProps {
  label: string;
  content: string | boolean | null;
}

const Label = styled.div`
  ${fonts.purplePrimaryBold16};
  width: ${pxToVw(140)};
  height: ${pxToVw(24)};
`;

const Content = styled.div`
  ${fonts.greyTextSemi16};
  height: ${pxToVw(24)};
`;

const SingleInfoItem = ({ label, content }: InfoItemProps) => {
  const displayContent =
    content === null
      ? "상관없음"
      : typeof content === "boolean"
      ? content
        ? "유"
        : "무"
      : content;

  return (
    <Container>
      <Label>{label}</Label>
      <Content>{displayContent}</Content>
    </Container>
  );
};

export default SingleInfoItem;
