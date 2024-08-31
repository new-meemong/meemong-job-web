import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: ${pxToVw(80)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.greyBackground};
  margin-top: ${pxToVw(28)};
`;

const Banner = () => {
  return <Container>배너 영역</Container>;
};

export default Banner;
