import { colors } from "@/styles/colors";
import styled from "styled-components";
import { fonts } from "@/styles/fonts";

const Container = styled.div`
  ${fonts.whiteBold16}
  background-color: ${colors.purplePrimary};
  height: 48px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TitleProps {
  title: string;
  onClick: () => void;
}

const FullButton = ({ title, onClick }: TitleProps) => {
  return <Container onClick={onClick}>{title}</Container>;
};

export default FullButton;
