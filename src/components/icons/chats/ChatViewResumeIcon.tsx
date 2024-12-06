import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const ChatViewResumeIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/chats/chat_view_resume.svg"
      alt="Chat view resume"
      fill
    />
  </IconWrapper>
);

export default ChatViewResumeIcon;
