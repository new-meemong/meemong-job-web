import { colors } from "@/styles/styles";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.grey_line};
  margin-bottom: 16px;
`;

const HeaderLine = () => {
  return <Container />;
};

export default HeaderLine;
