import ChatArrangeInterviewIcon from "@/components/icons/chats/ChatArrangeInterviewIcon";
import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToVw(2)};
  width: ${pxToVw(70)};

  height: fit-content;
  cursor: pointer;
`;

const Label = styled.div`
  ${fonts.greyNormal12}
`;

const ArrangeInterviewButton = () => {
  return (
    <Container>
      <ChatArrangeInterviewIcon />
      <Label>면접잡기</Label>
    </Container>
  );
};

export default ArrangeInterviewButton;
