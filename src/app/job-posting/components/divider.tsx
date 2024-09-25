import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: ${pxToVw(1)};
  background-color: ${colors.greyLine};
  margin-top: ${pxToVw(20)};
  margin-bottom: ${pxToVw(20)};
`;

export default function Divider() {
  return <Container />;
}
