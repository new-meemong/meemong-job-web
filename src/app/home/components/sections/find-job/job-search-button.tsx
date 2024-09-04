import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  ${fonts.whiteBold14}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(5)};
`;

const JobSearchButton = () => {
  const [text, setText] = useState("매장 탐색하기");
  return <Button>{text}</Button>;
};

export default JobSearchButton;
