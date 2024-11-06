import FullButton from "./full-button";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${pxToVw(70)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  background-color: white;
`;

interface BottomFloatingButtonProps {
  title: string;
  onClick: () => void;
}

const BottomFloatingButton = ({
  title,
  onClick,
}: BottomFloatingButtonProps) => {
  return (
    <Container>
      <FullButton title={title} onClick={onClick} />
    </Container>
  );
};

export default BottomFloatingButton;
