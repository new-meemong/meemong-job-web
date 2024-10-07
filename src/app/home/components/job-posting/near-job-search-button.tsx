import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  ${fonts.purplePrimaryBold14}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(48)};
  background-color: ${colors.purpleSecondary2};
  border-radius: ${pxToVw(5)};
`;

const NearJobSearchButton = () => {
  const [text] = useState("내 주변 구인 매장보기");
  return <Button>{text}</Button>;
};

export default NearJobSearchButton;
