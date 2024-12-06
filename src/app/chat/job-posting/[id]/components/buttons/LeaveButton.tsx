import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import ChatLeaveIcon from "@/components/icons/chats/ChatLeaveIcon";
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

const LeaveButton = () => {
  return (
    <Container>
      <ChatLeaveIcon />
      <Label>나가기</Label>
    </Container>
  );
};

export default LeaveButton;
