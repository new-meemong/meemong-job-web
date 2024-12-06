import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const ChatArrangeInterviewIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/chats/chat_arrange_interview.svg"
      alt="Chat how to use"
      fill
    />
  </IconWrapper>
);

export default ChatArrangeInterviewIcon;
