import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToVw(2)};
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;

const Label = styled.div`
  ${fonts.greyNormal12}
`;

const HowToUseButton = () => {
  return (
    <Container>
      <ChatHowToUseIcon />
      <Label>이용방법</Label>
    </Container>
  );
};

export default HowToUseButton;
