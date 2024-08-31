import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  ${fonts.whiteBold16}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background-color: ${colors.purplePrimary};
  border-radius: 5px;
`;

const TalentSearchButton = () => {
  const [text, setText] = useState("인재 탐색하기");
  return <Button>{text}</Button>;
};

export default TalentSearchButton;
