import { colors } from "@/styles/colors";
import styled from "styled-components";
import TextWhiteBold16 from "../texts/text-white-bold-16";

const Container = styled.div`
  background-color: ${colors.purplePrimary};
  height: 48px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(TextWhiteBold16)``;

interface TitleProps {
  title: string;
  onClick: () => void;
}

const FullButton = ({ title, onClick }: TitleProps) => {
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
    </Container>
  );
};

export default FullButton;
