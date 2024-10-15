import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  ${fonts.purpleSecondaryNewSemi20}
  height: ${pxToVw(88)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeTitle = () => {
  const label = "미몽에서 면접보고 바로 출근하세요!";
  return <Container>{label}</Container>;
};

export default HomeTitle;
