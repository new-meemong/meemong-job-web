import { colors } from "@/styles/colors";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.greyBackground};
  margin-top: 28px;
`;

const Banner = () => {
  return <Container>배너 영역</Container>;
};

export default Banner;
