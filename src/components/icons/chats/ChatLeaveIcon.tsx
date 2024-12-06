import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const ChatLeaveIcon = () => (
  <IconWrapper>
    <Image src="/icons/chats/chat_leave.svg" alt="Chat leave" fill />
  </IconWrapper>
);

export default ChatLeaveIcon;
