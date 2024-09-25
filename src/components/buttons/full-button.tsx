import { colors } from "@/styles/colors";
import styled from "styled-components";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  ${fonts.whiteBold16}
  background-color: ${colors.purplePrimary};
  height: ${pxToVw(48)};
  border-radius: ${pxToVw(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface TitleProps {
  title: string;
  onClick: () => void;
}

const FullButton = ({ title, onClick }: TitleProps) => {
  return <Container onClick={onClick}>{title}</Container>;
};

export default FullButton;
