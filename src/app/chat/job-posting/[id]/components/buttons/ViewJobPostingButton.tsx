import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import ChatLeaveIcon from "@/components/icons/chats/ChatLeaveIcon";
import ChatSendResumeIcon from "@/components/icons/chats/ChatSendResumeIcon";
import ChatViewJobPostingIcon from "@/components/icons/chats/ChatViewJobPostingIcon";
import ChatViewResumeIcon from "@/components/icons/chats/ChatViewResumeIcon";
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

const ViewJobPostingButton = () => {
  return (
    <Container>
      <ChatViewJobPostingIcon />
      <Label>모집공고 보기</Label>
    </Container>
  );
};

export default ViewJobPostingButton;
