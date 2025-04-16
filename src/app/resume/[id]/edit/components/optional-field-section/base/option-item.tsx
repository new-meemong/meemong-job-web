import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const OptionItem = styled.div<{
  $isSelected: boolean;
  $size: string;
}>`
  ${(props) => (props.$isSelected ? fonts.whiteNormal12 : fonts.greyNormal12)};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${(props) =>
    props.$size === "large"
      ? pxToVw(105)
      : props.$size === "small"
      ? pxToVw(77)
      : pxToVw(86)};
  border-radius: ${pxToVw(4)};
  background-color: ${(props) =>
    props.$isSelected ? colors.purplePrimary : "transparent"};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export default OptionItem;
