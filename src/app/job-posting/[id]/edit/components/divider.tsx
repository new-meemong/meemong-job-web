import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import styled from "styled-components";

const Container = styled.div`
  height: ${pxToVw(1)};
  background-color: ${colors.greyDivider};
  margin-top: ${pxToVw(20)};
  margin-bottom: ${pxToVw(20)};
`;

const Divider = () => {
  return <Container />;
};

export default Divider;
